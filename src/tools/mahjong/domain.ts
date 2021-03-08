export interface CardType {
  readonly name: string
  readonly canShun: boolean
}

export interface Card<T = CardType> {
  readonly type: T
  readonly point: number
}

export interface MianType {
  readonly name: string
  readonly count: number
}

export interface Mian<T = MianType> {
  readonly type: T
}

export interface Hand<C = CardType, M = MianType> {
  readonly cards: Card<C>[]
  readonly public: Mian<M>[]
}

export interface Combination<M = MianType> {
  readonly mians: Mian<M>[]
}

export interface Fan {
  readonly name: string
  readonly score: number
}

export interface Hu {
  readonly fans: Fan[]
}