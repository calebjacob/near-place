import { Server } from "Socket.IO";

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("pixelUpdated", (pixel) => {
        socket.broadcast.emit("pixelUpdated", pixel);
      });
    });
  }

  res.end();
};

export default SocketHandler;
