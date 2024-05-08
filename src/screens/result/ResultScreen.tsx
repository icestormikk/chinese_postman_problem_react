import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

function ResultScreen() {
  const { response } = useAppSelector((state) => state.main)

  return (
    <div className='block'>
      <div className='w-full'>
        <DurationWidget duration={response?.data.durationInMs || 0}/>
      </div>
    </div>
  );
}

interface DurationWidgetProps {
  duration: number
}
const DurationWidget = ({ duration }: DurationWidgetProps) => {
  return (
    <div className='bg-gray-300 rounded-xl shadow-md p-2 w-fit flex justify-center items-center gap-2'>
      <AiOutlineClockCircle size={30}/>
      <span>{`${duration} мс`}</span>
    </div>
  )
}

export default ResultScreen;