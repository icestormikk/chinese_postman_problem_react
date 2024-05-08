import { Edge } from "@/types/graph/Edge";
import { Node } from "@/types/graph/Node";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphState {
  nodes: Node[]
  edges: Edge<number>[]
  selectedNodes: string[]
}

const initialState: GraphState = {
  nodes: [],
  edges: [],
  selectedNodes: []
}

const graphSlice = createSlice({
  name: 'graphSlice',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      const nodes = action.payload
      state.nodes = nodes
    },
    removeNodeById: (state, action: PayloadAction<string>) => {
      const id = action.payload

      state.nodes = state.nodes.filter((n) => n.id !== id)
      state.edges = state.edges.filter((e) => e.source.id !== id && e.destination.id !== id)
    },
    setEdges: (state, action: PayloadAction<Edge<number>[]>) => {
      const edges = action.payload
      state.edges = edges
    },
    removeEdgeById: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.edges = state.edges.filter((e) => e.id !== id)
    },
    selectNodeById: (state, action: PayloadAction<string>) => {
      const newSelectedNodeId = action.payload

      const selectedNode = state.nodes.find((n) => n.id === newSelectedNodeId)
      if (!selectedNode) return

      if (state.selectedNodes.length >= 2) {
        state.selectedNodes = [selectedNode.id]
      } else {
        if (state.selectedNodes.includes(selectedNode.id)) return
        state.selectedNodes.push(selectedNode.id)
      }
    }
  }
})

export const { setNodes, removeNodeById, setEdges, removeEdgeById, selectNodeById } = graphSlice.actions
export default graphSlice.reducer