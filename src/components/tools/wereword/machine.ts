import {assign, Machine, StateSchema} from 'xstate'
import {InvokeCreator} from "xstate/lib/types";


export type WordSet = {
  id: string
  name: string
  default: boolean
}

export interface WerewordContext {
  playerCount: number
  allWordSet: WordSet[]
  wordSet: WordSet[]
  words: string[] //words to be selected
  answer: string
  leftSeconds: number
  findAnswer: boolean
  findPerson: boolean
  error?: any
}

export interface WerewordSchema extends StateSchema<WerewordContext> {
  states: {
    prepare: {},
    waiting: {},
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
        running: {},
        pause: {},
      }
    },
    find: {},
    over: {},
    error: {},
  }
}

export type WerewordEvent =
  { type: 'START', playCount: number } |
  { type: 'SELECT_WORD_SET', value: WordSet, check: boolean } |
  { type: 'CHANGE_WORD' } |
  { type: 'SELECT_WORD', value: string } |
  { type: 'SET_TIME', value: number } |
  { type: 'RIGHT' } |
  { type: 'WRONG' } |
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
    initial: 'prepare',
    context: {
      playerCount: 5,
      leftSeconds: 0,
      allWordSet: [],
      wordSet: [],
      words: [],
      answer: '',
      findAnswer: false,
      findPerson: false,
    },
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
        }
      },
      waiting: {
        on: {
          START: {
            target: 'night',
            actions: assign((ctx, event) => ({
              playerCount: event.playCount,
            }))
          }
        }
      },
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
                  target: '#wereword.night.xianzhi',
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
              target: '#wereword.daytime',
              cond: ctx => ctx.leftSeconds <= 0
            }
          }
        }
      },
      daytime: {
        initial: 'running',
        entry: assign({leftSeconds: dayTime}),
        states: {
          running: {
            invoke: {src: tick()},
            always: {
              target: '#wereword.find',
              actions: assign({findAnswer: false} as Partial<WerewordContext>),
              cond: ctx => ctx.leftSeconds <= 0
            },
            on: {
              RIGHT: {
                target: '#wereword.find',
                actions: assign({findAnswer: true} as Partial<WerewordContext>),
              },
              WRONG: {
                target: '#wereword.find',
                actions: assign({findAnswer: false} as Partial<WerewordContext>),
              },
              PAUSE: 'pause',
            }
          },
          pause: {
            on: {
              PAUSE: 'running',
            }
          },
        }
      },
      find: {
        entry: assign({leftSeconds: guessTime}),
        invoke: {src: tick()},
        always: {
          target: 'over',
          cond: ctx => ctx.leftSeconds <= 0
        },
      },
      over: {
        on: {RESTART: 'waiting'}
      },
      error: {},
    },
    on: {
      STOP: 'waiting',
      TICK: {
        actions: assign({
          leftSeconds: c => c.leftSeconds - 1,
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