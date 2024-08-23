import { liveblocksClient } from "./liveblocksClient";
import uniqid from "uniqid";

export async function createBoard(name:string) {
    const userData = localStorage.getItem('atlas-user');
    if (userData) {
        const user = JSON.parse(userData);
        const email = user.email;
        const roomId = uniqid("room-");
        return await liveblocksClient.createRoom(roomId, {
            defaultAccesses: [],
            usersAccesses: {
                [email]: ["room:write"]
            },
            metadata: {
                boardName: name,
                projectId: "null"
            }
        })
    }
    return false;
}