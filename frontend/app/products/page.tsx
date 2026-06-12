'use client'

import { useState, useEffect } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'
import Link from 'next/link'

interface Product {
  _id: string
  title: string
  price: number
  thumbnail: string
  seller: { name: string; rating: number }
  location: { city: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const categories = ['سيارات', 'عقارات', 'إلكترونيات', 'ملابس', 'أثاث', 'كتب', 'ألعاب']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams()
        query.append('page', page.toString())
        if (category) query.append('category', category)
        if (search) query.append('search', search)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${query}`)
        const data = await response.json()
        setProducts(data.data || [])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, search, page])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">🏪</Link>
          <div className="flex gap-4">
            <Link href="/sell" className="bg-secondary text-white px-4 py-2 rounded-lg">أضف إعلانك</Link>
            <Link href="/profile" className="text-primary">حسابي</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="ابحث..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
        />

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-4 rounded-lg h-fit">
            <h3 className="font-bold mb-4">🏷️ التصنيفات</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-right px-4 py-2 rounded mb-2 ${
                  category === cat ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <p className="text-center py-8">جاري التحميل...</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 truncate">{product.title}</h4>
                      <p className="text-primary font-bold text-lg mt-2">{product.price} ر.س</p>
                      <p className="text-gray-600 text-sm">{product.seller.name}</p>
                      <p className="text-gray-600 text-sm">⭐ {product.seller.rating}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}