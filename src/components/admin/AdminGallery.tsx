'use client'

import { useState, useEffect } from 'react'
import { Upload, Trash2, Loader2 } from 'lucide-react'
import Image from 'next/image'

type GalleryItem = {
    _id: string
    src: string
    alt: string
    cloudinaryId?: string
}

export default function AdminGallery() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [altText, setAltText] = useState('')

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const res = await fetch('/api/gallery')
            const data = await res.json()
            setItems(data)
        } catch (error) {
            console.error('Error fetching gallery:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            // Upload image to Cloudinary
            const uploadRes = await fetch('/api/upload-cloudinary', {
                method: 'POST',
                body: formData,
            })
            const uploadData = await uploadRes.json()

            if (!uploadData.success) {
                throw new Error('Upload failed')
            }

            // Add to gallery with Cloudinary URL and ID
            await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    src: uploadData.url,
                    alt: altText || 'Imagen de galería',
                    cloudinaryId: uploadData.publicId,
                }),
            })

            setAltText('')
            fetchGallery()
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Error al subir la imagen')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar esta imagen?')) return

        try {
            await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
            fetchGallery()
        } catch (error) {
            console.error('Error deleting image:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary-dark" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Upload Form */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Agregar Imagen a Galería
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Descripción de la imagen (opcional)
                        </label>
                        <input
                            type="text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                            placeholder="Ej: Diseño floral en uñas"
                        />
                    </div>
                    <label className="flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-zinc-900 font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition cursor-pointer">
                        <Upload size={20} />
                        {uploading ? 'Subiendo...' : 'Seleccionar y Subir Imagen'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">
                        Imágenes en Galería ({items.length})
                    </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                    {items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No hay imágenes en la galería
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item._id} className="group relative aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition bg-zinc-950">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="opacity-0 group-hover:opacity-100 transition px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
