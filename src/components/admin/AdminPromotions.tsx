'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader2, Upload } from 'lucide-react'
import Image from 'next/image'

type Promotion = {
    _id: string
    title: string
    description: string
    image: string
    cloudinaryId?: string
}

export default function AdminPromotions() {
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({ title: '', description: '', image: '', cloudinaryId: '' })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchPromotions()
    }, [])

    const fetchPromotions = async () => {
        try {
            const res = await fetch('/api/promotions')
            const data = await res.json()
            setPromotions(data)
        } catch (error) {
            console.error('Error fetching promotions:', error)
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
            const res = await fetch('/api/upload-cloudinary', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (!data.success) {
                throw new Error('Upload failed')
            }

            setFormData(prev => ({
                ...prev,
                image: data.url,
                cloudinaryId: data.publicId
            }))
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Error al subir la imagen')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (editingId) {
                await fetch('/api/promotions', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: editingId, ...formData }),
                })
            } else {
                await fetch('/api/promotions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
            }

            setFormData({ title: '', description: '', image: '', cloudinaryId: '' })
            setEditingId(null)
            fetchPromotions()
        } catch (error) {
            console.error('Error saving promotion:', error)
        }
    }

    const handleEdit = (promotion: Promotion) => {
        setEditingId(promotion._id)
        setFormData({
            title: promotion.title,
            description: promotion.description,
            image: promotion.image,
            cloudinaryId: promotion.cloudinaryId || '',
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar esta promoción?')) return

        try {
            await fetch(`/api/promotions?id=${id}`, { method: 'DELETE' })
            fetchPromotions()
        } catch (error) {
            console.error('Error deleting promotion:', error)
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData({ title: '', description: '', image: '', cloudinaryId: '' })
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
            {/* Form */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                    {editingId ? 'Editar Promoción' : 'Agregar Promoción'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Título
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                                placeholder="Ej: 2x1 en Manicura"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Descripción
                            </label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                                placeholder="Descripción de la promoción"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Imagen
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-gray-300 border border-gray-700 rounded-lg hover:bg-zinc-700 transition cursor-pointer">
                                <Upload size={16} />
                                {uploading ? 'Subiendo...' : 'Subir Imagen'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            {formData.image && (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-700">
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={!formData.image}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-zinc-900 font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={16} />
                            {editingId ? 'Actualizar' : 'Agregar'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-zinc-700 text-gray-200 rounded-lg hover:bg-zinc-600 transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Promociones Actuales</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {promotions.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No hay promociones registradas
                        </div>
                    ) : (
                        promotions.map((promo) => (
                            <div key={promo._id} className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition bg-zinc-950">
                                <div className="relative h-48">
                                    <Image
                                        src={promo.image}
                                        alt={promo.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-white mb-1">{promo.title}</h4>
                                    <p className="text-sm text-gray-400 mb-3">{promo.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(promo)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-400 bg-blue-900/20 rounded-lg hover:bg-blue-900/40 transition"
                                        >
                                            <Edit2 size={14} />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(promo._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-400 bg-red-900/20 rounded-lg hover:bg-red-900/40 transition"
                                        >
                                            <Trash2 size={14} />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
