import { useContext } from 'react'
import { LocaleContext } from './LocaleProvider'

export const useLocale = () => useContext(LocaleContext)
