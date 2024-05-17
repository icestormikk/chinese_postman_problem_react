import { Edge } from '@/types/graph/Edge';

interface PathEdgeProps {
  index: number
  edge: Edge<number>
}

function PathEdge({ index, edge }: PathEdgeProps) {
  return (
    <div className='flex flex-row gap-4 justify-between items-center py-0.5 px-4 rounded-md bg-gray-200'>
      <div className='flex justify-start items-center flex-row gap-4'>
        <b className='text-3xl text-gray-500'>{index}</b>
        <div className='flex flex-col'>
          <span>{`${edge.source.label} -> ${edge.destination.label}`}</span>
          <span className='text-gray-500'>{`Расстояние: ${edge.weight}`}</span>
        </div>
      </div>
      <span className='text-gray-500 text-sm'>{edge.id}</span>
    </div>
  );
}

export default PathEdge;