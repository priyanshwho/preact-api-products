import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '../types'
import { formatCurrency } from '../utils/format'

interface ProductModalProps {
  open: boolean
  product: Product | null
  onClose: () => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
  onAddToCart: () => void
}

const ProductModal = ({ open, product, onClose, onToggleFavorite, isFavorite, onAddToCart }: ProductModalProps) => {
  return (
    <AnimatePresence>
      {open && product ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            layout
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/60 bg-white/95 shadow-2xl shadow-slate-950/20 dark:border-slate-800/90 dark:bg-slate-950/95"
          >
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:gap-0">
              <div className="relative flex-1 overflow-hidden rounded-[32px] bg-slate-100">
                <img src={product.images[0] ?? product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onToggleFavorite(product.id)}
                  className="absolute right-5 top-5 inline-flex items-center justify-center rounded-full border border-white/80 bg-white/90 p-3 text-rose-500 shadow-xl transition hover:bg-rose-100 dark:border-slate-700/90 dark:bg-slate-900/90"
                >
                  <Heart className={`${isFavorite ? 'fill-rose-500 text-rose-600' : 'text-rose-500'}`} />
                </button>
              </div>

              <div className="flex-1 space-y-6 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(248,214,209,0.35),_transparent_45%)] p-6 text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(219,101,137,0.24),_transparent_45%)] dark:text-slate-100 sm:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-slate-500 transition hover:text-rose-600 dark:text-slate-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-rose-700 dark:text-rose-200/90">{product.category}</p>
                  <h2 className="text-4xl font-semibold leading-tight text-slate-950 dark:text-white">{product.title}</h2>
                  <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/85">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Price</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/85">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Rating</p>
                    <p className="mt-3 flex items-center gap-2 text-3xl font-semibold text-slate-950 dark:text-white">
                      <Star className="h-5 w-5 text-amber-400" /> {product.rating.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Stock</p>
                    <p className="text-xl font-semibold text-slate-950 dark:text-white">{product.stock} available</p>
                  </div>
                  <button
                    type="button"
                    onClick={onAddToCart}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_55px_-35px_rgba(220,89,107,0.8)] transition hover:-translate-y-0.5 hover:bg-rose-700"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProductModal
