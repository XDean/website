import {assign, Machine, StateSchema} from 'xstate'
import {InvokeCreator} from "xstate/lib/types";


export type WordSet = {
  id: string
  name: string
}

export interface WerewordContext {
  playerCount?: number
  wordSet?: WordSet[]
  words?: string[] //words to be selected
  answer?: string
  leftSeconds?: number
  error?: any
}

export interface WerewordSchema extends StateSchema<WerewordContext> {
  states: {
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
    find: {
      states: {
        langren: {},
        xianzhi: {},
      }
    },
    over: {},
    error: {},
  }
}

export type WerewordEvent =
  { type: 'START', playCount: number, wordSets: WordSet[] } |
  { type: 'CHANGE_WORD' } |
  { type: 'SELECT_WORD', value: string } |
  { type: 'SET_TIME', value: number } |
  { type: 'RIGHT' } |
  { type: 'TICK' } |
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
                                         nightTime = 5,
                                         dayTime = 240,
                                         guessTime = 60
                                       }: { nightTime?: number, dayTime?: number, guessTime?: number }) {
  return Machine<WerewordContext, WerewordSchema, WerewordEvent>({
    id: 'wereword',
    initial: 'waiting',
    context: {
      playerCount: 5,
    },
    states: {
      waiting: {
        on: {
          START: {
            target: 'night',
            actions: assign((ctx, event) => ({
              playerCount: event.playCount,
              wordSets: event.wordSets,
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
              target: '.cunzhang',
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
                    target: '.confirm',
                    actions: assign({
                      answer: (ctx, event) => event.value
                    })
                  }
                }
              },
              loading: {
                invoke: {
                  src: (context, event) =>
                    fetch(`/api/word/random?set=${context.wordSet!.join(',')}`)
                      .then(res => res.json()),
                  onDone: {
                    target: '..select',
                    actions: assign({
                      words: (ctx, event) => event.data
                    })
                  },
                  onError: {
                    target: '..error',
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
                  target: '..xianzhi',
                  cond: ctx => ctx.leftSeconds <= 0
                }
              },
            },
          },
          xianzhi: {
            entry: assign({leftSeconds: nightTime}),
            invoke: {src: tick()},
            always: {
              target: '.langren',
              cond: ctx => ctx.leftSeconds <= 0
            }
          },
          langren: {
            entry: assign({leftSeconds: nightTime}),
            invoke: {src: tick()},
            always: {
              target: '.end',
              cond: ctx => ctx.leftSeconds <= 0
            }
          },
          end: {
            entry: assign({leftSeconds: nightTime}),
            invoke: {src: tick()},
            always: {
              target: '..daytime',
              cond: ctx => ctx.leftSeconds <= 0
            }
          }
        }
      },
      daytime: {
        entry: assign({leftSeconds: dayTime}),
        states: {
          running: {
            invoke: {src: tick()},
            always: {
              target: '..find.langren',
              cond: ctx => ctx.leftSeconds <= 0
            },
            on: {
              RIGHT: '..find.xianzhi',
              PAUSE: '.pause',
            }
          },
          pause: {
            on: {
              PAUSE: '.running',
            }
          },
        }
      },
      find: {
        entry: assign({leftSeconds: guessTime}),
        states: {
          langren: {
            invoke: {src: tick()},
            always: {
              target: '..over',
              cond: ctx => ctx.leftSeconds <= 0
            },
          },
          xianzhi: {
            invoke: {src: tick()},
            always: {
              target: '..over',
              cond: ctx => ctx.leftSeconds <= 0
            },
          },
        }
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
    }
  }, {});
}