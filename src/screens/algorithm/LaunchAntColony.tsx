import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setResponse } from '@/libs/redux/slices/mainSlice';
import { AntColonyFormProps, AntColonyProps } from '@/types/alogrithms/AntColonyProps';
import { ResultProps } from '@/types/alogrithms/ResultProps';
import { AlgorithmTypes } from '@/types/enums/AlgorithmTypes';
import { Graph } from '@/types/graph/Graph';
import React from 'react';
import { VscDebugStart, VscLoading } from 'react-icons/vsc';

function LaunchAntColony() {
  const dispatch = useAppDispatch()
  const { nodes, edges } = useAppSelector((state) => state.graph)
  const { executableFilePath, logFilePath, resultsFilePath } = useAppSelector((state) => state.main)
  const [isWorking, setIsWorking] = React.useState(false)

  const onAntColonyLaunch = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsWorking(true)
      dispatch(setResponse(undefined))
      if (!logFilePath || !executableFilePath || !resultsFilePath) return

      const target = e.target as typeof e.target & AntColonyFormProps
      const data: AntColonyProps = {
        type: AlgorithmTypes.ANT_COLONY,
        maxLength: Number(target.maxLength.value),
        startNodeId: target.startNodeId.value,
        antColony: {
          iterationCount: Number(target.iterationCount.value),
          antCount: Number(target.antCount.value),
          startPheromoneValue: Number(target.startPheromoneValue.value),
          proximityCoefficient: Number(target.proximityCoefficient.value),
          alpha: Number(target.alpha.value),
          beta: Number(target.beta.value),
          remainingPheromoneRate: Number(target.remainingPheromoneRate.value),
          q: Number(target.q.value),
        }
      }

      window.electron
        .launchAntColony(
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
                message: "Алгоритм имитиации муравьиной колонии завершил свою работу успешно",
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
    <form onSubmit={(e) => onAntColonyLaunch(e)} className='flex flex-col gap-2 p-2 rounded-md shadow-md border border-solid border-gray-200'>
      <CustomFormField id='maxLength' title={'Максимальная длина искомого пути'}>
        <input type="number" name="maxLength" id="maxLength" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id={'startNodeId'} title='Начальная вершина' commentary='Вершина, относительно которой алгоритм начнёт работу'>
        <CustomSelect 
          id={'startNodeId'} 
          options={ nodes.map((node) => ({ value: node.id, label: node.label })) }
        />
      </CustomFormField>
      <CustomFormField id='iterationCount' title={'Количество итераций алгоритма'}>
        <input type="number" name="iterationCount" id="iterationCount" defaultValue={1} min={1} step={1} required/>
      </CustomFormField>
      <CustomFormField id='antCount' title={'Количество муравьёв'} commentary='Количество "муравьёв", которые будут блуждать по графу, ориентируясь на показатель феромонов'>
        <input type="number" name="antCount" id="antCount" defaultValue={1} min={1} step={1} required/>
      </CustomFormField>
      <CustomFormField id='startPheromoneValue' title={'Начальное количество феромонов'}>
        <input type="number" name="startPheromoneValue" id="startPheromoneValue" defaultValue={2} min={0} step={0.01} required/>
      </CustomFormField>
      <CustomFormField id='proximityCoefficient' title={'Коэффициент близости'} commentary='Константа, помогающая муравьям понять, насколько близка та или иная вершина'>
        <input type="number" name="proximityCoefficient" id="proximityCoefficient" defaultValue={0.4} min={0.01} step={0.01} required/>
      </CustomFormField>
      <CustomFormField id='alpha' title={'Коэффициент alpha'} commentary='Коэффициент, показывающий насколько сильно муравьи при переходе будут обращать внимание на кол-во феромона'>
        <input type="number" name="alpha" id="alpha" defaultValue={0.5} min={0} max={1} step={0.01} required/>
      </CustomFormField>
      <CustomFormField id='beta' title={'Количество beta'} commentary='Коэффициент, показывающий насколько сильно муравьи при переходе будут обращать внимание на близость вершин'>
        <input type="number" name="beta" id="beta" defaultValue={0.5} min={0} max={1} step={0.01} required/>
      </CustomFormField>
      <CustomFormField id='remainingPheromoneRate' title={'Процент остающегося феромона'} commentary='Процент от общего количества феромона на каждом ребре, который остаётся после каждой итерации'>
        <input type="number" name="remainingPheromoneRate" id="remainingPheromoneRate" defaultValue={0.6} min={0} max={1} step={0.01} required/>
      </CustomFormField>
      <CustomFormField id='q' title={'Параметр Q'} commentary='Параметр, имеющий значение порядка цены оптимального решения'>
        <input type="number" name="q" id="q" defaultValue={4} required/>
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

export default LaunchAntColony;