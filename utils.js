export const langSwitch = (lang) => {
    if (lang === 'en'){
      return {language:'English', flag_lang:'gb'}
    }
    if (lang === 'es'){
      return {language:'Spanish', flag_lang: lang}
    }
    if (lang === 'fr'){
      return {language:'French', flag_lang: lang}
    }
    if (lang === 'de'){
      return {language:'German', flag_lang: lang}
    }
  }