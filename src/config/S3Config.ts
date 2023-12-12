const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIA4S535KOUDQPBZKWX",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

export const uploadToS3 = async (file: Blob, userId: string) => {
  const params = {
    Bucket: "socius-company",
    Key: `profile-images/${userId}.jpg`,
    Body: file,
    ContentType: "image/jpeg",
  };

  return s3.upload(params).promise();
};

export const uploadMediaS3 = async (
  files: Array<{ file: Blob; type: string }>,
  userId: string
) => {
  const uploadPromises = files.map(async (item, index) => {
    const mediaType = item.type === "video" ? "videos" : "images";
    const mediaId = `${userId}_${index}_${Date.now()}`;

    const params = {
      Bucket: "socius-company",
      Key: `media/${userId}/${mediaType}/${mediaId}.${
        item.type === "image" ? "jpg" : "mp4"
      }`,
      Body: item.file,
      ContentType: item.type === "video" ? "video/mp4" : "image/jpeg",
    };

    return s3.upload(params).promise();
  });

  return Promise.all(uploadPromises);
};
