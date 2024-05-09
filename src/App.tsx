import React from 'react'
import BottomBar from './components/bottombar/BottomBar'
import Graph from './components/Graph'
import Sidebar from './components/sidebar/Sidebar'
import { useAppSelector } from './libs/redux/hooks'

function App() {
  const isBottomBarVisible = React.useMemo(
    () => {
      // TODO
      return false
    },
    []
  )

  return (
    <div className='w-full h-full flex flex-row'>
      <Graph/>
      <Sidebar/>
      <BottomBar isVisible={isBottomBarVisible}/>
    </div>
  )
}

export default App