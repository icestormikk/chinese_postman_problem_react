import Modal from '@/components/Modal';
import NodeShort from '@/components/NodeShort';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import AddNodeScreen from './AddNodeScreen';

function NodesScreen() {
  const { nodes } = useAppSelector((state) => state.graph)
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = React.useState(false)

  return (
    <div>
      <button className='w-full bg-green-500 text-white' onClick={() => setIsAddNodeModalOpen(true)}>
        Добавить вершину
      </button>
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
      {
        isAddNodeModalOpen && (
          <Modal 
            isOpen={isAddNodeModalOpen} 
            title={'Добавление вершины в граф'}
            hasCloseBtn={true}
            onClose={() => setIsAddNodeModalOpen(false)}
          >
            <AddNodeScreen/>
          </Modal>
        )
      }
    </div>
  );
}

export default NodesScreen;