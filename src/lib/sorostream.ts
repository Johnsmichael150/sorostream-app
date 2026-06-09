// Temporary mock — SDK integration coming soon
export const sorostream = {
  createStream: async () => ({ streamId: '0', txHash: '' }),
  withdraw: async () => ({ txHash: '', amount: '0' }),
  cancelStream: async () => ({ txHash: '' }),
  topUp: async () => ({ txHash: '', newEndTime: new Date() }),
  getStream: async () => null,
  getClaimable: async () => '0',
  getStreamsBySender: async () => [],
  getStreamsByRecipient: async () => [],
}
