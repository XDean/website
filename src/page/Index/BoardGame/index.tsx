import {GiMeeple} from 'react-icons/gi';
import css from './index.module.css';
import clsx from 'clsx';
import {useList} from 'react-use';

const animationClasses = [
  'animate-spin',
  'animate-pulse',
  'animate-bounce',
  'rotate-180',
  'scale-125',
  'scale-75',
];

export const BoardGame = () => {
  const classes = [];
  for (let i = 0; i < 3; i++) {
    const [leftClasses, setLeftClasses] = useList(() => [...animationClasses]);
    const [meepleClass, setMeepleClass] = useList([]);
    classes.push({
      leftClasses,
      setLeftClasses,
      meepleClass,
      setMeepleClass,
    });
  }
  return (
    <div className={'flex flex-col items-center font-mono'}>
      <button className={'m-8'} onClick={() => {
        const {
          leftClasses,
          setLeftClasses,
          meepleClass,
          setMeepleClass,
        } = classes[Math.floor(Math.random() * 3)];
        if ((Math.random() > 0.5 || meepleClass.length === 0) && leftClasses.length !== 0) {
          const idx = Math.floor(leftClasses.length * Math.random());
          const add = leftClasses[idx];
          setLeftClasses.removeAt(idx);
          setMeepleClass.push(add);
        } else {
          const idx = Math.floor(meepleClass.length * Math.random());
          const add = meepleClass[idx];
          setMeepleClass.removeAt(idx);
          setLeftClasses.push(add);
        }
      }}>
        add
      </button>
      <div className={clsx(css.meepleContainer)}>
        <GiMeeple className={clsx(css.meeple, css.m1, ...classes[0].meepleClass)}/>
        <GiMeeple className={clsx(css.meeple, css.m2, ...classes[1].meepleClass)}/>
        <GiMeeple className={clsx(css.meeple, css.m3, ...classes[2].meepleClass)}/>
      </div>

    </div>
  );
};