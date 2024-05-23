import CustomFormField from '@/components/CustomFormField';
import ErrorMessage from '@/components/messages/ErrorMessage';
import SuccessMessage from '@/components/messages/SuccessMessage';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setEdges, setNodes } from '@/libs/redux/slices/graphSlice';
import { BuildGraphFormProps, BuildGraphProps } from '@/types/BuildGraphProps';
import { Edge } from '@/types/graph/Edge';
import { EdgeType } from '@/types/graph/EdgeType';
import { Node } from '@/types/graph/Node';
import React from 'react';
import { VscDebugStart, VscLoading } from 'react-icons/vsc';
import { v4 } from 'uuid';

function BuildRandomGraphScreen() {
  const dispatch = useAppDispatch()
  const [isWorking, setIsWorking] = React.useState(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [successMessage, setSuccessMessage] = React.useState<string>()
  
  const onGraphBuild = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setErrors([])
      setSuccessMessage(undefined)

      const target = e.target as typeof e.target & BuildGraphFormProps
      const data: BuildGraphProps = {
        nodesCount: Number(target.nodesCount.value),
        connectNodeChance: Number(target.connectNodeChance.value),
        orientedChance: Number(target.orientedChance.value),
        minWeight: Number(target.minWeight.value),
        maxWeight: Number(target.maxWeight.value)
      }

      if (data.nodesCount <= 0 || data.connectNodeChance <= 0 || data.orientedChance <= 0) {
        setErrors((prevState) => [...prevState, "Все значения должны быть строго положительными"])
        return
      }

      setIsWorking(true)
      const result: { nodes: Array<Node>, edges: Array<Edge<number>> } = { nodes: [], edges: [] }

      for (let i = 0; i < data.nodesCount; i++) {
        result.nodes.push(new Node(`Node-${i}`, v4()))
      }

      for (let i = 0; i < result.nodes.length; i++) {
        for (let j = 0; j < result.nodes.length; j++) {
          if (i === j || Math.random() > data.connectNodeChance) continue

          const nodeFrom = result.nodes[i]
          const nodeTo = result.nodes[j]

          const isAlreadyExist = result.edges.find((edge) => 
            (edge.type === EdgeType.NOT_ORIENTED && [edge.source, edge.destination].includes(nodeFrom) && [edge.source, edge.destination].includes(nodeTo)) ||
            (edge.type === EdgeType.DIRECTED && (edge.source.id == nodeFrom.id && edge.destination.id == nodeTo.id))
          )

          if (isAlreadyExist) continue

          result.edges.push(
            new Edge(
              nodeFrom,
              nodeTo,
              Math.random() * (data.maxWeight - data.minWeight) + data.minWeight, 
              Math.random() < data.orientedChance ? EdgeType.DIRECTED : EdgeType.NOT_ORIENTED,
              v4()
            )
          )
        }
      }

      dispatch(setNodes(result.nodes))
      dispatch(setEdges(result.edges))
      setIsWorking(false)
      setSuccessMessage("Граф успешно построен")
    },
    []
  )  

  return (
    <form onSubmit={onGraphBuild}>
      <CustomFormField id='nodesCount' title='Размер графа' commentary='Количество вершин в графе'>
        <input type="number" name="nodesCount" id="nodesCount" defaultValue={3} min={1} required/>
      </CustomFormField>
      <CustomFormField id='connectNodeChance' title='Вероятность создания ребра между вершинами'>
        <input type="number" name="connectNodeChance" id="connectNodeChance" defaultValue={0.5} min={0} max={1} step={0.01}/>
      </CustomFormField>
      <CustomFormField id='orientedChance' title='Вероятность того, что созданное ребро будет ориентированным'>
        <input type="number" name="orientedChance" id="orientedChance" defaultValue={0.5} min={0} max={1} step={0.01}/>
      </CustomFormField>
      <CustomFormField id='minWeight' title='Минимальный вес ребра'>
        <input type="number" name="minWeight" id="minWeight" defaultValue={0} min={0} step={0.01}/>
      </CustomFormField>
      <CustomFormField id='maxWeight' title='Максимальный вес ребра'>
        <input type="number" name="maxWeight" id="maxWeight" defaultValue={100} min={0} step={0.01}/>
      </CustomFormField>
      <div className='flex flex-col gap-4 justify-center items-start'>
        <button 
          type='submit'
          className={`text-white bg-green-500`} 
          disabled={isWorking}
        >
          {isWorking ? 'Вычисляем...' : 'Запустить'}
          {isWorking ? <VscLoading size={20} className='animate-spin'/> : <VscDebugStart size={20}/>}
        </button>
      </div>
      {
        successMessage && <SuccessMessage message={successMessage}/>
      }
      {
        errors.length > 0 && (
          errors.map((error, index) => (
            <ErrorMessage key={index} message={error}/>
          ))
        )
      }
    </form>
  );
}

export default BuildRandomGraphScreen;