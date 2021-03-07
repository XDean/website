import {Card, Mian, MianType} from "../domain";
import {findFirstDuplicate} from "../util";

interface Type extends MianType {
  find(cards: Card[]): Card[]
}

export const DUI = {
  name: '对',
  find: cards => {
    const dup = findFirstDuplicate(cards)
    return [dup, dup]
  },
};
export const SHUN = {
  name: '顺',
  find: cards => {
    return []
  },
};
export const KE = {
  name: '刻',
  find: cards => {
    return []
  },
};
export const GANG = {
  name: '杠',
  find: cards => {
    return []
  },
};
export const AN_GANG = {
  name: '暗杠',
  find: cards => {
    return []
  },
};
export const BU_KAO = {
  name: '不靠',
  find: cards => {
    return []
  },
};
export const SHI_SAN_YAO = {
  name: '十三幺',
  find: cards => {
    return []
  },
};
export const MianTypes: Type[] = [DUI, SHUN, KE, GANG, AN_GANG, BU_KAO, SHI_SAN_YAO]