import { useEffect, useState } from 'react';

type Props = {
  birth: Date
}
export const Age = (props: Props) => {
  const {birth} = props;
  const [age, setAge] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear() - birth.getFullYear();
      now.setFullYear(birth.getFullYear());
      setAge(year + (now.getTime() - birth.getTime()) / 1000 / 60 / 60 / 24 / 365);
    }, 100);
    return () => clearInterval(id);
  }, [birth]);
  return <span>{age.toFixed(10)}</span>;
};