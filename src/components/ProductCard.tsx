import { motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '../types'
import { formatCurrency, clampText } from '../utils/format'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onAddToCart: () => void
  onQuickView: (product: Product) => void
}

const ProductCard = ({ product, isFavorite, onToggleFavorite, onAddToCart, onQuickView }: ProductCardProps) => {
  const imageSrc = product.thumbnail || product.images?.[0] || ''

  return (
    <motion.article
      layout
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-[36px] border border-[rgba(255,255,255,0.9)] bg-[var(--panel)]/95 shadow-[0_30px_90px_-45px_rgba(183,152,145,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_100px_-45px_rgba(183,152,145,0.45)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#071422]/95"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-[#FBE7E1]/80">
        <div className="pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full bg-[#DCC6E0]/40 blur-3xl dark:bg-[#24323f]/30" />
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          className="relative z-10 h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,143,137,0.16),transparent_48%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,143,137,0.06),transparent_48%)]" />
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          <span className="rounded-full bg-[#fff3ee] px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#9d6b7a] shadow-sm ring-1 ring-[#d8a7b1]/40 dark:bg-[rgba(255,255,255,0.03)] dark:text-[#d6d2da] dark:ring-[#24323f]/30">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#6b5152] shadow-sm dark:bg-[rgba(255,255,255,0.03)] dark:text-[#e6eef6]">
            <Star className="h-3.5 w-3.5 text-[#c97c5d] dark:text-[#f6c7be]" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          className="absolute right-4 top-4 z-10 inline-flex items-center justify-center rounded-full border border-white/90 bg-white/90 p-3 text-[#c97c5d] shadow-sm transition duration-300 hover:bg-[#fff3ee] dark:border-[rgba(255,255,255,0.06)] dark:bg-[#071422]/80 dark:text-[#f6c7be] dark:hover:bg-[#0f2330]/80"
          aria-label="Toggle favorite"
        >
          <Heart className={`${isFavorite ? 'fill-[#c97c5d] text-[#c97c5d]' : 'text-[#c97c5d]'}`} />
        </button>
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#7f5e68] transition hover:text-[#c97c5d] dark:text-[#d6d2da] dark:hover:text-[#f3c5b5]"
          >
            <Eye className="h-4 w-4" />
            Quick view
          </button>
          <h3 className="text-xl font-semibold text-[#39232b] dark:text-[#f7f3ef]">{product.title}</h3>
          <p className="text-sm leading-6 text-[#6b5152] dark:text-[#d6d2da]">{clampText(product.description, 120)}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-3xl font-semibold text-[#9d6b7a] dark:text-[#e6d5e6]">{formatCurrency(product.price)}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.35em] text-[#9d6b7a] dark:text-[#e6d5e6]">{product.brand}</p>
          </div>

          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex items-center gap-2 rounded-full bg-[#c97c5d] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(201,124,93,0.8)] transition hover:-translate-y-0.5 hover:bg-[#be6c49]"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard
