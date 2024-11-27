import { EventHandler } from "./event-emitter.ts";
import { useEffect } from "react";
import events from "./events";

export function useEventBus<T = any>(event: string, callback: EventHandler<T>) {
  useEffect(() => {
    events.on(event, callback);
    return () => {
      events.off(event, callback);
    };
  });
}
