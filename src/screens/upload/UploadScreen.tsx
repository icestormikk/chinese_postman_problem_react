import { AllowedUploadFileExtensions } from '@/types/enums/AllowedFIleExtensions';
import { UploadStepState } from '@/types/enums/UploadStepState';
import { UploadStep } from '@/types/UploadStep';
import React from 'react';
import { FaFile, FaMarkdown } from 'react-icons/fa6';
import { VscJson } from "react-icons/vsc";
import UploadStepComponent from './UploadStepComponent';
import Modal from '@/components/Modal';
import CorrectStructure from './CorrectStructure';
import { Graph } from '@/types/graph/Graph';
import ErrorMessage from '@/components/ErrorMessage';
import ResultReport from './ResultReport';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setEdges, setNodes } from '@/libs/redux/slices/graphSlice';

interface UploadScreenProps {
  onScreenClose: () => void
}

function UploadScreen({ onScreenClose }: UploadScreenProps) {
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isStructureModalOpen, setIsStructureModalOpen] = React.useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false)
  const [selectedPath, setSelectedPath] = React.useState<string>()
  const [pathError, setPathError] = React.useState<string>()
  const [isReading, setIsReading] = React.useState(false)
  const [readingError, setReadingError] = React.useState<string>()
  const [uploadedGraph, setUploadedGraph] = React.useState<Graph<number>>()

  const onPathSelected = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      if (!file) return

      try {
        const isExists = await window.electron.isFileExists(file.path)
        if (!isExists) {
          setPathError('Не удалось найти файл по данному пути!')
          return
        }

        if (file.type !== 'application/json') {
          setPathError('Выбранный файл имеет недопустимое разрешение!')
          return
        }

        setPathError(undefined)
        setSelectedPath(file.path)
        setCurrentStep(2)
      } catch (e: any) {
        setPathError(e.message)
      }
    },
    []
  )

  const onFileReading = React.useCallback(
    async () => {
      console.log(selectedPath)
      if (!selectedPath) return

      setIsReading(true)
      setReadingError(undefined)
      try {
        const data = await window.electron.readFile(selectedPath)
        const graph: Graph<number> = JSON.parse(data)
        setUploadedGraph(graph)
        setIsReading(false)
        setCurrentStep(3)
      } catch (e: any) {
        setReadingError(e.message)
      }
    },
    [selectedPath]
  )

  const onAccept = React.useCallback(
    () => {
      if (!uploadedGraph) return
      dispatch(setNodes(uploadedGraph.nodes))
      dispatch(setEdges(uploadedGraph.edges))
      onScreenClose()
    },
    [uploadedGraph]
  )

  const onReset = React.useCallback(
    () => {
      setCurrentStep(1)
      setSelectedPath(undefined)
    },
    []
  )

  const uploadSteps = React.useMemo<UploadStep[]>(
    () => [
      {
        title: 'Выберите файл для загрузки',
        description: `Допустимые расширения файлов: ${Object.values(AllowedUploadFileExtensions).join(', ')}`,
        content: (
          <div>
            <div className='flex justify-start items-center gap-2'>
              <label htmlFor='graph-file-upload' className='bg-green-500 p-2 rounded-md flex justify-center items-center gap-2 text-base text-white cursor-pointer'>
                Выберите файл
                <FaFile />
                <input type="file" name="graph-file-upload" id="graph-file-upload" accept={Object.values(AllowedUploadFileExtensions).join(', ')} onChange={onPathSelected}/>
              </label>
              <button className='bg-[#324da3] whitespace-nowrap text-[#efefef]' onClick={() => setIsStructureModalOpen(true)}>
                Структура файла
                <VscJson/>
              </button>
            </div>
            {pathError && <ErrorMessage message={pathError}/>}
          </div>
        ),
        state: UploadStepState.BLOCKED
      },
      {
        title: 'Считать данные из файла',
        description: 'Все требования к файлу выполнены, теперь можно прочитать файл',
        content: (
          <div>
            <button 
              className={`bg-green-500 text-white font-bold w-fit px-8 ${isReading ? 'animate-pulse' : ''}`} 
              onClick={onFileReading}
              disabled={isReading}
            >
              {isReading ? 'Идёт чтение...' : 'Прочитать'}
            </button>
            {readingError && <ErrorMessage message={readingError}/>}
          </div>
        ),
        state: UploadStepState.BLOCKED
      },
      {
        title: 'Проверка считанной информации',
        description: 'Файл был успешно прочитан. Отчёт с полученной информации о графе готов.',
        content: (
          <div className='flex gap-4'>
            <button 
              className='bg-yellow-500 text-white font-bold w-fit px-8'
              onClick={() => setIsResultModalOpen(true)}
            >
              Просмотреть отчёт
            </button>
            <button className='bg-green-500 text-white font-bold' onClick={onAccept}>
              Применить
            </button>
            <button className='bg-red-600 text-white font-bold' onClick={onReset}>
              Отменить
            </button>
          </div>
        ),
        state: UploadStepState.BLOCKED
      }
    ],
    [selectedPath, pathError, readingError, isReading]
  )


  return (
    <div className='block space-y-4'>
      {
        uploadSteps.map((step, index) => (
          <UploadStepComponent 
            key={index} 
            title={`${index + 1}. ${step.title}`} 
            description={step.description}
            state={(index + 1) === currentStep ? UploadStepState.IN_PROGRESS : ((index + 1) > currentStep ? UploadStepState.BLOCKED : UploadStepState.COMPLETED)}
          >
            {step.content}
          </UploadStepComponent>
        ))
      }
      {
        isStructureModalOpen && (
          <Modal 
            isOpen={isStructureModalOpen} 
            title="Правильная структура файла"
            hasCloseBtn={true}
            onClose={() => setIsStructureModalOpen(false)}
          >
            <CorrectStructure />
          </Modal>
        )
      }
      {
        isResultModalOpen && (
          <Modal 
            isOpen={isResultModalOpen} 
            title="Отчёт"
            hasCloseBtn={true}
            onClose={() => setIsResultModalOpen(false)}
          >
            <ResultReport nodes={uploadedGraph?.nodes || []} edges={uploadedGraph?.edges || []} />
          </Modal>
        )
      }
    </div>
  );
}

export default UploadScreen;