'use client'

import { useState } from 'react'
import AdminServices from '@/components/admin/AdminServices'
import AdminPromotions from '@/components/admin/AdminPromotions'
import AdminGallery from '@/components/admin/AdminGallery'

type Tab = 'services' | 'promotions' | 'gallery'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('services')

  const tabs = [
    { id: 'services' as Tab, label: 'Servicios' },
    { id: 'promotions' as Tab, label: 'Promociones' },
    { id: 'gallery' as Tab, label: 'Galería' },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 border-b border-gray-800">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition
                ${activeTab === tab.id
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'services' && <AdminServices />}
        {activeTab === 'promotions' && <AdminPromotions />}
        {activeTab === 'gallery' && <AdminGallery />}
      </div>
    </div>
  )
}
