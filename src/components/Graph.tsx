import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';

function Graph() {
  const { edges, nodes } = useAppSelector((state) => state.graph)
  const [graphNodes, setGraphNodes] = React.useState<any[]>([])
  const [graphEdges, setGraphEdges] = React.useState<any[]>([])
  const [edgesPath, setEdgesPath] = React.useState<any[]>([])
  const [graphWidth, setGraphWidth] = React.useState(window.innerWidth)
  const [graphHeight, setGraphHeight] = React.useState(window.innerHeight)

  React.useEffect(
    () => {
      const onResize = () => {
        setGraphWidth(window.innerWidth)
        setGraphHeight(window.innerHeight)
      }

      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    []
  )

  React.useEffect(
    () => {
      const transformedEdges = []
      for (const node of nodes) {
        const neighbours = edges.filter((edge) => edge.source.id === node.id)
        for (let i = 0; i < neighbours.length; i++) {
          transformedEdges.push({
            source: neighbours[i].source.id, 
            target: neighbours[i].destination.id, 
            curvature: i * 0.3, 
            rotation: 0
          })
        }
      }
      setGraphNodes(nodes.map((n) => ({id: n.id, label: n.label})))
      setGraphEdges(transformedEdges)
    },
    [nodes, edges]
  )

  return (
    <div id='graph-container' className='w-full h-full'>
      <ForceGraph3D 
        width={graphWidth} 
        height={graphHeight}
        graphData={{
          nodes: graphNodes,
          links: graphEdges,
        }}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.label);
          sprite.color = 'white';
          sprite.textHeight = 1;
          return sprite;
        }}
        linkColor={(link) => link.color}
        nodeThreeObjectExtend={true}
        linkCurvature="curvature"
        linkCurveRotation="rotation"
        linkDirectionalParticles={2}
        linkDirectionalArrowLength={2}
        linkDirectionalArrowRelPos={1.05}
      />
    </div>
  );
}

export default Graph;