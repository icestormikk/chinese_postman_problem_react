import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { Graph as GraphType } from '@/types/graph/Graph'
import { EdgeType } from '@/types/graph/EdgeType';
import { Node } from '@/types/graph/Node';
import { Edge } from '@/types/graph/Edge';
import SpriteText from 'three-spritetext';

function Graph() {
  const { edges, nodes } = useAppSelector((state) => state.graph)
  const [graphNodes, setGraphNodes] = React.useState<any[]>([])
  const [graphEdges, setGraphEdges] = React.useState<any[]>([])
  const [highlightNodes, setHighlightNodes] = React.useState(new Set())
  const [highlightLinks, setHighlightLinks] = React.useState(new Set())
  const [hoverNode, setHoverNode] = React.useState<any>(null)
  const [graphWidth, setGraphWidth] = React.useState(window.innerWidth)
  const [graphHeight, setGraphHeight] = React.useState(window.innerHeight)

  const onNodeHover = React.useCallback(
    (node: Node) => {
      setHighlightNodes(new Set())
      setHighlightLinks(new Set())
      if (!node) return

      const neighbourEdges = graphEdges.filter((e) => {
        if (e.type == EdgeType.DIRECTED) {
          return e.source.id == node.id
        } else {
          return [e.source.id, e.target.id].includes(node.id)
        }
      })
      const neighbourNodes = neighbourEdges.map((e) => e.target) 

      setHighlightNodes(new Set([...neighbourNodes, node]))
      setHighlightLinks(new Set(neighbourEdges))
      setHoverNode(node || null)
    },
    [nodes, edges, graphNodes, graphEdges]
  )

  const onEdgeHover = React.useCallback(
    (edge: any) => {
      setHoverNode(null)
      setHighlightNodes(new Set())
      setHighlightLinks(new Set())

      if (!edge) return
      
      setHighlightNodes(new Set([edge.source, edge.target]))
      setHighlightLinks(new Set([edge]))
    },
    [nodes, edges, graphNodes, graphEdges]
  )

  React.useEffect(
    () => {
      const graph = new GraphType(nodes, edges)
      const result = []

      for (const node of graph.nodes) {
        const neighbours = graph.edges.filter((edge) => edge.source.id == node.id)
        for (let i = 0; i < neighbours.length; i++) {
          const edge = neighbours[i]
          result.push({
            id: edge.id,
            source: edge.source.id,
            target: edge.destination.id,
            type: edge.type,
            curvature: i * 0.3,
            rotation: 0,
          })
        }
      }

      setGraphNodes(nodes.map((n) => ({id: n.id, label: n.label})))
      setGraphEdges(result)
    },
    [nodes, edges]
  )

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

  return (
    <div id='graph-container' className='w-full h-full'>
      <ForceGraph2D 
        width={graphWidth} 
        height={graphHeight}
        graphData={{
          nodes: graphNodes,
          links: graphEdges,
        }}
        onLinkHover={(e) => onEdgeHover(e)}
        linkWidth={link => highlightLinks.has(link) ? 4 : 1}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
        linkColor={(link) => link.type == EdgeType.DIRECTED ? 'green' : 'red'}
        linkDirectionalArrowLength={(link) => link.type == EdgeType.DIRECTED ? 1.5 : 0}
        linkDirectionalArrowRelPos={1}
        cooldownTicks={0}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 24/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
        }}
        onNodeHover={(n) => onNodeHover(n)}
        autoPauseRedraw={true}
      />
    </div>
  );
}

export default Graph;