const RtspServer = require("rtsp-streaming-server").default;
const express = require("express");
const Router = require("./routes/router");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const server = new RtspServer({
  serverPort: 8554,
  clientPort: 6554,
  rtpPortStart: 10000,
  rtpPortCount: 10000,
});

async function run() {
  try {
    await server.start();
  } catch (e) {
    console.error(e);
  }
}

run().then(() => console.log("RTSP Server Started!"));
app.use("/", Router);
app.listen(5000, () => console.log("Listening on port 5000"));
