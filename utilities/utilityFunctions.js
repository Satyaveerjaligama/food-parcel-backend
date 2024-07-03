function generateUserId(type) {
  return type + "_" + Math.floor(100000 + Math.random() * 900000).toString();
}

const downloadImage = (gfs, imageId) => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    const downloadStream = gfs.openDownloadStream(imageId);

    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // if image is not present or any other error
    downloadStream.on("error", (err) => {
      resolve("");
    });

    // concating and converting to base 64
    downloadStream.on("end", () => {
      const binaryData = Buffer.concat(chunks);
      resolve(binaryData.toString("base64"));
    });
  });
};

module.exports = {
  generateUserId: generateUserId,
  downloadImage: downloadImage,
};
