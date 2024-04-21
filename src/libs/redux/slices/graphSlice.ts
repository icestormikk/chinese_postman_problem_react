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
    setEdges: (state, action: PayloadAction<Edge<number>[]>) => {
      const edges = action.payload
      state.edges = edges
    },
  }
})

export const { setNodes, setEdges } = graphSlice.actions
export default graphSlice.reducer