export interface CardType {
  readonly name: string
  readonly canShun: boolean
}

export interface Card {
  readonly type: CardType
  readonly point: number
}

export interface MianType {
  readonly name: string
}

export interface Mian {
  readonly type: MianType
}

export interface Hand {
  readonly cards: Card[]
  readonly public: Mian[]
}

export interface Fan {
  readonly name: string
  readonly score: number
}

export interface Hu {
  readonly fans: Fan[]
}