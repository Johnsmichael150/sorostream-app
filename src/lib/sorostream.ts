type StreamEvent = { type: 'streamCreated' | 'streamWithdrawn' | 'streamCancelled' | 'streamToppedUp'; streamId: string; data?: any }

type EventCallback = (event: StreamEvent) => void

const listeners = new Map<string, Set<EventCallback>>()

function emit(event: StreamEvent) {
  const set = listeners.get(event.type)
  if (set) set.forEach(cb => cb(event))
}

export function onStreamEvent(type: string, cb: EventCallback) {
  if (!listeners.has(type)) listeners.set(type, new Set())
  listeners.get(type)!.add(cb)
  return () => listeners.get(type)?.delete(cb)
}

export const sorostream = {
  createStream: async () => {
    const result = { streamId: '1', txHash: '0xabc' }
    emit({ type: 'streamCreated', streamId: result.streamId, data: result })
    return result
  },
  withdraw: async () => {
    const result = { txHash: '0xdef', amount: '0' }
    emit({ type: 'streamWithdrawn', streamId: '', data: result })
    return result
  },
  cancelStream: async () => {
    const result = { txHash: '0xghi' }
    emit({ type: 'streamCancelled', streamId: '', data: result })
    return result
  },
  topUp: async (streamId: string, amount: string) => {
    const result = { txHash: '0xjkl', newEndTime: new Date(Date.now() + 86400000) }
    emit({ type: 'streamToppedUp', streamId, data: { ...result, amount } })
    return result
  },
  getStream: async () => null,
  getClaimable: async () => '0',
  getStreamsBySender: async () => [],
  getStreamsByRecipient: async () => [],
}

export const createClient = () => sorostream

export function formatUSDC(stroops: bigint): string {
  return (Number(stroops) / 10000000).toFixed(2)
}

export function toStroops(usdc: string): bigint {
  return BigInt(Math.round(parseFloat(usdc) * 10000000))
}

export function calculateFlowRate(stroops: bigint, durationSeconds: number): bigint {
  if (durationSeconds === 0) return BigInt(0)
  return stroops / BigInt(durationSeconds)
}

export function claimableNow(stream: any): string {
  return '0'
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
