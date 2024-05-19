import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setResponse } from '@/libs/redux/slices/mainSlice';
import { ResultProps } from '@/types/alogrithms/ResultProps';
import { SimulatedAnnealingFormProps, SimulatedAnnealingProps } from '@/types/alogrithms/SimulatedAnnealingProps';
import { AlgorithmTypes } from '@/types/enums/AlgorithmTypes';
import { Graph } from '@/types/graph/Graph';
import React from 'react';
import { VscDebugStart, VscLoading } from 'react-icons/vsc';

function LaunchSimulatedAnnealing() {
  const dispatch = useAppDispatch()
  const { executableFilePath, logFilePath, resultsFilePath } = useAppSelector((state) => state.main)
  const [isWorking, setIsWorking] = React.useState(false)
  const { nodes, edges } = useAppSelector((state) => state.graph)

  const onSimulatedAnnealingLaunch = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsWorking(true)
      dispatch(setResponse(undefined))

      if (!logFilePath || !executableFilePath || !resultsFilePath) return

      const target = e.target as typeof e.target & SimulatedAnnealingFormProps
      const data: SimulatedAnnealingProps = {
        type: AlgorithmTypes.ANNEALING,
        annealing: {
          minTemperature: Number(target.minTemperature.value),
          maxTemperature: Number(target.maxTemperature.value),
          temperatureDecreasingCoefficient: Number(target.temperatureDecreasingCoefficient.value),
          selectedNodeId: target.selectedNodeId.value
        }
      } 

      window.electron
        .launchSimulatedAnnealing(
          logFilePath, executableFilePath, resultsFilePath, data, new Graph(nodes, edges)
        )
        .then(async () => {
          setIsWorking(false)
          const content = await window.electron.readFile(resultsFilePath)
          const result = JSON.parse(content) as ResultProps
          dispatch(
            setResponse({
              code: "SUCCESS",
              start: { configuration: data },
              data: {
                message: "Метод отжига завершил свою работу успешно",
                result
              }
            })
          )
        })
        .catch((err) => {
          setIsWorking(false)
          dispatch(
            setResponse({
              code: "FAILED",
              start: { configuration: data },
              data: {
                message: err.message,
                possibleSolution: 'Проверьте правильность заполнения полей в конфигурации'
              }
            })
          )
        })
    },
    []
  )

  return (
    <form onSubmit={onSimulatedAnnealingLaunch} className='flex flex-col gap-2 p-2 rounded-md shadow-md border border-solid border-gray-200'>
      <CustomFormField id={'selectedNodeId'} title='Начальная вершина' commentary='Вершина, относительно которой алгоритм начнёт работу'>
        <CustomSelect 
          id={'selectedNodeId'} 
          options={ nodes.map((node) => ({ value: node.id, label: node.label })) }
        />
      </CustomFormField>
      <CustomFormField id='minTemperature' title={'Минимальная температура'} commentary='Температура, по достижении которой алгоритм прекратит свою работу'>
        <input type="number" name="minTemperature" id="minTemperature" defaultValue={10} step={0.001} required/>
      </CustomFormField>
      <CustomFormField id='maxTemperature' title={'Максимальная температура'} commentary='Начальная температура'>
        <input type="number" name="maxTemperature" id="maxTemperature" defaultValue={100} step={0.001} required/>
      </CustomFormField>
      <CustomFormField id='temperatureDecreasingCoefficient' title={'Определяет насколько быстро будет понижаться температура'}>
        <input type="number" name="temperatureDecreasingCoefficient" id="temperatureDecreasingCoefficient" defaultValue={0.5} min={0} max={1} step={0.001} required/>
      </CustomFormField>
      <div className='flex flex-col gap-4 justify-center items-start'>
        <button 
          type='submit'
          className={`text-white ${executableFilePath ? 'bg-green-500' : 'bg-red-500'}`} 
          disabled={!executableFilePath || isWorking}
        >
          {isWorking ? 'Вычисляем...' : 'Запустить'}
          {isWorking ? <VscLoading size={20} className='animate-spin'/> : <VscDebugStart size={20}/>}
        </button>
      </div>
    </form>
  );
}

export default LaunchSimulatedAnnealing;