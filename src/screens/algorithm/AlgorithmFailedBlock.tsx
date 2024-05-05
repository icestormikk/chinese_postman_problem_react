import ErrorMessage from '@/components/messages/ErrorMessage';
import Modal from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setResponse } from '@/libs/redux/slices/mainSlice';
import React from 'react';
import { ImFileText2 } from "react-icons/im";
import { MdDelete } from 'react-icons/md';
import { TbMessage2Exclamation } from "react-icons/tb";

function AlgorithmFailedBlock() {
  const dispatch = useAppDispatch()
  const { logFilePath, response } = useAppSelector((state) => state.main)
  const [isErrorMessageModalOpen, setIsErrorMessageModalOpen] = React.useState(false)
  const [isLogsModalOpen, setIsLogsModalOpen] = React.useState(false)
  const [logs, setLogs] = React.useState<string>()

  const onLogsOpen = React.useCallback(
    async () => {
      if (!logFilePath) return

      const logs = await window.electron.readFile(logFilePath)
      setLogs(logs)
      setIsLogsModalOpen(true)
    },
    [logFilePath]
  )

  const onCleanLogs = React.useCallback(
    () => {
      dispatch(setResponse(undefined))
    },
    [dispatch]
  )

  return (
    <div className='rounded-md overflow-hidden shadow-xl text-[#efefef] flex flex-col border-[1px] border-gray-300 
    border-solid p-2'>
      <ErrorMessage message='Последняя попытка запуска алгоритма завершилась неудачно'/>
      <div className='flex gap-2 flex-row'>
        <button 
          className='bg-[#c72b2b] text-[#efefef]'
          onClick={() => setIsErrorMessageModalOpen(true)}
        >
          <TbMessage2Exclamation/>
          Посмотреть сообщение об ошибке
        </button>
        <button 
          className='bg-[#efefef] border-gray-300 border-solid border-[1px]'
          onClick={onLogsOpen}
        >
          <ImFileText2/>
          Посмотреть логи программы
        </button>
        <button 
          className='bg-[#efefef] border-gray-300 border-solid border-[1px]'
          onClick={onCleanLogs}
        >
          <MdDelete/>
          Очистить
        </button>
      </div>
      {
        isErrorMessageModalOpen && (
          <Modal 
            isOpen={isErrorMessageModalOpen} 
            title="Сообщение об ошибке"
            onClose={() => setIsErrorMessageModalOpen(false)}
            hasCloseBtn={true}
          >
            <p>Работа алгоритма завершилась неудачно по причине:</p>
            <pre className='whitespace-break-spaces text-gray-500'>{response?.data.message}</pre>
          </Modal>
        )
      }
      {
        isLogsModalOpen && (
          <Modal 
            isOpen={isLogsModalOpen} 
            title="Логи программы"
            onClose={() => setIsLogsModalOpen(false)}
            hasCloseBtn={true}
          >
            <p className='whitespace-break-spaces leading-6 text-gray-500'>{logs}</p>
          </Modal>
        )
      }
    </div>
  );
}

export default AlgorithmFailedBlock;