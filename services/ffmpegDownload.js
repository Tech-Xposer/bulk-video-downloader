const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

//  download and convert video using FFmpeg
const downloadAndConvertVideo = (url, fileName, dirPath) => {
  const outputPath = path.join(dirPath, `${fileName}.mp4`);

  return new Promise((resolve, reject) => {
    ffmpeg(url)
      .output(outputPath)
      .on("end", () => {
        console.log(`Download and conversion complete for: ${fileName}`);
        resolve(outputPath);
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
};

module.exports = downloadAndConvertVideo;
