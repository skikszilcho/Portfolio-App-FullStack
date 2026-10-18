const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_CV_OBJECT_KEY,
} = require('../config/env');

// Cloudflare R2 is S3-compatible.
// The endpoint format is: https://<accountId>.r2.cloudflarestorage.com
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Generates a pre-signed GET URL for the CV PDF in R2.
 * URL expires in 60 seconds — long enough for the browser to start the download,
 * short enough to prevent hotlinking.
 *
 * @returns {Promise<string>} The signed URL
 */
async function getCvSignedUrl() {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key:    R2_CV_OBJECT_KEY,
  });
  return getSignedUrl(s3, command, { expiresIn: 60 });
}

module.exports = { getCvSignedUrl };
