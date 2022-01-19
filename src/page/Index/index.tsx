import { useEffect, useRef } from 'react';
import { smoothScroll } from '../../../common/util/dom';
import { About } from './About';
import { Coding } from './Coding';
import { Home } from './Home';
import css from './index.module.css';
import Timeout = NodeJS.Timeout;


export const Index = () => {
  const rootRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      let lastPos = root.scrollTop;
      let scrollDown = true;
      let scrolling = false;
      let taskId: Timeout;
      const listener = (e: Event) => {
        if (scrolling) {
          e.preventDefault();
          return;
        }
        scrollDown = root.scrollTop > lastPos;
        lastPos = root.scrollTop;
        let target: Element;
        for (let i = 0; i < root.children.length; i++) {
          const c = root.children.item(i);
          const offset = c.getBoundingClientRect().y;
          if (offset === 0) {
            return;
          } else if (offset > 0) {
            if (scrollDown) {
              target = c;
            } else {
              target = c.previousElementSibling!;
            }
            break;
          }
        }
        if (target) {
          const targetPos = root.scrollTop + target.getBoundingClientRect().y;
          clearTimeout(taskId);
          taskId = setTimeout(() => {
            scrolling = true;
            history.replaceState(null, null, `#${target.id}`)
            smoothScroll({
              element: root,
              from: lastPos,
              to: targetPos,
              onDone: () => scrolling = false,
              duration: 300,
            });
          }, 500);
        }
      };
      root.addEventListener('scroll', listener);
      return () => {
        root.removeEventListener('scroll', listener);
      };
    }
  }, [rootRef]);

  return (
    <div id={'root'} className={'h-screen overflow-y-scroll'} ref={rootRef}>
      <div id={'home'} className={css.page}>
        <Home/>
      </div>
      <div id={'about'} className={css.page}>
        <About/>
      </div>
      <div id={'coding'} className={css.page}>
        <Coding/>
      </div>
      <div id={'board-game'} className={css.page}>
      </div>
      <div id={'game'} className={css.page}>
      </div>
    </div>
  );
};
