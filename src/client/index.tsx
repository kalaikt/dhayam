import { SERVER } from "../constants/server";
import io from "socket.io-client";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);

export const socket = io(SERVER.endpoint, {
  reconnection: true,
  reconnectionDelay: 500,
  jsonp: false,
  reconnectionAttempts: Infinity,
  transports: ["websocket"],
  forceNew: true,
});
