import Image from '../../../common/components/Image';
import { PropsOf } from '../../../common/util/react';

type Props = {
  href: string
  blank?: boolean
} & PropsOf<typeof Image>

export const IconLink = (props: Props) => {
  const {href, blank, ...rest} = props;
  return (
    <a href={href} target={blank && '_blank'} className={'rounded-full overflow-hidden hover:ring'}>
      <Image {...rest}/>
    </a>
  );
};