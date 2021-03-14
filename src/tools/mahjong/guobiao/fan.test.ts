import {test} from "@jest/globals";
import {calcFan} from "./fan";
import {Combination, Dui, Fengs, Gang, Hand, Ke, Tiles, Yuans} from "./type";

test('fan', () => {
  const fans = calcFan(new Hand(new Tiles([Yuans.zhong]), []),
    new Combination([
      new Ke(Fengs.dong, false, true),
      new Ke(Fengs.nan, false, true),
      new Ke(Fengs.xi, false, true),
      new Ke(Fengs.bei, false, true),
      new Dui(Yuans.zhong),
    ]));
  console.log(fans)
})