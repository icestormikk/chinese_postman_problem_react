import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { getTranslatedMutationType, MutationTypes } from '@/types/enums/MutationTypes';
import { getTranslatedParentsChooserType, ParentsChooserTypes } from '@/types/enums/ParentsChooserTypes';
import { getTranslatedParentsSelectionType, ParentsSelectionType } from '@/types/enums/ParentsSelectionTypes';
import { getTranslatedRecombinationType, RecombinationTypes } from '@/types/enums/RecombinationTypes';
import React from 'react';
import CustomSelect from '../../components/CustomSelect';
import CustomFormField from '../../components/CustomFormField';
import { getNewPopulationSelectionType, NewPopulationSelectionTypes } from '@/types/enums/NewPopulationSelectionTypes';
import { GeneticAlgorithmFormProps, GeneticAlgorithmProps } from '@/types/alogrithms/GeneticAlgorithmProps';
import { VscDebugStart, VscLoading } from 'react-icons/vsc';
import { Graph } from '@/types/graph/Graph';
import { setResponse } from '@/libs/redux/slices/mainSlice';
import { AlgorithmTypes } from '@/types/enums/AlgorithmTypes';
import { ResultProps } from '@/types/alogrithms/ResultProps';

function LaunchGenetic() {
  const dispatch = useAppDispatch()
  const { executableFilePath, logFilePath, resultsFilePath } = useAppSelector((state) => state.main)
  const { nodes, edges } = useAppSelector((state) => state.graph)
  const [isWorking, setIsWorking] = React.useState(false)

  const onGeneticAlgorithmLaunch = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsWorking(true)
      dispatch(setResponse(undefined))
      if (!logFilePath || !executableFilePath || !resultsFilePath) return

      const target = e.target as typeof e.target & GeneticAlgorithmFormProps

      const data: GeneticAlgorithmProps = {
        type: AlgorithmTypes.GENETIC,
        maxLength: Number(target.maxLength.value),
        startNodeId: target.startNodeId.value,
        genetic: {
          iterationsCount: Number(target.iterationsCount.value),
          populationSize: Number(target.populationSize.value),
          parents: {
            selection: target.parentsSelectionMethod.value,
            chooser: target.parentsChooserMethod.value
          },
          recombination: {
            type: target.recombinationType.value,
            rate: Number(target.recombinationRate.value)
          },
          mutation: {
            type: target.mutationType.value,
            rate: Number(target.mutationRate.value)
          },
          newPopulation: {
            type: target.newPopulationSelectionMethod.value,
            rate: Number(target.newPopulationRate.value)
          }
        }
      }
      
      window.electron
        .launchGeneticAlgorithm(
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
                message: "Алгоритм завершил свою работу успешно",
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
    <form onSubmit={onGeneticAlgorithmLaunch} className='flex flex-col gap-2 p-2 rounded-md shadow-md border border-solid border-gray-200'>
      <CustomFormField id='maxLength' title={'Максимальная длина пути'}>
        <input type="number" name="maxLength" id="maxLength" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id='iterationsCount' title={'Количество итераций алгоритма'}>
        <input type="number" name="iterationsCount" id="iterationsCount" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id='populationSize' title={'Количество особей в популяции'}>
        <input type="number" name="populationSize" id="populationSize" defaultValue={1} min={1} required/>
      </CustomFormField>
      <CustomFormField id={'startNodeId'} title='Начальная вершина' commentary='Вершина, относительно которой алгоритм начнёт работу'>
        <CustomSelect 
          id={'startNodeId'} 
          options={ nodes.map((node) => ({ value: node.id, label: node.label })) }
        />
      </CustomFormField>
      <CustomFormField 
        id={'parentsSelectionMethod'} 
        title='Способ отбора особей для размножения' 
        commentary='Метод получения набора особей, допущенных до размножения'
      >
        <CustomSelect 
          id={'parentsSelectionMethod'} 
          options={
            Object.entries(ParentsSelectionType).map(([key, value]) => ({ value: key, label: getTranslatedParentsSelectionType(value)}))
          } 
        />
      </CustomFormField>
      <CustomFormField 
        id={'parentsChooserMethod'} 
        title='Метод отбора родителей'
        commentary='Алгоритм получения двух особей-родителей из набора, полученного на предыдущем шаге'
      >
        <CustomSelect 
          id={'parentsChooserMethod'} 
          options={
            Object.entries(ParentsChooserTypes).map(([key, value]) => ({ value: key, label: getTranslatedParentsChooserType(value)}))
          } 
        />
      </CustomFormField>
      <CustomFormField 
        id={'recombinationType'} 
        title='Способ рекомбинации генов'
        commentary='Получение одного-двух "потомков" путём перемешивания родительских генов'
      >
        <CustomSelect 
          id={'recombinationType'} 
          options={
            Object.entries(RecombinationTypes).map(([key, value]) => ({ value: key, label: getTranslatedRecombinationType(value)}))
          } 
        />
      </CustomFormField>
      <CustomFormField id='recombinationRate' title={'Вероятность проведения рекомбинации'}>
        <input type="number" name="recombinationRate" id="recombinationRate" defaultValue={1} min={0} max={1} step={0.001} required/>
      </CustomFormField>
      <CustomFormField 
        id={'mutationType'} 
        title='Оператор мутации'
        commentary='Изменение одного или нескольких генов потомков'
      >
        <CustomSelect 
          id={'mutationType'} 
          options={
            Object.entries(MutationTypes).map(([key, value]) => ({ value: key, label: getTranslatedMutationType(value)}))
          }
        />
      </CustomFormField>
      <CustomFormField id='mutationRate' title={'Вероятность мутации'} commentary='Вероятность, с которой гены, содержащиеся в особи, мутируют'>
        <input type="number" name="mutationRate" id="mutationRate" defaultValue={0} min={0} max={1} step={0.001} required/>
      </CustomFormField>
      <CustomFormField 
        id={'newPopulationSelectionMethod'} 
        title='Способ формирования следующего поколения'
        commentary='Определите алгоритм, по которому особи будут отбираться в следующее поколение'
      >
        <CustomSelect 
          id={'newPopulationSelectionMethod'} 
          options={
            Object.entries(NewPopulationSelectionTypes).map(([key, value]) => ({ value: key, label: getNewPopulationSelectionType(value)}))
          }
        />
      </CustomFormField>
      <CustomFormField 
        id='newPopulationRate' 
        title={'Процент особей, которые пройдут отбор'} 
        commentary='Процент особей от общего числа предыдущей пополяции, которые смогут участвовать в дальнейшем размножении'
      >
        <input type="number" name="newPopulationRate" id="newPopulationRate" defaultValue={0} min={0} max={1} step={0.01} required/>
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

export default LaunchGenetic;