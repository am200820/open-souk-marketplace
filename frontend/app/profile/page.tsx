'use client'

import { useState, useEffect } from 'react'
import { FiLogOut, FiEdit2 } from 'react-icons/fi'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name,
        bio: parsedUser.bio || '',
        phone: parsedUser.phone
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (data.success) {
        setUser(data.data)
        localStorage.setItem('user', JSON.stringify(data.data))
        setIsEditing(false)
      }
    } catch (error) {
      console.error('خطأ في التحديث:', error)
    }
  }

  if (!user) return <p className="text-center py-8">جاري التحميل...</p>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">👤 حسابي</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <FiLogOut /> تسجيل خروج
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">الاسم</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">السيرة الذاتية</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-600 text-sm">الاسم</h3>
                    <p className="text-2xl font-bold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm">البريد الإلكتروني</h3>
                    <p className="text-lg text-gray-700">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm">الهاتف</h3>
                    <p className="text-lg text-gray-700">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm">نوع الحساب</h3>
                    <p className="text-lg text-gray-700 capitalize">{user.role === 'buyer' ? 'مشتري' : 'بائع'}</p>
                  </div>
                  {user.bio && (
                    <div>
                      <h3 className="text-gray-600 text-sm">السيرة الذاتية</h3>
                      <p className="text-gray-700">{user.bio}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-4"
                  >
                    <FiEdit2 /> تعديل البيانات
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">📊 إحصائيات</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">التقييم</p>
                  <p className="text-3xl font-bold text-primary">⭐ {user.rating || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">عدد التقييمات</p>
                  <p className="text-3xl font-bold text-primary">{user.reviews || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {user.role === 'seller' && (
            <Link href="/my-products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">📦 منتجاتي</h3>
              <p className="text-gray-600">عرض إعلاناتك</p>
            </Link>
          )}
          <Link href="/messages" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">💬 الرسائل</h3>
            <p className="text-gray-600">رسائلك</p>
          </Link>
          <Link href="/my-purchases" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">🛒 مشترياتي</h3>
            <p className="text-gray-600">تاريخ الشراء</p>
          </Link>
        </div>
      </div>
    </div>
  )
}