'use client'

import { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'إلكترونيات',
    price: '',
    condition: 'جديد',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: ['https://via.placeholder.com/400'],
          price: parseFloat(formData.price)
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('تم إضافة المنتج بنجاح!')
        setFormData({
          title: '',
          description: '',
          category: 'إلكترونيات',
          price: '',
          condition: 'جديد',
          location: ''
        })
      } else {
        setError(data.message || 'خطأ في إضافة المنتج')
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-6">🏪 أضف إعلانك</h1>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">عنوان المنتج</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="مثال: iPhone 14 Pro"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">الوصف</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="اشرح تفاصيل المنتج..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">التصنيف</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              >
                <option>سيارات</option>
                <option>عقارات</option>
                <option>إلكترونيات</option>
                <option>ملابس</option>
                <option>أثاث</option>
                <option>كتب</option>
                <option>ألعاب</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">الحالة</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              >
                <option>جديد</option>
                <option>مستخدم قليل</option>
                <option>مستخدم</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">السعر (ر.س)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="500"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">المدينة</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="الرياض"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'جاري الإضافة...' : 'نشر الإعلان'}
          </button>
        </form>
      </div>
    </div>
  )
}