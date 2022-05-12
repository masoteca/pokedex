export interface CpuData {
  mode: string,
  speed: number,
  times: {
    idle: number,
    irq: number,
    nice: number,
    sys: number,
    user: number,
  }
}
