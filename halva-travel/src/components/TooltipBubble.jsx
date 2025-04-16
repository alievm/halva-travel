import { Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TooltipBubble = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="absolute z-10 left-0 mt-2 min-w-[200px] flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-sm text-black"
      style={{ top: '100%' }}
    >
      <img src="/eyes.svg" alt="icon" className="w-5 h-5" />
      <span>Хоба! Бесплатные путеводители!</span>
      <button className="ml-2 text-gray-500 hover:text-black">&times;</button>
    </motion.div>
  )
}

export default TooltipBubble;