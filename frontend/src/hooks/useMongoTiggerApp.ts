"use client";

import { useEffect, useState } from "react";
import * as Realm from "realm-web";

export function useApp() {
  const [triggerApp, setTriggerApp] = useState<Realm.App | null>(null);

  useEffect(() => {
    const getApp = async () => {
      // @ts-ignore
      const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });
      setTriggerApp(app);
      return;
    };
    getApp();
  }, []);

  return triggerApp;
}
