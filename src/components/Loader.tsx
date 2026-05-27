import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.06 }}
          className="rounded-[32px] border border-white/40 bg-white/80 p-6 shadow-[0_24px_70px_-35px_rgba(183,152,145,0.45)] backdrop-blur-xl"
        >
          <div className="mb-5 h-56 w-full animate-pulse rounded-[28px] bg-stone-200/80" />
          <div className="space-y-3">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-stone-200/80" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-stone-200/80" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-stone-200/80" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loader
