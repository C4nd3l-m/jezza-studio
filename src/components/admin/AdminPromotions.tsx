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
                <Loader2 className="w-8 h-8 animate-spin text-rose-gold" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-premium-sm subtle-border p-6 md:p-8">
                <h2 className="text-xl font-heading text-charcoal mb-6">
                    {editingId ? 'Editar Promoción' : 'Agregar Promoción'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                                Título
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-cream/50 border border-gray-200 rounded-xl text-charcoal focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition outline-none"
                                placeholder="Ej: 2x1 en Manicura"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                                Descripción
                            </label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-cream/50 border border-gray-200 rounded-xl text-charcoal focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition outline-none"
                                placeholder="Descripción de la promoción"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                            Imagen
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-charcoal border border-gray-200 rounded-xl hover:bg-gray-200 transition cursor-pointer font-medium">
                                <Upload size={18} />
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
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={!formData.image}
                            className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-medium rounded-xl hover:bg-rose-gold transition-colors shadow-premium-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={18} />
                            {editingId ? 'Actualizar' : 'Agregar'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 bg-gray-100 text-charcoal rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-premium-sm subtle-border overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-cream/30">
                    <h3 className="text-lg font-heading text-charcoal">Promociones Actuales</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {promotions.length === 0 ? (
                        <div className="col-span-full text-center text-warm-gray py-8">
                            No hay promociones registradas
                        </div>
                    ) : (
                        promotions.map((promo) => (
                            <div key={promo._id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium-md transition bg-white group">
                                <div className="relative h-48">
                                    <Image
                                        src={promo.image}
                                        alt={promo.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <h4 className="font-heading text-charcoal text-lg mb-2">{promo.title}</h4>
                                    <p className="text-sm text-warm-gray mb-4 leading-relaxed">{promo.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(promo)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-white bg-charcoal rounded-lg hover:bg-rose-gold transition-colors"
                                        >
                                            <Edit2 size={14} />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(promo._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-rose-dust bg-rose-dust/10 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
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
