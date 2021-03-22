import {PageData} from "../../util/util";
import * as React from "react";
import {PropsWithChildren} from "react";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import {VscEllipsis, VscFoldUp} from "react-icons/vsc";

export type MyPaginationProps = {
  data: PageData<any>
  onPageChange?: (page: number) => void
}

export const MyPagination = ({data, onPageChange}: MyPaginationProps) => {
  const pages = [...Array(11).keys()].map(i => i + data.page - 5).filter(i => i > 0 && i <= data.total);
  const first = data.page === 1
  const last = data.page === data.total
  const showPrev = pages[0] !== 1
  const showNext = pages[pages.length - 1] !== data.total

  return (
    <div className={'flex items-center text-xl justify-center'}>
      <Item onClick={() => onPageChange(1)} active={!first} data-tip={'第1页'}>
        <VscFoldUp className={'transform -rotate-90 scale-75'}/>
      </Item>
      {showPrev && (
        <Item onClick={() => onPageChange(pages[0] - 1)} active className={'pt-3'}>
          <VscEllipsis/>
        </Item>
      )}
      {pages.map(p => (
        <Item onClick={() => onPageChange(p)} active selected={p === data.page}>
          {p}
        </Item>
      ))}
      {showNext && (
        <Item onClick={() => onPageChange(pages[pages.length - 1] + 1)} active className={'pt-3'}>
          <VscEllipsis/>
        </Item>
      )}
      <Item onClick={() => onPageChange(data.total)} active={!last} data-tip={`第${data.total}页`}>
        <VscFoldUp className={'transform rotate-90 scale-75'}/>
      </Item>
      <ReactTooltip place={'bottom'} effect={'solid'} type={'dark'}/>
    </div>
  )
}

const Item = ({
                active,
                selected,
                children,
                className,
                onClick,
                ...rest
              }: PropsWithChildren<{ active: boolean, selected?: boolean, className?: string, onClick: () => void } & any>) => {
  return (
    <div
      onClick={() => active && !selected && onClick()}
      className={clsx(
        'p-1 border w-8 h-8 flex items-center justify-center',
        active ? 'cursor-pointer hover:bg-indigo-100 hover:underline' : 'cursor-not-allowed text-gray-400',
        {'bg-indigo-100': selected},
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}