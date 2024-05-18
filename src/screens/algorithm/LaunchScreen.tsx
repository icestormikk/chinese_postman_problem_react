import React from 'react';
import ErrorMessage from '@/components/messages/ErrorMessage';
import { useAppSelector } from '@/libs/redux/hooks';
import { AlgorithmTypes, getTranslatedType } from '@/types/enums/AlgorithmTypes';
import AlgorithmParameter from './AlgorithmParameter';
import LaunchGenetic from './LaunchGenetic';
import SuccessMessage from '@/components/messages/SuccessMessage';
import AlgorithmFailedBlock from './AlgorithmFailedBlock';
import LaunchAntColony from './LaunchAntColony';


function LaunchScreen() {
  const { executableFilePath, logFilePath, resultsFilePath, response } = useAppSelector((state) => state.main)
  const nodes = useAppSelector((state) => state.graph.nodes)
  const [errors, setErrors] = React.useState<string[]>([])
  const [selectedType, setSelectedType] = React.useState<AlgorithmTypes>()

  React.useEffect(
    () => {
      setErrors([])
      if (!executableFilePath) {
        setErrors((prevValue) => [...prevValue, "Не установлен путь до исполнительного файла с алгоритмами. Перейдите во вкладку \"Конфигурация\" на правой панели приложения"])
      }
      if(!logFilePath) {
        setErrors((prevValue) => [...prevValue, "Не установлен путь до файла для логов приложения. Перейдите во вкладку \"Конфигурация\" на правой панели приложения"])
      }
      if (!resultsFilePath) {
        setErrors((prevValue) => [...prevValue, "Не установлен путь до файла для вывода результатов. Перейдите во вкладку \"Конфигурация\" на правой панели приложения"])
      }
      if (nodes.length === 0) {
        setErrors((prevValue) => [...prevValue, "Граф должен содержать как минимум одну вершину"])
      }
    },
    [executableFilePath, nodes]
  )

  return (
    <div className='space-y-4'>
      {
        errors.length > 0 ? (
          errors.map((error, index) => (
            <ErrorMessage key={index} message={error}/>
          ))
        ) : (
          <>
            <AlgorithmParameter title='Выберите тип алгоритма, по которому будет вычислено приблизительное решение:'>
              <select name="algorithm-type" id="algorithm-type" onChange={(event) => setSelectedType(AlgorithmTypes[event.target.value as keyof typeof AlgorithmTypes])}>
                <option value="">Не выбрано</option>
                {
                  Object.entries(AlgorithmTypes).map(([key, value], index) => (
                    <option key={index} value={key}>{getTranslatedType(value)}</option>
                  ))
                }
              </select>
            </AlgorithmParameter>
            {
              selectedType === AlgorithmTypes.GENETIC && <LaunchGenetic/>
            }
            {
              selectedType === AlgorithmTypes.ANT_COLONY && <LaunchAntColony/>
            }
            {
              response?.code === "SUCCESS" && <SuccessMessage message={response.data.message}/>
            }
            {
              response?.code === "FAILED" && <AlgorithmFailedBlock/>
            }
          </>
        )
      }
    </div>
  );
}

export default LaunchScreen;