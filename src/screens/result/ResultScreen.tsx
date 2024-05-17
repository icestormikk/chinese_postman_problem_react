import ErrorMessage from '@/components/messages/ErrorMessage';
import Modal from '@/components/Modal';
import { useAppSelector } from '@/libs/redux/hooks';
import { Edge } from '@/types/graph/Edge';
import React from 'react';
import { ImFileText2 } from 'react-icons/im';
import { SlSettings } from 'react-icons/sl';
import PathWidget from './PathWidget';
import DurationWidget from './DurationWidget';

function ResultScreen() {
  const { logFilePath, response } = useAppSelector((state) => state.main)
  const { edges } = useAppSelector((state) => state.graph)
  const [errors, setErrors] = React.useState<string[]>([])
  const [isLogsModalOpen, setIsLogsModalOpen] = React.useState(false)
  const [isConfigurationModalOpen, setIsConfigurationModalOpen] = React.useState(false)
  const [logs, setLogs] = React.useState<string>("")

  const resultEdges = React.useMemo<Array<Edge<number>>>(
    () => {
      if (!response || !response.data.result?.path) return []

      const result: Edge<number>[] = []
      for (const edgeId of response.data.result.path) {
        const edge = edges.find((e) => e.id === edgeId)
        if (!edge) {
          setErrors((prevState) => [...prevState, `Не удалось найти ребро с id ${edgeId}`])
          return []
        }
        result.push(edge)
      }

      return result
    },
    [response, edges]
  )

  const onLogsOpen = React.useCallback(
    async () => {
      if (!logFilePath) return

      const logs = await window.electron.readFile(logFilePath)
      setLogs(logs)
      setIsLogsModalOpen(true) 
    },
    [logFilePath]
  )

  return (
    <div className='block'>
      <div className='w-full flex flex-row gap-2'>
        <DurationWidget duration={response?.data.result?.executionTimeMs || 0}/>
      </div>
      {
        errors.map((error, index) => <ErrorMessage key={index} message={error}/>)
      }
      <PathWidget path={resultEdges}/>
      <div className='w-full flex flex-row gap-2'>
        <button className='bg-green-500 text-white' onClick={onLogsOpen}>
          <ImFileText2/>
          Посмотреть логи программы
        </button>
        <button className='bg-green-500 text-white' onClick={() => setIsConfigurationModalOpen(true)}>
          <SlSettings/>
          Посмотреть конфигурацию
        </button>
      </div>
      {
        isLogsModalOpen && (
          <Modal 
            isOpen={isLogsModalOpen} 
            title={'Логи работы программы'}
            hasCloseBtn={true}
            onClose={() => setIsLogsModalOpen(false)}
          >
            <p className='whitespace-break-spaces leading-6 text-gray-500'>{logs}</p> 
          </Modal>
        )
      }
      {
        isConfigurationModalOpen && (
          <Modal 
            isOpen={isConfigurationModalOpen} 
            title={'Кофигурация, использованная в последнем запуске приложения'}
            hasCloseBtn={true}
            onClose={() => setIsConfigurationModalOpen(false)}
          >
            <p className='whitespace-break-spaces leading-6 text-gray-500'>{JSON.stringify(response?.start.configuration, null, 2)}</p> 
          </Modal>
        )
      }
    </div>
  );
}

export default ResultScreen;