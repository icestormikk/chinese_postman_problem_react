import { SidebarButtonProps } from '@/types/SidebarButtonProps';
import React from 'react';

function SidebarButton({ title, children, onClick, isDisabled = false }: React.PropsWithChildren<Omit<SidebarButtonProps, 'icon'>>) {
  return (
    <div 
      className='h-14 aspect-square hover:bg-gray-400/50 bg-transparent flex justify-center items-center font-bold'
      style={{opacity: isDisabled ? 0.5 : 1.0}}
      onClick={isDisabled ? () => {} : onClick}
      title={title + " " + (isDisabled ? '(заблокировано)' : '')}
    >
      {children}
    </div>
  );
}

export default SidebarButton;