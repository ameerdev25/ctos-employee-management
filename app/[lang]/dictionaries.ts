export type Locale = keyof typeof dictionaries

const dictionaries = {
    en: () => import('../../dictionaries/en.json').then((module) => module.default),
    ms: () => import('../../dictionaries/ms.json').then((module) => module.default)
}

export type Dictionary = typeof import('./dictionaries/en.json')

export const getDictionary = async (locale: Locale): Promise<Dictionary | undefined> => {
    if (typeof dictionaries[locale] !== 'undefined')
    {
      return dictionaries[locale]();  
    }    
}