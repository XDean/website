import {Card, CardType} from "./domain";

export function findFirstDuplicate(cards: Card[]): Card | null {
  const found = []
  for (let item of cards) {
    if (found.indexOf(item) === -1) {
      found.push(item)
    } else {
      return item
    }
  }
  return null
}

export function findFirstShun(cards: Card[]): Card[] {
  const copy = [...cards]
  for (let card of cards) {
    if (!card.type.canShun) {
      continue
    }
    const all = findNeighbours(findSameType(removeCards(cards, card), card.type), card.point, 2)

  }
  return []
}

export function removeCards(cards: Card[], ...remove: Card[]): Card[] {
  const copy = [...cards]
  for (let r of remove) {
    const index = copy.indexOf(r);
    if (index != -1) {
      copy.splice(index)
    }
  }
  return copy
}

export function findSameType(cards: Card[], type: CardType): Card[] {
  return cards.filter(c => c.type === type)
}

export function findNeighbours(cards: Card[], point: number, distance: number): Card[] {
  return cards.filter(c => Math.abs(c.point - point) <= distance)
}