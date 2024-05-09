import React from 'react';
import BottomBarAction, { BottomBarActionProps } from './BottomBarAction';
import { useAppSelector } from '@/libs/redux/hooks';
import { FaMinus, FaPlus } from 'react-icons/fa6';

function PossibleActions() {
  const { edges, nodes, selectedNodes } = useAppSelector((state) => state.graph)
  
  const actions = React.useMemo<BottomBarActionProps[]>(
    () => {
      const res: BottomBarActionProps[] = []

      if (selectedNodes.length === 2) {
        const sourceNode = nodes.find((n) => n.id === selectedNodes[0])
        const destinationNode = nodes.find((n) => n.id === selectedNodes[1])

        if (!sourceNode || !destinationNode) return []

        const edge = edges.find((e) => e.source.id === selectedNodes[0] && e.destination.id === selectedNodes[1])
        if (!edge) {
          res.push(
            { title: `Добавить ребро (${sourceNode.label} -> ${destinationNode.label})`, icon: <FaPlus/>, onClick: () => {} }
          )
        } else {
          res.push(
            { title: `Удалить ребро (${sourceNode.label} -> ${destinationNode.label})`, icon: <FaMinus/>, onClick: () => {} }
          )
        }
      }

      return res
    },
    [selectedNodes, edges, nodes]
  )

  return (
    <>
      {
        actions.map((action, index) => (
          <BottomBarAction key={index} {...action}/>
        ))
      }
    </>
  );
}

export default PossibleActions;