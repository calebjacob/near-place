import { useEffect } from "react";
import io from "Socket.IO-client";
let socket: ReturnType<typeof io> | undefined;

export function useSocket() {
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();
    };

    if (!socket) {
      socketInitializer();
    }
  }, []);

  return { socket };
}
