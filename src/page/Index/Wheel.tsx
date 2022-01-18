import clsx from 'clsx';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  words: ReactNode[]
}
export const Wheel = (props: Props) => {
  const {words: rawWords} = props;
  const [current, setCurrent] = useState(0);
  const words = useMemo(() => rawWords.map(e => ({value: e, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(e => e.value), [rawWords]);
  const hover = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!hover.current) {
        setCurrent(c => (c - 1 + words.length) % words.length);
      }
    }, 1500);
    return () => clearInterval(id);
  }, [words]);

  return (
    <div className={'inline-block relative my-12 text-center p-1 border rounded'}
         onMouseEnter={() => hover.current = true}
         onMouseLeave={() => hover.current = false}>
      <div className={'leading-[0]'}>
        {words.map((e, i) => <div key={i} className={'invisible'}>{e}</div>)}
      </div>
      <div className={'invisible'}>{words[0]}</div>
      {words.map((e, i) => (
        <div key={i} className={clsx(
          'absolute top-1 left-0 w-full opacity-0 transition ease-linear duration-500',
          i === (current - 2 + words.length) % words.length && 'scale-50 -translate-y-12',
          i === (current - 1 + words.length) % words.length && 'scale-75 opacity-20 -translate-y-8',
          i === current && 'scale-100 opacity-95',
          i === (current + 1) % words.length && 'scale-75 opacity-20 translate-y-8',
          i === (current + 2) % words.length && 'scale-50 translate-y-12',
        )}>
          {e}
        </div>
      ))}
    </div>
  );
};