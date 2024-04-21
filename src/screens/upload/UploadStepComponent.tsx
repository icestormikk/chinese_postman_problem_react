import { UploadStepState } from '@/types/enums/UploadStepState';
import { UploadStep } from '@/types/UploadStep';
import React from 'react';
import BlockedStep from './BlockedStep';
import CompletedStep from './CompletedStep';

function UploadStepComponent({ title, description, state, children }: React.PropsWithChildren<Omit<UploadStep, 'content'>>) {
  return (
    state === UploadStepState.BLOCKED ? (
      <BlockedStep/>
    ) : (
      state === UploadStepState.COMPLETED ? (
        <CompletedStep/>
      ) : (
        <div className='flex justify-start items-center gap-4 p-2'>
          {
            state === UploadStepState.IN_PROGRESS && (
              <div className='animate-pulse duration-500 h-3 w-3 bg-green-600 rounded-full'/>
            )
          }
          <div className='flex flex-col'>
            <b>{title}</b>
            <span className='text-gray-600 italic mb-2'>{description}</span>
            {children}
          </div>
        </div>
      )
    )
  );
}

export default UploadStepComponent;