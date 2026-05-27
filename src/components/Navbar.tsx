import { motion } from 'framer-motion'
import { Heart, Moon, Search, ShoppingBag, Sun } from 'lucide-react'

interface NavbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  favoritesCount: number
  cartCount: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Navbar = ({ searchQuery, onSearchChange, favoritesCount, cartCount, theme, onToggleTheme }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.55)] bg-[var(--surface)]/96 shadow-[0_15px_45px_-30px_rgba(31,23,18,0.12)] backdrop-blur-xl dark:border-[rgba(255,255,255,0.08)] dark:bg-[var(--panel)]/96">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-[18px] bg-gradient-to-br from-[#F3C5B5] to-[#D8A7B1] text-[#7f5e68] shadow-[0_14px_45px_-30px_rgba(217,143,137,0.8)]">
              C
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#9d6b7a]">ClickPick</p>
              <h1 className="text-xl font-semibold tracking-tight text-[#39232b] dark:text-[#f7f3ef]">Pastel luxury finds</h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#6b5152] dark:text-[#c1b8c5]">A quiet, editorial shopping edit built around soft tones, premium spacing, and layered beauty.</p>
        </motion.div>

        <div className="grid gap-4 sm:w-[430px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9d6b7a]" />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search elegant finds..."
              className="w-full rounded-[30px] border border-[#d8a7b1]/40 bg-[#fff7f2] py-3 pl-12 pr-4 text-sm text-[#39232b] shadow-[0_18px_60px_-45px_rgba(148,100,111,0.18)] outline-none transition focus:border-[#c97c5d] focus:ring-2 focus:ring-[#f3c5b5]/30 dark:border-[#4f5468]/60 dark:bg-[#142238]/95 dark:text-[#f7f3ef] dark:placeholder:text-[#94a3b8]"
            />
          </label>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center rounded-3xl border border-[#d8a7b1]/50 bg-[#fff3ee] px-4 py-3 text-sm font-medium text-[#39232b] shadow-sm transition hover:border-[#c97c5d] hover:text-[#9d6b7a] dark:border-[#4f5468]/60 dark:bg-[#1f293b]/95 dark:text-[#f7f3ef] dark:hover:border-[#d98f89]"
            >
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <div className="inline-flex items-center justify-center rounded-3xl border border-[#d8a7b1]/50 bg-[#F3C5B5]/15 px-4 py-3 text-sm text-[#9d6b7a] shadow-sm dark:border-[#4f5468]/60 dark:bg-[#2d364b]/90 dark:text-[#f7f3ef]">
              <Heart className="mr-2 h-4 w-4 text-[#c97c5d]" />
              {favoritesCount}
            </div>
            <div className="inline-flex items-center justify-center rounded-3xl border border-[#d8a7b1]/50 bg-[#dcc6e0]/15 px-4 py-3 text-sm text-[#9d6b7a] shadow-sm dark:border-[#4f5468]/60 dark:bg-[#2d364b]/90 dark:text-[#f7f3ef]">
              <ShoppingBag className="mr-2 h-4 w-4 text-[#c97c5d]" />
              {cartCount} cart
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
