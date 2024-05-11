import { SidebarButtonProps } from '@/types/SidebarButtonProps';
import React from 'react';

function SidebarButton({ title, children, onClick, isDisabled = false }: React.PropsWithChildren<Omit<SidebarButtonProps, 'icon'>>) {
  return (
    <div 
      className='h-14 aspect-square hover:bg-gray-400/50 bg-transparent flex justify-center items-center font-bold'
      style={{display: isDisabled ? 'none' : 'flex'}}
      onClick={isDisabled ? () => {} : onClick}
      title={title}
    >
      {children}
    </div>
  );
}

export default SidebarButton;