import EdgeShort from '@/components/EdgeShort';
import Modal from '@/components/Modal';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import AddEdgeScreen from './AddEdgeScreen';

function EdgesScreen() {
  const { edges } = useAppSelector((state) => state.graph)
  const [isAddEdgeModalOpen, setIsAddEdgeModalOpen] = React.useState(false)

  return (
    <div>
      <button className='w-full bg-green-500 text-white' onClick={() => setIsAddEdgeModalOpen(true)}>
        Добавить ребро
      </button>
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
      {
        isAddEdgeModalOpen && (
          <Modal 
            isOpen={isAddEdgeModalOpen} 
            title={'Добавление ребра в граф'}
            hasCloseBtn={true}
            onClose={() => setIsAddEdgeModalOpen(false)}
          >
            <AddEdgeScreen/>
          </Modal>
        )
      }
    </div>
  );
}

export default EdgesScreen;