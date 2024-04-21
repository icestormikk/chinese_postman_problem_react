import { Edge } from '@/types/graph/Edge';
import { EdgeType } from '@/types/graph/EdgeType';
import React from 'react';

interface EdgeShortProps {
  edge: Edge<number>
}

const EdgeShort = ({ edge }: EdgeShortProps) => {
  return (
    <div className='bg-gray-200 border-[1px] border-solid border-gray-300 rounded-md p-2 flex flex-col'>
      <span><b>{edge.source.label}</b> - <b>{edge.destination.label}</b></span>
      <span className='text-sm'>Вес ребра: <b>{edge.weight}</b></span>
      <span className='text-sm'>Тип ребра: <b>{edge.type}</b></span>
      <span className='text-xs text-gray-400'>{edge.id}</span>
    </div>
  );
};

export default EdgeShort;