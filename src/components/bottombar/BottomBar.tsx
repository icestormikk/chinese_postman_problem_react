import React from 'react';
import PossibleActions from './PossibleActions';

interface BottomBarProps {
  isVisible: boolean
}

function BottomBar({ isVisible }: BottomBarProps) {
  return (
    <aside className={`w-screen h-fit p-2 flex justify-center items-center fixed ${isVisible ? 'bottom-0' : '-bottom-full'} left-0 bg-black/50 duration-500 transition-all`}>
      <PossibleActions/>
    </aside>
  );
}

export default BottomBar;