import React from 'react';
import { FaLock } from 'react-icons/fa6';

const BlockedStep = () => {
  return (
    <div className='w-full h-full bg-gray-300/50 flex justify-center items-center gap-4 px-2 py-4 rounded-md
    text-gray-400 text-xl'>
      <b>Закрыто</b>
      <FaLock/>
    </div>
  );
};

export default BlockedStep;