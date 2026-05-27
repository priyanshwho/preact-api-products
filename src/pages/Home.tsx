import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Loader from '../components/Loader'
import type { Product } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatCurrency } from '../utils/format'

const API_URL = 'https://api.freeapi.app/api/v1/public/randomproducts'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortMethod, setSortMethod] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [toastMessage, setToastMessage] = useState('')
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const [favorites, setFavorites] = useLocalStorage<number[]>('clickpick-favorites', [])
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('clickpick-theme', 'light')
  const intersectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    loadProducts(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!intersectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !error) {
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(intersectionRef.current)
    return () => observer.disconnect()
  }, [loading, error])

  useEffect(() => {
    if (!toastMessage) return
    const timer = window.setTimeout(() => setToastMessage(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category))
    return ['All', ...Array.from(categorySet)]
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim()
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })

    const sorted = [...filtered]
    if (sortMethod === 'price-low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortMethod === 'price-high') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortMethod === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating)
    }
    return sorted
  }, [activeCategory, products, searchQuery, sortMethod])

  const favoriteIds = useMemo(() => new Set(favorites), [favorites])

  async function loadProducts(nextPage: number) {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}?page=${nextPage}`)
      if (!response.ok) {
        throw new Error('Could not fetch products. Please try again.')
      }
      const raw = await response.json()
      const nextProducts = raw?.data?.data ?? []
      setProducts((prev) => [...prev, ...nextProducts])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function handleToggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    )
    setToastMessage('Wishlist updated')
  }

  function handleAddToCart() {
    setCartCount((current) => current + 1)
    setToastMessage('Added to cart')
  }

  function handleQuickView(product: Product) {
    setSelectedProduct(product)
    setRecentlyViewed((current) => [product, ...current.filter((item) => item.id !== product.id)].slice(0, 4))
  }

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <section className="relative overflow-hidden rounded-[44px] border border-[rgba(255,255,255,0.88)] bg-[var(--surface)]/96 p-8 shadow-[0_40px_120px_-80px_rgba(183,152,145,0.45)] backdrop-blur-xl dark:border-[rgba(255,255,255,0.08)] dark:bg-[var(--panel)]/96">
            <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#DCC6E0]/40 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 rounded-full bg-[#F3C5B5]/30 blur-3xl" />
            <div className="grid gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#fff3ee] px-4 py-2 text-xs uppercase tracking-[0.45em] text-[#9d6b7a] shadow-sm shadow-[#d8a7b1]/20 dark:bg-[#2b3347]/85 dark:text-[#dcc6e0]">
                  Editorial boutique
                </div>
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#39232b] dark:text-[#f7f3ef] sm:text-6xl">
                  A serene pastel edit for elevated everyday ritual shopping.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[#6b5152] dark:text-[#c1b8c5]">
                  Crafted for a quiet luxury mood, ClickPick blends premium spacing, textured layers, and soft tones into a boutique product discovery experience.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[28px] border border-[#fadcd3] bg-[#fff3ee]/90 p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9d6b7a]">Soft palette</p>
                    <p className="mt-3 text-base font-semibold text-[#39232b] dark:text-[#f7f3ef]">Dusty rose & muted peach</p>
                  </div>
                  <div className="rounded-[28px] border border-[#e2d4e4] bg-[#f6eff8]/90 p-5 shadow-sm dark:border-[#444f69]/50 dark:bg-[#1d293f]/90">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9d6b7a]">Editorial rhythm</p>
                    <p className="mt-3 text-base font-semibold text-[#39232b] dark:text-[#f7f3ef]">Balanced spacing & refined hierarchy</p>
                  </div>
                  <div className="rounded-[28px] border border-[#f6ddd8] bg-[#fff6f3]/90 p-5 shadow-sm dark:border-[#444f69]/50 dark:bg-[#1f293b]/90">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9d6b7a]">Motion & feel</p>
                    <p className="mt-3 text-base font-semibold text-[#39232b] dark:text-[#f7f3ef]">Soft hover transitions and flowing details</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-[rgba(255,255,255,0.85)] bg-white/90 p-6 shadow-[0_24px_65px_-45px_rgba(183,152,145,0.3)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(23,31,46,0.9)]">
                <div className="flex flex-col gap-4 rounded-[28px] bg-[#f7e8e2] p-5 shadow-sm dark:bg-[#2a2f42]/90 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#9d6b7a]">Today’s edit</p>
                    <p className="mt-3 text-2xl font-semibold text-[#39232b] dark:text-[#f7f3ef]">Perfectly balanced ensembles</p>
                  </div>
                  <div className="rounded-full bg-[#d8a7b1]/15 px-4 py-3 text-sm font-semibold text-[#9d6b7a]">
                    10 picks
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-sm leading-7 text-[#6b5152] dark:text-[#c1b8c5]">
                  <p>Enjoy an elevated curation of everyday accessories, premium gadgets, and tasteful lifestyle finds.</p>
                  <p>This page is designed to feel like a boutique magazine spread rather than a generic product list.</p>
                </div>
              </div>
            </div>
          </section>

          <Filters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortMethod={sortMethod}
            onSortChange={setSortMethod}
          />

          <div className="rounded-[40px] border border-[rgba(255,255,255,0.9)] bg-[var(--surface)]/96 p-6 shadow-[0_28px_90px_-70px_rgba(183,152,145,0.35)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[var(--panel)]/96">
            <p className="text-sm uppercase tracking-[0.35em] text-[#9d6b7a] dark:text-[#dcc6e0]">Recently viewed</p>
            <div className="mt-5 space-y-4">
              {recentlyViewed.length ? (
                recentlyViewed.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleQuickView(product)}
                    className="w-full rounded-[28px] border border-[#f0d9d3] bg-[#fff4ef]/90 p-4 text-left transition hover:border-[#d8a7b1] hover:bg-[#fff2ec]/90 dark:border-[#3c4458]/70 dark:bg-[#1f293b]/90 dark:hover:border-[#d98f89]"
                  >
                    <div className="flex items-center justify-between gap-4 text-sm text-[#5c4146] dark:text-[#f7f3ef]">
                      <span>{product.title}</span>
                      <span className="font-semibold text-[#9d6b7a] dark:text-[#dcc6e0]">{formatCurrency(product.price)}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#8c6f75] dark:text-[#9aa9bf]">{product.category}</p>
                  </button>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#6b5152] dark:text-[#c1b8c5]">Quick view a product to save an inspiration list.</p>
              )}
            </div>
          </div>
        </div>

        <section className="mt-12 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#9d6b7a] dark:text-[#dcc6e0]">Collection</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#39232b] dark:text-[#f7f3ef]">A softly curated selection of elegant discoveries.</h2>
            </div>
            <div className="rounded-full bg-[#fff3ee]/95 px-5 py-3 text-sm font-medium text-[#9d6b7a] shadow-sm dark:bg-[#1f293b]/95 dark:text-[#f7f3ef]">
              {filteredProducts.length} pieces for mindful shopping
            </div>
          </div>

          {error ? (
            <div className="rounded-[32px] border border-[#f8d8d1] bg-[#fff4ef]/90 p-6 text-[#9d3f4f] shadow-sm dark:border-[#5f2d3e]/50 dark:bg-[#441f2a]/10 dark:text-[#f7d1d0]">
              <p className="font-semibold">Something went wrong.</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          ) : null}

          {loading && !products.length ? <Loader /> : null}

          {!error ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={`${product.id}-${product.title}`}
                  product={product}
                  isFavorite={favoriteIds.has(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              ))}
            </motion.div>
          ) : null}

          {loading && products.length ? (
            <div className="rounded-[32px] border border-[rgba(255,255,255,0.8)] bg-[var(--surface)]/95 p-6 text-center text-[#6b5152] shadow-sm dark:border-[rgba(255,255,255,0.08)] dark:bg-[var(--panel)]/95 dark:text-[#c1b8c5]">
              Loading more curated pieces...
            </div>
          ) : null}

          <div ref={intersectionRef} className="h-16" />

          <AnimatePresence>
            {toastMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 right-6 z-50 rounded-full bg-[#39232b]/95 px-5 py-3 text-sm text-white shadow-2xl shadow-[#39232b]/30"
              >
                {toastMessage}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </main>

      <ProductModal
        open={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleFavorite={(id) => {
          handleToggleFavorite(id)
          if (selectedProduct?.id === id) {
            setSelectedProduct({ ...selectedProduct, id })
          }
        }}
        isFavorite={selectedProduct ? favoriteIds.has(selectedProduct.id) : false}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default Home
