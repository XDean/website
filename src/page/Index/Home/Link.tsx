import clsx from 'clsx';
import {easeInOut, windowSmoothScroll} from '../../../../common/util/dom';
import css from './index.module.css';
import {useMemo} from 'react';
import {FiExternalLink} from 'react-icons/fi';

type Props = {
  text: string
  link: string
  targetBlank?: boolean
}

export const Link = (props: Props) => {
  const {text, link, targetBlank = false} = props;
  return (
    <a href={link}
       target={targetBlank ? '_blank' : undefined}
       className={clsx(css.link,
         'group relative inline-block px-2 py-1 rounded-lg text-white',
         'transition hover:text-gray-700 hover:bg-white')}
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
      {targetBlank &&
      <FiExternalLink
        className={'opacity-0 group-hover:opacity-75 absolute -right-2 -top-2 w-4 h-4 bg-white rounded'}/>}
    </a>
  );
};