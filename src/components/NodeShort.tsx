import { Node } from '@/types/graph/Node';
import React from 'react';

interface NodeShortProps {
  node: Node
}

const NodeShort = ({ node }: NodeShortProps) => {
  return (
    <div className='bg-gray-200 border-[1px] border-solid border-gray-300 rounded-md p-2 flex flex-col'>
      <b>{node.label}</b>
      <span className='text-xs text-gray-400'>{node.id}</span>
    </div>
  );
};

export default NodeShort;