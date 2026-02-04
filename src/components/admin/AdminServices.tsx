'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react'

type Service = {
    _id: string
    name: string
    duration: string
    price: string
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({ name: '', duration: '', price: '' })

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services')
            const data = await res.json()
            setServices(data)
        } catch (error) {
            console.error('Error fetching services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (editingId) {
                // Update
                await fetch('/api/services', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: editingId, ...formData }),
                })
            } else {
                // Create
                await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
            }

            setFormData({ name: '', duration: '', price: '' })
            setEditingId(null)
            fetchServices()
        } catch (error) {
            console.error('Error saving service:', error)
        }
    }

    const handleEdit = (service: Service) => {
        setEditingId(service._id)
        setFormData({
            name: service.name,
            duration: service.duration,
            price: service.price,
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar este servicio?')) return

        try {
            await fetch(`/api/services?id=${id}`, { method: 'DELETE' })
            fetchServices()
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData({ name: '', duration: '', price: '' })
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
                    {editingId ? 'Editar Servicio' : 'Agregar Servicio'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                                Nombre del Servicio
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-cream/50 border border-gray-200 rounded-xl text-charcoal focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition outline-none"
                                placeholder="Ej: Manicura completa"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                                Duración
                            </label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-4 py-3 bg-cream/50 border border-gray-200 rounded-xl text-charcoal focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition outline-none"
                                placeholder="Ej: 60 min"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                                Precio
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 bg-cream/50 border border-gray-200 rounded-xl text-charcoal focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition outline-none"
                                placeholder="Ej: $15.000"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-medium rounded-xl hover:bg-rose-gold transition-colors shadow-premium-sm"
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
                    <h3 className="text-lg font-heading text-charcoal">Servicios Actuales</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {services.length === 0 ? (
                        <div className="px-6 py-12 text-center text-warm-gray">
                            No hay servicios registrados
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service._id} className="px-6 py-4 flex items-center justify-between hover:bg-cream/50 transition shadow-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium text-charcoal text-lg">{service.name}</h4>
                                    <p className="text-sm text-rose-dust font-medium mt-1">
                                        {service.duration} • <span className="text-charcoal">{service.price}</span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 text-charcoal hover:bg-gray-100 rounded-lg transition"
                                        title="Editar"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="p-2 text-rose-dust hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
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
