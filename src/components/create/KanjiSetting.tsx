import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

interface KanjiProps {
  lenState: {
    len: number;
    setLen: Dispatch<SetStateAction<number>>;
  };
}

const KanjiSetting = ({ lenState: { len, setLen } }: KanjiProps) => {
  const count = (amount: number) => {
    const nextValue = len + amount;
    if (nextValue <= 4 && nextValue >= 2) {
      setLen(nextValue);
    }
    return;
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center'>
        <Button
          type='button'
          onClick={() => count(1)}
          variant='destructive'
          className='p-2 m-3'>
          +
        </Button>
        <div>{len}字熟語</div>
        <Button
          type='button'
          onClick={() => count(-1)}
          variant='secondary'
          className='p-2 m-3'>
          -
        </Button>
      </div>
    </div>
  );
};

export default KanjiSetting;
