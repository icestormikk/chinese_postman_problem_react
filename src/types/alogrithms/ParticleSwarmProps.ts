import { AlgorithmProps } from "./AlgorithmProps"

export type ParticleSwarmProps = AlgorithmProps & {
  particleSwarm: {
    iterationsCount: number,
    swarmSize: number,
    currentVelocityRatio: number,
    localVelocityRatio: number,
    globalVelocityRatio: number,
    startNodeId: string
  }
}

export type ParticleSwarmFormProps = {
  iterationsCount: { value: number },
  swarmSize: { value: number },
  currentVelocityRatio: { value: number },
  localVelocityRatio: { value: number },
  globalVelocityRatio: { value: number },
  startNodeId: { value: string }
}