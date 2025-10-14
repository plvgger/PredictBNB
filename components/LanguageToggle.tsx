'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      aria-label="Toggle language"
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="inline-flex items-center justify-center gap-2 px-3 h-10 rounded-xl border border-gray-200 bg-white/80 hover:bg-white transition-colors dark:border-gray-700 dark:bg-gray-900/60 dark:hover:bg-gray-900"
    >
      <Globe className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'EN' : '中文'}</span>
    </button>
  )
}

