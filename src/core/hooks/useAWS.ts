import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'

const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME
export const useAWS = (): {
  deleteObject: (params: { Key: string }) => Promise<void>
  headObject: (params: { Key: string }) => Promise<boolean>
  uploadObject: (params: { Key: string; Body: File }) => Promise<void | string>
} => {
  const s3 = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region: 'us-east-2' })

  const deleteObject = async (params: { Key: string }) => {
    const command = new DeleteObjectCommand({ Bucket: bucketName, ...params })
    try {
      const data = await s3.send(command)
      console.log('Success', data)
    } catch (err) {
      console.log('Error', err)
    }
  }

  const headObject = async (params: { Key: string }) => {
    const command = new GetObjectCommand({ Bucket: bucketName, ...params })
    try {
      await s3.send(command)

      return true
    } catch (err) {
      return false
    }
  }

  const uploadObject = async (params: { Key: string; Body: File }) => {
    const command = new PutObjectCommand({ Bucket: bucketName, ...params })
    try {
      const data = await s3.send(command)
      console.log('Success', data)
      const url = `https://${bucketName}.s3.amazonaws.com/${params.Key}`
      return url
    } catch (err) {
      console.log('Error', err)
    }
  }
  return { deleteObject, uploadObject, headObject }
}
