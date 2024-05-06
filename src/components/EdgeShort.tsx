import { useAppDispatch } from '@/libs/redux/hooks';
import { removeEdgeById } from '@/libs/redux/slices/graphSlice';
import { Edge } from '@/types/graph/Edge';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface EdgeShortProps {
  edge: Edge<number>
}

const EdgeShort = ({ edge }: EdgeShortProps) => {
  const dispatch = useAppDispatch()
  const onEdgeRemove = React.useCallback(
    () => {
      dispatch(removeEdgeById(edge.id))
    },
    []
  )

  return (
    <div className='bg-gray-200 border-[1px] border-solid border-gray-300 rounded-md p-2 flex flex-row justify-between items-center'>
      <div className='flex flex-col gap-2'>
        <span><b>{edge.source.label}</b> - <b>{edge.destination.label}</b></span>
        <span className='text-sm'>Вес ребра: <b>{edge.weight}</b></span>
        <span className='text-sm'>Тип ребра: <b>{edge.type}</b></span>
        <span className='text-xs text-gray-400'>{edge.id}</span>
      </div>
      <button className='bg-transparent' onClick={() => onEdgeRemove()}>
        <AiOutlineClose/>
      </button>
    </div>
  );
};

export default EdgeShort;