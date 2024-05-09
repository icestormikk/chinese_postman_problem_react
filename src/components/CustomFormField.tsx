import React from 'react';

interface CustomFormFieldProps {
  id: string
  title: string
  commentary?: string
}

function CustomFormField({ id, title, commentary, children }: React.PropsWithChildren<CustomFormFieldProps>) {
  return (
    <div className='hover:bg-gray-500/10 p-0.5'>
      <label htmlFor={id} className='flex justify-between items-center'>
        <span>{title}</span>
        {children}
      </label>
      <span className='text-sm text-gray-500 italic'>{commentary}</span>
    </div>
  );
}

export default CustomFormField;