import {assign, Machine, StateSchema} from 'xstate'


export type WordSet = {
  id: string
  name: string
}

export interface WerewordsContext {
  playerCount?: number
  wordSet?: WordSet[]
  words?: string[]
  answer?: string
  leftSeconds?: number
  error?: any
}

export interface WerewordsSchema extends StateSchema<WerewordsContext> {
  states: {
    prepare:{},
    night:{
      states:{
        start:{},
        cunzhang:{
          states:{
            select:{},
            loading:{},
            confirm:{},
          }
        },
        xianzhi:{},
        langren:{},
        end:{}
      },
    },
    daytime:{},
    error:{},
  }
}

export type WerewordsEvent =
  { type: 'START', playCount: number, wordSets: WordSet[] } |
  { type: 'CHANGE_WORD' } |
  { type: 'SELECT_WORD', value: string } |
  { type: 'STOP' }

export const WerewordsMachine = Machine<WerewordsContext,WerewordsSchema, WerewordsEvent>({
  id: 'werewords',
  initial: 'prepare',
  context: {},
  states: {
    prepare: {
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
        start: {},
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
            confirm: {},
          },
        },
        xianzhi: {},
        langren: {},
        end: {}
      }
    },
    daytime: {},
    error: {},
  },
  on: {
    STOP: 'prepare',
  }
}, {
  actions: {}
})