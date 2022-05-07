import OSS from 'ali-oss';

export const oss = new OSS({
  accessKeyId: process.env.ALI_OSS_ACCESS_ID,
  accessKeySecret: process.env.ALI_OSS_ACCESS_SECRET,
  region: process.env.ALI_OSS_REGION,
  bucket: process.env.ALI_OSS_BUCKET,
});