import React from 'react';

export interface BottomBarActionProps {
  title: string
  icon: JSX.Element,
  onClick: () => void
}

function BottomBarAction({ title, icon, onClick }: BottomBarActionProps) {
  return (
    <button onClick={onClick} className='bg-gray-300 rounded-md p-1 flex justify-start items-center flex-row'>
      {icon}
      <b>{title}</b>
    </button>
  );
}

export default BottomBarAction;