import { SidebarButtonProps } from '@/types/SidebarButtonProps';
import React from 'react';

function SidebarButton({ title, children, onClick }: React.PropsWithChildren<Omit<SidebarButtonProps, 'icon'>>) {
  return (
    <div 
      className='h-14 aspect-square hover:bg-gray-400/50 bg-transparent flex justify-center items-center font-bold'
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
}

export default SidebarButton;