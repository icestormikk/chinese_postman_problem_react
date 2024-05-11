import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import ErrorMessage from '@/components/messages/ErrorMessage';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setEdges } from '@/libs/redux/slices/graphSlice';
import { Edge } from '@/types/graph/Edge';
import React from 'react';
import { v4 } from 'uuid';

type AddEdgeFormProps = {
  sourceNode: {value: string },
  destinationNode: { value: string },
  edgeWeight: { value: number }
}

function AddEdgeScreen() {
  const dispatch = useAppDispatch()
  const { nodes, edges } = useAppSelector((state) => state.graph)
  const [errors, setErrors] = React.useState<string[]>([])

  const onEdgeCreate = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrors([])

      const target = event.target as typeof event.target & AddEdgeFormProps
      const data = {
        source: target.sourceNode.value,
        destination: target.destinationNode.value,
        weight: Number(target.edgeWeight.value)
      }

      const sourceNode = nodes.find((n) => n.id === data.source)
      const destinationNode = nodes.find((n) => n.id === data.destination)

      if (!sourceNode) {
        setErrors((prevState) => [...prevState, "Не удалось найти начальную вершину"])
        return
      }
      if (!destinationNode) {
        setErrors((prevState) => [...prevState, "Не удалось найти конечную вершину"])
        return
      }
      if (data.weight < 0) {
        setErrors((prevState) => [...prevState, "Вес ребра не может быть отрицательным"])
        return
      }

      const edge = new Edge(sourceNode!, destinationNode!, data.weight, v4())
      dispatch(setEdges([...edges, edge]))
    },
    [nodes, edges, errors]
  )

  return (
    <form onSubmit={(event) => onEdgeCreate(event)} className='flex flex-col gap-2'>
      <CustomFormField id={'sourceNode'} title={'Начальная вершина'}>
        <CustomSelect 
          id={'sourceNode'} 
          options={nodes.map((node) => ({ value: node.id, label: node.label }))}
        />
      </CustomFormField>
      <CustomFormField id={'destinationNode'} title={'Конечная вершина'}>
        <CustomSelect 
          id={'destinationNode'} 
          options={nodes.map((node) => ({ value: node.id, label: node.label }))}
        />
      </CustomFormField>
      <CustomFormField id={'edgeWeight'} title={'Вес ребра'}>
        <input type="number" name="edgeWeight" id="edgeWeight" min={0} step={0.001} required/>
      </CustomFormField>
      {
        errors.map((error, index) => (
          <ErrorMessage key={index} message={error} />
        ))
      }
      <button className='bg-green-500 text-white'>Добавить</button>
    </form>
  );
}

export default AddEdgeScreen;