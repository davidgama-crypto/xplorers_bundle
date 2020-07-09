const RoomState = require('./RoomState');
const MockCache = require('../utils/MockCache');

const cache = new MockCache();
RoomState.dao = cache;

describe('RoomState', () => {
  it('can be created, saved, and found', async () => {
    const room = await new RoomState().save();
    expect(room.id).toBeDefined();
    expect(room.state.id).toBeDefined();

    const found = await RoomState.findByRoomId(room.id);
    expect(found.id).toBe(room.id);
    expect(found.state).toBe(room.state);
  });

  it('throws error when looking for non-existant roomId', async () => {
    const nonExistantId = 'noexists';

    async function shouldThrow() {
      return RoomState.findByRoomId(nonExistantId);
    }

    await expect(shouldThrow()).rejects.toThrow(Error);
  });
});
