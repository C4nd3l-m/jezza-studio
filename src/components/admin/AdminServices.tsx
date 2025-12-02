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
                <Loader2 className="w-8 h-8 animate-spin text-primary-dark" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Form */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                    {editingId ? 'Editar Servicio' : 'Agregar Servicio'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Nombre del Servicio
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                                placeholder="Ej: Manicura completa"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Duración
                            </label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                                placeholder="Ej: 60 min"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Precio
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-500"
                                placeholder="Ej: $15.000"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-zinc-900 font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition"
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
                    <h3 className="text-lg font-semibold text-white">Servicios Actuales</h3>
                </div>
                <div className="divide-y divide-gray-800">
                    {services.length === 0 ? (
                        <div className="px-6 py-8 text-center text-gray-500">
                            No hay servicios registrados
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service._id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition">
                                <div className="flex-1">
                                    <h4 className="font-medium text-white">{service.name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {service.duration} • {service.price}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
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
