import { liveblocksClient } from "@/lib/liveblocksClient";

export async function POST(request: Request) {
  const userLocalStorage = localStorage.getItem("atlas-user");

  if (!userLocalStorage) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = JSON.parse(userLocalStorage);

  const email = user.email;

  const { status, body } = await liveblocksClient.identifyUser(
    {
      userId: email,
      groupIds: [],
    },
    {
      userInfo: {
        name: user.name || "",
        email: email,
      },
    }
  );

  return new Response(body, { status });
}
