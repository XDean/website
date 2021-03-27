import {assign, Machine, StateSchema} from 'xstate'
import {InvokeCreator} from "xstate/lib/types";


export type WordSet = {
  id: string
  name: string
  default: boolean
}

export interface WerewordContext {
  allWordSet: WordSet[]
  wordSet: WordSet[]
  words: string[] //words to be selected
  answer: string

  correct: boolean
  noToken: boolean

  leftSeconds: number
  pause: boolean

  error?: any
}

export interface WerewordSchema extends StateSchema<WerewordContext> {
  states: {
    setup: {
      states: {
        prepare: {},
        waiting: {},
      }
    },
    play: {
      states: {
        night: {
          states: {
            start: {},
            cunzhang: {
              states: {
                select: {},
                loading: {},
                confirm: {},
              }
            },
            xianzhi: {},
            langren: {},
            end: {},
          },
        },
        daytime: {
          states: {
            guess: {},
            find: {},
          }
        },
      }
    },
    over: {},
    error: {},
  }
}

export type WerewordEvent =
  { type: 'START' } |
  { type: 'SELECT_WORD_SET', value: WordSet, check: boolean } |
  { type: 'CHANGE_WORD' } |
  { type: 'SELECT_WORD', value: string } |
  { type: 'SET_TIME', value: number } |
  { type: 'CORRECT' } |
  { type: 'NO_TOKEN' } |
  { type: 'TICK' } |
  { type: 'TICK_ALL' } |
  { type: 'RESTART' } |
  { type: 'STOP' } |
  { type: 'PAUSE' }

function tick(): InvokeCreator<WerewordContext, WerewordEvent, any> {
  return () => cb => {
    const interval = setInterval(() => cb('TICK'), 1000);
    return () => clearInterval(interval);
  };
}

export function createWerewordMachine({
                                        nightTime = 3,
                                        dayTime = 240,
                                        guessTime = 60
                                      }: { nightTime?: number, dayTime?: number, guessTime?: number }) {
  return Machine<WerewordContext, WerewordSchema, WerewordEvent>({
    id: 'wereword',
    initial: 'setup',
    states: {
      setup: {
        initial: 'prepare',
        states: {
          prepare: {
            invoke: {
              src: (context, event) => fetch(`/api/word/set`).then(res => res.json()),
              onDone: {
                target: 'waiting',
                actions: assign((ctx, event) => ({
                  allWordSet: event.data,
                  wordSet: (event.data as WordSet[]).filter(w => w.default)
                }))
              },
              onError: {
                target: '#wereword.error',
                actions: assign({
                  error: (ctx, event) => '加载失败，请尝试刷新'
                })
              }
            },
          },
          waiting: {
            entry: assign(c => ({
              leftSeconds: 0,
              words: [],
              answer: '',
              answerCorrect: false,
              tokenUsed: false,
              pause: false,
              error: undefined,
            })),
            on: {
              START: '#wereword.play'
            }
          },
        }
      },
      play: {
        initial: 'night',
        states: {
          night: {
            initial: 'start',
            states: {
              start: {
                entry: assign({leftSeconds: nightTime}),
                invoke: {src: tick()},
                always: {
                  target: 'cunzhang',
                  cond: ctx => ctx.leftSeconds <= 0
                }
              },
              cunzhang: {
                initial: 'loading',
                states: {
                  select: {
                    on: {
                      CHANGE_WORD: 'loading',
                      SELECT_WORD: {
                        target: 'confirm',
                        actions: assign({
                          answer: (ctx, event) => event.value
                        })
                      }
                    }
                  },
                  loading: {
                    invoke: {
                      src: (context, event) =>
                        fetch(`/api/word/random?set=${context.wordSet.map(w => w.id).join(',')}`)
                          .then(res => res.json()),
                      onDone: {
                        target: 'select',
                        actions: assign({
                          words: (ctx, event) => event.data
                        })
                      },
                      onError: {
                        target: '#wereword.error',
                        actions: assign({
                          error: (ctx, event) => event.data
                        })
                      }
                    },
                    entry: () => console.log('loading word data...')
                  },
                  confirm: {
                    entry: assign({leftSeconds: nightTime}),
                    invoke: {src: tick()},
                    always: {
                      target: '#wereword.play.night.xianzhi',
                      cond: ctx => ctx.leftSeconds <= 0
                    }
                  },
                },
              },
              xianzhi: {
                entry: assign({leftSeconds: nightTime}),
                invoke: {src: tick()},
                always: {
                  target: 'langren',
                  cond: ctx => ctx.leftSeconds <= 0
                }
              },
              langren: {
                entry: assign({leftSeconds: nightTime}),
                invoke: {src: tick()},
                always: {
                  target: 'end',
                  cond: ctx => ctx.leftSeconds <= 0
                }
              },
              end: {
                entry: assign({leftSeconds: nightTime}),
                invoke: {src: tick()},
                always: {
                  target: '#wereword.play.daytime',
                  cond: ctx => ctx.leftSeconds <= 0
                }
              }
            }
          },
          daytime: {
            initial: 'guess',
            entry: assign({leftSeconds: dayTime}),
            states: {
              guess: {
                invoke: {src: tick()},
                always: {
                  target: '#wereword.play.daytime.find',
                  cond: ctx => ctx.leftSeconds <= 0
                },
                on: {
                  CORRECT: {
                    target: '#wereword.play.daytime.find',
                    actions: assign({correct: true} as Partial<WerewordContext>),
                  },
                  NO_TOKEN: {
                    target: '#wereword.play.daytime.find',
                    actions: assign({noToken: true} as Partial<WerewordContext>),
                  },
                }
              },
              find: {
                entry: assign({leftSeconds: guessTime}),
                invoke: {src: tick()},
                always: {
                  target: '#wereword.over',
                  cond: ctx => ctx.leftSeconds <= 0
                },
              },
            }
          },
        }
      },
      over: {
        on: {RESTART: 'setup.waiting'}
      },
      error: {},
    },
    on: {
      PAUSE: {
        actions: assign({
          pause: c => !c.pause
        })
      },
      STOP: {
        target: 'setup.waiting',
        actions: assign({
          leftSeconds: c => 0
        })
      },
      TICK: {
        actions: assign({
          leftSeconds: c => c.pause ? c.leftSeconds : (c.leftSeconds - 1),
        })
      },
      TICK_ALL: {
        actions: assign({
          leftSeconds: 0,
        })
      },
      SELECT_WORD_SET: {
        actions: assign((ctx, event) => {
          const copy = [...ctx.wordSet];
          const index = copy.indexOf(event.value)
          if (index !== -1 && !event.check) {
            copy.splice(index, 1)
          }
          if (index === -1 && event.check) {
            copy.push(event.value)
          }
          return {
            wordSet: copy
          }
        })
      }
    }
  }, {});
}