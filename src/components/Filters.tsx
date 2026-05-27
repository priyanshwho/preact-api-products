import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'

interface FiltersProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  sortMethod: string
  onSortChange: (method: string) => void
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
]

const Filters = ({ categories, activeCategory, onCategoryChange, sortMethod, onSortChange }: FiltersProps) => {
  return (
    <div className="rounded-[40px] border border-[rgba(255,255,255,0.9)] bg-[var(--surface)]/96 p-6 shadow-[0_28px_90px_-70px_rgba(183,152,145,0.35)] backdrop-blur-xl dark:border-[rgba(255,255,255,0.08)] dark:bg-[var(--panel)]/96">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#9d6b7a] dark:text-[#dcc6e0]">Discover</div>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full border px-4 py-2 text-sm tracking-tight transition ${isActive ? 'border-[#d8a7b1] bg-[#f7e7df] text-[#9d6b7a] shadow-[0_10px_30px_-24px_rgba(217,143,137,0.35)] dark:border-[#d98f89]/50 dark:bg-[#d98f89]/10 dark:text-[#f7f3ef]' : 'border-[#e8d5d2] bg-[#fff7f2] text-[#6b5152] shadow-[0_10px_30px_-24px_rgba(15,23,42,0.08)] dark:border-[#3c4458]/70 dark:bg-[#1f293b]/90 dark:text-[#c1b8c5]'}`}
              >
                {category}
              </motion.button>
            )
          })}
        </div>

        <div className="flex min-w-[220px] items-center gap-3 rounded-3xl border border-[#e8d5d2] bg-[#fff7f2]/90 px-4 py-3 text-sm text-[#6b5152] shadow-sm dark:border-[#3c4458]/70 dark:bg-[#1f293b]/90 dark:text-[#c1b8c5]">
          <SlidersHorizontal className="h-4 w-4 text-[#c97c5d]" />
          <span className="font-medium text-[#9d6b7a] dark:text-[#dcc6e0]">Sort by</span>
          <select
            value={sortMethod}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full bg-transparent text-sm outline-none dark:text-[#f7f3ef]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters
