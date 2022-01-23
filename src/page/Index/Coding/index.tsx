import {useMemo} from 'react';
import {VscCode} from 'react-icons/vsc';
import {CodeQuotes} from './data';
import css from './index.module.css';
import {Quotes} from './Quotes';
import {Wheel} from './Wheel';

export const Coding = () => {
  return (
    <div className={'flex flex-col items-center font-mono'}>
      <VscCode size={180} className={'rounded-full shadow overflow-hidden'}/>
      <div className={css.helloWorld} onClick={() => alert('Hello There!')}>Hello World!</div>
      <div className={'flex flex-row items-center space-x-2 text-xl'}>
        <div>I like</div>
        <Wheel shuffle words={useMemo(() => [
          'Typescript',
          'Java',
          'RxJava',
          'React',
          'Next.js',
          'Spark',
          'Spring Boot',
          '42',
          'Git',
          'Github',
          'Vercel',
          'swr',
          'Tailwind CSS',
          'Golang',
          'IDEA',
          'thinking',
          <span className={'line-through'}>Python</span>,
        ], [])}/></div>
      <Quotes quotes={CodeQuotes}/>
    </div>
  );
};