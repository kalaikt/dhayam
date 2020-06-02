import { SERVER } from "../constants/server";
import io from "socket.io-client";

export const socket = io.connect(SERVER.endpoint, {
  transports: ["websocket"],
});

/* socket.emit("joinRoom", "Kalai", "1234567");

socket.on("getPlayers", (data: any) => {
  console.log("room", data);
});
 */