import reed from './reed.jpg';
import Image from '../../../../common/components/Image';
import css from './index.module.css'

export const Reed = () => {
  return (
    <div className={css.root}>
      <Image src={reed}
             maxWidth={'100vw'}
             className={css.img}
             alt={'Mountains'}
             layout={'fill'}
             objectFit={'cover'}
             quality={100}
             priority={true}
      />
    </div>
  );
};