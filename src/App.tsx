import React from 'react'
import BottomBar from './components/bottombar/BottomBar'
import Graph from './components/Graph'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  const isBottomBarVisible = React.useMemo(
    () => {
      // TODO
      return false
    },
    []
  )

  return (
    <div className='w-full h-full flex flex-row overflow-hidden'>
      <Graph/>
      <Sidebar/>
      <BottomBar isVisible={isBottomBarVisible}/>
    </div>
  )
}

export default App