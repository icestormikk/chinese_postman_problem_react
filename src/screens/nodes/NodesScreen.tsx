import NodeShort from '@/components/NodeShort';
import { useAppSelector } from '@/libs/redux/hooks';

function NodesScreen() {
  const { nodes } = useAppSelector((state) => state.graph)

  return (
    <div>
      {
        nodes.length > 0 ? (
          <div className='flex flex-col gap-2'>
            <p>Общее количество вершин: <b>{nodes.length}</b></p>
            {
              nodes.map((node) => (
                <NodeShort key={node.id} node={node}/>
              ))
            }
          </div>
        ) : (
          <b className='text-gray-500'>Похоже, в графе нет вершин</b>
        )
      }
    </div>
  );
}

export default NodesScreen;