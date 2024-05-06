import { useAppDispatch } from '@/libs/redux/hooks';
import { removeNodeById } from '@/libs/redux/slices/graphSlice';
import { Node } from '@/types/graph/Node';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface NodeShortProps {
  node: Node
}

const NodeShort = ({ node }: NodeShortProps) => {
  const dispatch = useAppDispatch()
  const onNodeRemove = React.useCallback(
    () => {
      dispatch(removeNodeById(node.id))
    },
    []
  )

  return (
    <div className='bg-gray-200 border-[1px] border-solid border-gray-300 rounded-md p-2 flex flex-row justify-between items-center'>
      <div className='flex flex-col'>
        <b>{node.label}</b>
        <span className='text-xs text-gray-400'>{node.id}</span>
      </div>
      <button className='bg-transparent' onClick={() => onNodeRemove()}>
        <AiOutlineClose/>
      </button>
    </div>
  );
};

export default NodeShort;