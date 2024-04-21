import EdgeShort from '@/components/EdgeShort';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';

function EdgesScreen() {
  const { edges } = useAppSelector((state) => state.graph)

  return (
    <div>
      {
        edges.length > 0 ? (
          <div className='flex flex-col gap-2'>
            <p>Общее количество рёбер: <b>{edges.length}</b></p>
            {
              edges.map((edge) => (
                <EdgeShort key={edge.id} edge={edge}/>
              ))
            }
          </div>
        ) : (
          <b className='text-gray-500'>Похоже, в графе нет ни одного ребра</b>
        )
      }
    </div>
  );
}

export default EdgesScreen;