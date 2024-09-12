const { Liveblocks } = require('@liveblocks/node');
require('dotenv').config();

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_API_KEY
})

async function getLiveblocksRoomsData() {
    try {
        const rooms = await liveblocks.getRooms();

        return rooms;
    } catch (error) {
        console.error('Error while retrieving data from Liveblocks:', error);
        throw error;
    }
}

async function getLiveblocksRoomsStorage(roomId) {
    try {
        const realtimeApiData = await liveblocks.getStorageDocument(roomId);

        return realtimeApiData;
    } catch (error) {
        console.error('Error while retrieving room RealtimeApi Data', error);
        throw error;
    }
}

async function getLiveblocksRoomsComments(roomId) {
    try {
        const { data: threads } = await liveblocks.getThreads({ roomId })

        return threads;
    } catch (error) {
        console.error('Error while retrieving room Comments', error);
        throw error;
    }
}

module.exports = {
    getLiveblocksRoomsData,
    getLiveblocksRoomsStorage,
    getLiveblocksRoomsComments
}