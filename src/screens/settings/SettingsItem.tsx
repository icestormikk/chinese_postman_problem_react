import { SettingsItemProps } from '@/types/SettingsItemProps';
import React from 'react';

function SettingsItem({ title, description, children }: React.PropsWithChildren<SettingsItemProps>) {
  return (
    <div className='text-gray-700 flex flex-col'>
      <b>{title}</b>
      {description && <span className='text-gray-500 text-sm mb-2'>{description}</span>}
      {children}
    </div>
  );
}

export default SettingsItem;