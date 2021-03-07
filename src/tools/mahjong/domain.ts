export class CardType {
  constructor(
    readonly name: string
  ) {
  }
}

export interface Card {
  type: CardType
  point: number
}

export class MianType {
  constructor(
    readonly name: string
  ) {
  }
}

export interface Mian {
  type: MianType
}

export interface Hand {
  cards: Card[]
  public: Mian[]
}

export interface Fan {
  name: string
  score: number
}

export interface Hu {
  fans: Fan[]
}