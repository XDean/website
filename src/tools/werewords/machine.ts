import {actions, assign, Machine, send} from 'xstate'

export type WerewordsContext = {
  playerCount?: number
  answer?: string
  leftSeconds?: number
}

export type WerewordsEvent =
  { type: 'START', playCount: number } |
  { type: 'END', playCount: number }

export const WerewordsMachine = Machine<WerewordsContext, WerewordsEvent>({
  id: 'werewords',
  initial: 'prepare',
  context: {},
  states: {
    prepare: {
      on: {
        START: {
          target: 'night',
          actions: 'start-game',
        }
      }
    },
    night: {
      initial: 'cunzhang',
      states: {
        cunzhang: {},
        xianzhi: {},
        langren: {}
      }
    },
    daytime: {}
  }
}, {
  actions: {
    'start-game': assign((ctx, event) => {
      return {
        playerCount: event.playCount
      }
    })
  }
})