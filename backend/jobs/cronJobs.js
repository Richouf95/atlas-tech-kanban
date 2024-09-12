const cron = require('node-cron');
const mongoose = require('mongoose');
const {
    getLiveblocksRoomsData,
    getLiveblocksRoomsStorage,
    getLiveblocksRoomsComments
} = require('../services/liveblocksService');
const RealtimeData = require('../models/RealtimeDataModel');
const Thread = require('../models/CommentModel');
const Room = require('../models/RoomModel');

function transformLiveObject(liveObjects) {
    if (!liveObjects) return [];
    return liveObjects.data.map(item => ({
        liveblocksType: item.liveblocksType,
        data: item.data
    }));
}

function logWithTimestamp(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

cron.schedule('*/5 * * * *', async () => {
    try {
        logWithTimestamp('Starting backup ...');

        // Récupération des rooms
        const roomsData = await getLiveblocksRoomsData();

        for (const room of roomsData.data) {
            try {
                // Récupération des realtimeData de la room (columns, cards et labels)
                const realtimeData = await getLiveblocksRoomsStorage(room.id);

                // Récupération des commentaires de la room
                const comments = await getLiveblocksRoomsComments(room.id);

                // Transformation des données en fonction du schéma
                const transformedRealtimeData = {
                    roomId: room.id,
                    columns: transformLiveObject(realtimeData.data.columns),
                    labels: transformLiveObject(realtimeData.data.labels),
                    cards: transformLiveObject(realtimeData.data.cards)
                };

                // Sauvegarde des données de room
                await Room.updateOne({ id: room.id }, { ...room, lastConnectionAt: new Date() }, { upsert: true });

                // Sauvegarde des données de Realtime
                await RealtimeData.updateOne({ roomId: room.id }, transformedRealtimeData, { upsert: true });

                // Sauvegarde des commentaires
                const threadsToSave = comments.map(comment => ({
                    ...comment,
                    createdAt: new Date(comment.createdAt),
                    updatedAt: new Date(comment.updatedAt)
                }));
                await Thread.bulkWrite(
                    threadsToSave.map(thread => ({
                        updateOne: {
                            filter: { id: thread.id },
                            update: thread,
                            upsert: true
                        }
                    }))
                );

                logWithTimestamp(`Backup for room ${room.id} completed successfully`);

            } catch (error) {
                logWithTimestamp(`Error processing room ${room.id}: ${error}`);
            }
        }
    } catch (error) {
        logWithTimestamp(`Error while backing up rooms from Liveblocks: ${error}`);
    }

    logWithTimestamp('Backup process finished');
})