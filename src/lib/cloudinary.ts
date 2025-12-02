import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

/**
 * Upload an image to Cloudinary
 * @param file - Base64 encoded image or file path
 * @param folder - Folder name in Cloudinary (optional)
 * @returns Upload result with URL and public_id
 */
export async function uploadToCloudinary(file: string, folder: string = 'jezza-studio') {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto',
        })

        return {
            url: result.secure_url,
            publicId: result.public_id,
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw new Error('Failed to upload image to Cloudinary')
    }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public_id of the image to delete
 * @returns Deletion result
 */
export async function deleteFromCloudinary(publicId: string) {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.error('Cloudinary delete error:', error)
        throw new Error('Failed to delete image from Cloudinary')
    }
}
