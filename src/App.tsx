import Graph from './components/Graph'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <div className='w-full h-full flex flex-row'>
      <Graph/>
      <Sidebar/>
    </div>
  )
}

export default App