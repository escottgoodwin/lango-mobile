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

  export const sortDate = array => {
    return array.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
    })
  }

  export const voicify = lang => { 
    return lang + '-' + lang.toUpperCase()
  }

  export const splitSentence = text => {
    return text.match( /[^\.!\?]+[\.!\?]+|[^\.!\?]+/g )
  }

  export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }