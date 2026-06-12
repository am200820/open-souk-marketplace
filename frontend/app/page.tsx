'use client'

import Link from 'next/link'
import { FiSearch, FiPlus } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🏪 السوق المفتوح</h1>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-700 hover:text-primary">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-lg">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          منصتك الموثوقة للبيع والشراء
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          اشترِ وبِع بسهولة وأمان. اكتشف الآلاف من المنتجات والخدمات
        </p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2 bg-white rounded-lg shadow-lg p-2">
            <input
              type="text"
              placeholder="ابحث عن منتج أو خدمة..."
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <FiSearch /> بحث
            </button>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/products" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold">
            تصفح المنتجات
          </Link>
          <Link href="/sell" className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
            <FiPlus /> أضف إعلانك
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">لماذا السوق المفتوح؟</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { emoji: '🔒', title: 'آمن وموثوق', desc: 'نظام حماية قوي' },
            { emoji: '⚡', title: 'سريع وسهل', desc: 'ابدأ في دقائق' },
            { emoji: '💬', title: 'تواصل مباشر', desc: 'رسائل فورية' },
            { emoji: '⭐', title: 'تقييمات موثوقة', desc: 'تقييمات حقيقية' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 السوق المفتوح. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
