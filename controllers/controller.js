const IP = require("ip");
const { exec } = require("child_process");
const path = require("path");

module.exports.VideoController = function (req, res) {
  const ipAddress = IP.address();
  const serverURL = `rtsp://${ipAddress}:8554/${
    req.file.filename
  }/stream-${Date.now()}`;
  const clientURL = `rtsp://${ipAddress}:6554/${
    req.file.filename
  }/stream-${Date.now()}`;
  exec(
    `bg ffmpeg -re -stream_loop -1 -i ${path.resolve(
      __dirname,
      `../uploads/${req.file.filename}`
    )} -c copy -f rtsp ${serverURL}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
  res.status(200).json({
    url: clientURL,
  });
};
