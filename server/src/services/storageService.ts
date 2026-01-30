import { Express } from 'express';

export interface StorageProvider {
  uploadFile(file: Express.Multer.File): Promise<string>;
}


import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const bucketName = process.env.AWS_S3_BUCKET as string;

const storageServiceInstance: StorageProvider = {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const key = `uploads/${Date.now()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await s3Client.send(command);

      // Return S3 URL
      const region = process.env.AWS_REGION || 'us-east-1';
      return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new Error('Failed to upload file to S3');
    }
  },
};

export const storageService = storageServiceInstance;

