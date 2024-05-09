import React from 'react';
import BottomBarAction, { BottomBarActionProps } from './BottomBarAction';
import { useAppSelector } from '@/libs/redux/hooks';

function PossibleActions() {
  const { edges, nodes } = useAppSelector((state) => state.graph)
  
  const actions = React.useMemo<BottomBarActionProps[]>(
    () => {
      const res: BottomBarActionProps[] = []
      return res
    },
    [edges, nodes]
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