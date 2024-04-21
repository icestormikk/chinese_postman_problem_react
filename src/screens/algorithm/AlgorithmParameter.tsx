import { AlgorithmTypes, getTranslatedType } from '@/types/enums/AlgorithmTypes';
import React from 'react';

interface AlgorithmParameterProps {
  title: string
}

function AlgorithmParameter({ title, children }: React.PropsWithChildren<AlgorithmParameterProps>) {
  return (
    <div className='flex flex-col gap-2'>
      <b>{title}</b>
      {children}
    </div>
  );
}

export default AlgorithmParameter;