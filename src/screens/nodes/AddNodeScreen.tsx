import CustomFormField from '@/components/CustomFormField';
import WarningMessage from '@/components/messages/WarningMessage';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setNodes } from '@/libs/redux/slices/graphSlice';
import { Node } from '@/types/graph/Node';
import React from 'react';

interface AddNodeFormProps {
  nodeLabel: { value: string }
}

function AddNodeScreen() {
  const dispatch = useAppDispatch()
  const { nodes } = useAppSelector((state) => state.graph)
  const [warnings, setWarnings] = React.useState<string[]>([])
  const [errors, setErrors] = React.useState<string[]>([])
  const [userClickCount, setUserClickCount] = React.useState(0)

  const onNodeCreate = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setUserClickCount((prevState) => prevState + 1)
      setErrors([])
      setWarnings([])

      const target = event.target as typeof event.target & AddNodeFormProps
      const data = {
        label: target.nodeLabel.value
      }

      if (data.label.length === 0) {
        setErrors((prevState) => [...prevState, "Название вершины не может быть пустым"])
        return
      }
      
      const isSameNameNodeContains = nodes.find((n) => n.label === data.label) != undefined
      if (isSameNameNodeContains && userClickCount === 0) {
        setWarnings((prevState) => [
          ...prevState, 
          `В графе уже содержится вершина с таким названием. Добавление вершины с таким же названием может вызвать путаницу. 
          Для подтверждения действия нажмите ещё раз на кнопку "Добавить".`
        ])
        return
      }

      const node = new Node(data.label)
      dispatch(setNodes([...nodes, node]))
      setUserClickCount(0)
    },
    [nodes, errors, warnings]
  )

  return (
    <form onSubmit={(event) => onNodeCreate(event)} className='space-y-2'>
      <CustomFormField id={'nodeLabel'} title={'Название вершины'}>
        <input type="text" name="nodeLabel" id="nodeLabel" required/>
      </CustomFormField>
      {
        warnings.map((warning, index) => (
          <WarningMessage key={index} message={warning} />
        ))
      }
      {
        errors.map((error, index) => (
          <WarningMessage key={index} message={error} />
        ))
      }
      <button className='bg-green-500 text-white'>Добавить</button>
    </form>
  );
}

export default AddNodeScreen;