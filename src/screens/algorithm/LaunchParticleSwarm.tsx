import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setResponse } from '@/libs/redux/slices/mainSlice';
import { ParticleSwarmFormProps, ParticleSwarmProps } from '@/types/alogrithms/ParticleSwarmProps';
import { ResultProps } from '@/types/alogrithms/ResultProps';
import { AlgorithmTypes } from '@/types/enums/AlgorithmTypes';
import { Graph } from '@/types/graph/Graph';
import React from 'react';
import { VscDebugStart, VscLoading } from 'react-icons/vsc';

function LaunchParticleSwarm() {
  const dispatch = useAppDispatch()
  const { executableFilePath, logFilePath, resultsFilePath } = useAppSelector((state) => state.main)
  const { nodes, edges } = useAppSelector((state) => state.graph)
  const [isWorking, setIsWorking] = React.useState(false)

  const onParticleSwarmLaunch = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsWorking(true)
      dispatch(setResponse(undefined))

      if (!logFilePath || !executableFilePath || !resultsFilePath) return

      const target = e.target as typeof e.target & ParticleSwarmFormProps
      const data: ParticleSwarmProps = {
        type: AlgorithmTypes.PARTICLES_SWARM,
        maxLength: 0,
        startNodeId: "",
        particleSwarm: {
          iterationsCount: Number(target.iterationsCount.value),
          swarmSize: Number(target.swarmSize.value),
          currentVelocityRatio: Number(target.currentVelocityRatio.value),
          localVelocityRatio: Number(target.localVelocityRatio.value),
          globalVelocityRatio: Number(target.globalVelocityRatio.value),
          startNodeId: target.startNodeId.value,
        }
      }

      window.electron
        .launchParticleSwarm(
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
                message: "Метод роя частиц завершил свою работу успешно",
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
    <form onSubmit={onParticleSwarmLaunch} className='flex flex-col gap-2 p-2 rounded-md shadow-md border border-solid border-gray-200'>
      <CustomFormField id={'startNodeId'} title='Начальная вершина' commentary='Вершина, относительно которой алгоритм начнёт работу'>
        <CustomSelect 
          id={'startNodeId'} 
          options={ nodes.map((node) => ({ value: node.id, label: node.label })) }
        />
      </CustomFormField>
      <CustomFormField id='iterationsCount' title={'Количество итераций алгоритма'}>
        <input type="number" name="iterationsCount" id="iterationsCount" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id='swarmSize' title={'Размер роя'} commentary='Количество частиц в одном рое'>
        <input type="number" name="swarmSize" id="swarmSize" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id='currentVelocityRatio' title={'Коэффициент, участвующий в нормировке скорости частицы'}>
        <input type="number" name="currentVelocityRatio" id="currentVelocityRatio" defaultValue={1} step={0.001} required/>
      </CustomFormField>
      <CustomFormField id='localVelocityRatio' title={'Весовой коэффициент для лучшего локального решения'}>
        <input type="number" name="localVelocityRatio" id="localVelocityRatio" defaultValue={1} min={0} step={0.001} required/>
      </CustomFormField>
      <CustomFormField id='globalVelocityRatio' title={'Весовой коэффициент для лучшего глобального решения'}>
        <input type="number" name="globalVelocityRatio" id="globalVelocityRatio" defaultValue={1} min={0} step={0.001} required/>
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

export default LaunchParticleSwarm;