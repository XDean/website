import clsx from 'clsx';
import css from './index.module.css';

type Props = {
  text: string
  link: string
}

export const Link = (props: Props) => {
  const {text, link} = props;
  return (
    <a href={link}
       className={clsx(css.link,
         'inline-block px-2 py-1 rounded-lg text-white',
         'transition hover:text-gray-700 hover:bg-white')}
    >
      {text}
    </a>
  );
};