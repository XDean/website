import clsx from 'clsx';
import { About } from './About';
import { Coding } from './Coding';
import { Home } from './Home';
import css from './index.module.css';


export const Index = () => {
  return (
    <div id={'root'} className={'h-screen overflow-y-scroll snap-y scroll-smooth'}>
      <div id={'home'} className={clsx(css.page)}>
        <Home/>
      </div>
      <div id={'about'} className={clsx(css.page, css.about)}>
        <About/>
      </div>
      <div id={'coding'} className={clsx(css.page)}>
        <Coding/>
      </div>
      <div id={'board-game'} className={clsx(css.page)}>
      </div>
      <div id={'game'} className={clsx(css.page)}>
      </div>
    </div>
  );
};
