// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
import { createClient } from "@liveblocks/client";
import { LiveList, LiveObject } from "@liveblocks/core";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";
import { Column, Card } from "@/types";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});

// Each user's Presence, for useMyPresence, useOthers, etc.
export type Presence = {
  // Example, real-time cursor coordinates
  boardId?: null | string;
  cardId?: null | string;
};

// The Storage tree for the room, for useMutation, useStorage, etc.
export type Storage = {
  // Example, a conflict-free list
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;
};

// Custom user info set when authenticating with a secret key
export type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};

// Custom events, for useBroadcastEvent, useEventListener
export type RoomEvent = {};
// Example has two events, using a union
// | { type: "PLAY" }
// | { type: "REACTION"; emoji: "🔥" };

// Custom metadata set on threads, for useThreads, useCreateThread, etc.
export type ThreadMetadata = {
  // Example, attaching coordinates to a thread
  cardId: string;
};

// Custom room info set with resolveRoomsInfo, for useRoomInfo
export type RoomInfo = {
  // Example, rooms with a title and url
  // title: string;
  // url: string;
};

export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);

export const {
  LiveblocksProvider,
  useInboxNotifications,
  // Other hooks
} = createLiveblocksContext(client);

export {};
