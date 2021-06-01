import i18n from 'i18next'
import {
  initReactI18next,
  I18nextProvider,
  useTranslation
} from 'react-i18next'
import en from './src/locales/en/translations'
import ptBR from './src/locales/pt-br/translations'

const loadi18n = (obj: any) => obj

i18n.use(initReactI18next).init({
  fallbackLng: 'pt-BR',
  lng: 'pt-BR',
  resources: {
    'pt-BR': {
      translations: ptBR,
      translate: () => loadi18n,
      common: {
        en: 'hahahahaahh'
      }
    },
    en: {
      translations: en,
      translate: () => loadi18n,
      common: {
        en: 'aaaaaaa'
      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
})

i18n.languages = ['pt-BR', 'en']

function changeLanguage(lng: string) {
  return i18n.changeLanguage(lng)
}

export { i18n, I18nextProvider, useTranslation, changeLanguage, loadi18n }
