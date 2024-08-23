import { Liveblocks } from "@liveblocks/node";

export const liveblocksClient = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY || "sk_dev_kmAt0bXyW7e88ScCZ7HZTpqHlxaZQjKnT7UXaO7wX8W2XHWj2Sgvc4svpT58KTar",
});
