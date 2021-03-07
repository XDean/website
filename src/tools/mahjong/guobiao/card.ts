import {CardType} from "../domain";

export const TIAO = {name: '条', canShun: true};
export const TONG = {name: '筒', canShun: true};
export const WAN = {name: '万', canShun: true};
export const ZI = {name: '字', canShun: false};

export const CardTypes: CardType[] = [TIAO, TONG, WAN, ZI]