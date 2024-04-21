import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { useAppSelector } from '@/libs/redux/hooks';
import { AlgorithmTypes, getTranslatedType } from '@/types/enums/AlgorithmTypes';
import React from 'react';
import AlgorithmParameter from './AlgorithmParameter';
import { VscDebugStart } from 'react-icons/vsc';
import { VscLoading } from "react-icons/vsc";


function LaunchScreen() {
  const { executableFilePath } = useAppSelector((state) => state.main)
  const [isWorking, setIsWorking] = React.useState(false)

  const onLaunch = React.useCallback(
    async () => {
      if (!executableFilePath) {
        return
      }

      setIsWorking(true)
      setTimeout(
        () => {
          setIsWorking(false)
        },
        5000
      )
    },
    []
  )

  return (
    <div className='space-y-4'>
      {
        executableFilePath ? (
          <SuccessMessage message={`Путь до исполняемого файла установлен. Текущий путь: ${executableFilePath}`}/>
        ) : (
          <ErrorMessage message='Не установлен путь до исполнительного файла с алгоритмами. Перейдите во вкладку "Конфигурация" на правой панели приложения'/>
        )
      }
      <AlgorithmParameter title='Выберите тип алгоритма, по которому будет вычислено приблизительное решение:'>
        <select name="algorithm-type" id="algorithm-type" onChange={(event) => console.log(event.target.value) }>
          {
            Object.entries(AlgorithmTypes).map(([key, value], index) => (
              <option key={index} value={key}>{getTranslatedType(value)}</option>
            ))
          }
        </select>
      </AlgorithmParameter>
      <button 
        className={`text-white ${executableFilePath ? 'bg-green-500' : 'bg-red-500'}`} 
        onClick={onLaunch}
        disabled={!executableFilePath || isWorking}
      >
        {isWorking ? 'Вычисляем...' : 'Запустить'}
        {isWorking ? <VscLoading size={20} className='animate-spin'/> : <VscDebugStart size={20}/>}
      </button>
    </div>
  );
}

export default LaunchScreen;