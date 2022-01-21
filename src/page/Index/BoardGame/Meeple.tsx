import clsx from 'clsx';
import { useState } from 'react';
import { GiMeeple } from 'react-icons/gi';
import { random } from '../../../../common/util/array';
import css from './index.module.css';

const anims = [
  '',
  css.anim1,
  css.anim2,
  css.anim3,
  css.anim4,
  css.anim5,
];

type Props = {
  className?: string
}

export const Meeple = (props: Props) => {
  const {className} = props;
  const [anim, setAnim] = useState(anims[0]);
  return (
    <div>
      <GiMeeple
        className={clsx(css.meeple, className, anim)}
        onClick={() => setAnim(a => random(anims, [a]))}
      />
    </div>
  );
};