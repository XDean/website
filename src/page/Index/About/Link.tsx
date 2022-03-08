import clsx from 'clsx';
import { easeInOut, windowSmoothScroll } from '../../../../common/util/dom';

type Props = {
  text: string
  link: string
}

export const Link = (props: Props) => {
  const {text, link} = props;
  return (
    <a href={link}
       className={clsx('underline underline-offset-2',
         'inline-block p-1 rounded-lg text-black',
         'transition hover:text-gray-300 hover:bg-black')}
       onClick={e => {
         if (link.startsWith('#')) {
           e.preventDefault();
           windowSmoothScroll({
             el: document.getElementById(link.slice(1)),
             duration: 500,
             stepFunc: easeInOut,
             force: true,
           });
         }
       }}
    >
      {text}
    </a>
  );
};