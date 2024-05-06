import { Edge } from "@/types/graph/Edge";
import { Node } from "@/types/graph/Node";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphState {
  nodes: Node[]
  edges: Edge<number>[]
}

const initialState: GraphState = {
  nodes: [],
  edges: []
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
    }
  }
})

export const { setNodes, removeNodeById, setEdges, removeEdgeById } = graphSlice.actions
export default graphSlice.reducer