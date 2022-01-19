import {Quote} from './data';
import {useState} from 'react';
import {HiRefresh} from 'react-icons/hi';

type Props = {
  quotes: Quote[]
}
export const Quotes = (props: Props) => {
  const {quotes} = props;
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * quotes.length));
  const quote = quotes[current % quotes.length];
  const nextQuote = () => {
    setCurrent(Math.floor(Math.random() * quotes.length));
  };
  return (
    <div className={'relative font-mono p-4 mx-4 group w-[600px] max-w-[90vw]'}>
      <div className={'absolute top-0 left-0 w-16 h-8 border-white border-t-2 border-l-2'}/>
      <div className={'absolute bottom-0 right-0 w-16 h-8 border-white border-b-2 border-r-2'}/>
      <HiRefresh className={'absolute left-0 bottom-0 opacity-0 cursor-pointer group-hover:opacity-100 transition'}
                 size={20}
                 onClick={nextQuote}/>
      <div>{quote.zh}</div>
      <div>{quote.en}</div>
      <div className={'text-right'}>-- {quote.by}</div>
    </div>
  );
};