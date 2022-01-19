import clsx from 'clsx';

type Props = {
  className?: string
}

export const Dot = (props: Props) => {
  const {className} = props;
  return <div
    className={clsx('inline-block w-2 h-2 bg-white rounded-full align-middle', className)}
  />;
};