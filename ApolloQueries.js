import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
mutation LoginMutation($uid: String!) {
  login(uid:$uid) {
    token
    user{
      name
      email
      native_lang
      en_rec
      es_rec
      fr_rec
      de_rec
    }
  }
}
`

export const LOGOUT_MUTATION = gql`
mutation LogoutMutation($uid: String!) {
  logout(uid:$uid) {
    message
  }
}
`

export const SIGNUP_MUTATION = gql`
  mutation Signup($uid: String!,$email:String!,$password:String!,$nativeLang:String!,$name:String!){
    signup(uid:$uid, email:$email,password:$password,nativeLang:$nativeLang,name:$name){
      message
    }
  }
  `
export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($email:String,$name:String!,$native_lang:String!){
  updateUser(email: $email, name:$name, native_lang: $native_lang){
    message
  }
}
`
export const UPDATE_LANGS_MUTATION = gql`
mutation UpdateLangs($en_rec:Boolean, $de_rec: Boolean, $es_rec:Boolean, $fr_rec: Boolean){
  updateLangs(en_rec:$en_rec, es_rec:$es_rec, fr_rec:$fr_rec, de_rec: $de_rec){
    message
  }
}
`

export const SINGLE_LINK_MUTATION = gql`
  mutation SingleLink($transLang:String!,$link:String!){
  singleLinkRecommendations(transLang:$transLang,link:$link){
    title
    link
    langt
    recommendations{
      art_id
      title
      link
      date
    }
  }
}
`

export const TRANSLATION_MUTATION = gql`
mutation TranslateSelection($lang:String!, $originalText:String!, $artId:String!){
  translation(lang:$lang, orginalText:$originalText, artId:$artId){
    orig_text
    trans_text
    art_id
  }
}
`


export const ARTICLE_QUERY = gql`
query Article($artId:String!, $lang:String!){
  article(artId:$artId,lang:$lang){
    art_id
    article
    title
    link
    date
    translations{
      orig_text
      trans_text
    }
  }
}
`

export const LINK_RECS_QUERY = gql`
query LinkRec{
  linkRecommendations @client {
    title
    link
    recommendations{
      art_id
      link
      title
      date
    }
    }
  }
`

export const ARTICLE_REC_QUERY = gql`
query ArticleRecommendation($lang:String!){
  articleRecommendations(lang:$lang){
   recs{
    link
    title
    date
    lang
    art_id
  }
  }
}
`

export const ARTICLE_REC_DATE_QUERY = gql`
query ArticleRecommendationHistory($lang:String!,$date:String!){
  articleRecommendationsHistory(lang:$lang,date:$date){
  	title
    link
    date
    lang
    art_id
  }
}
`

export const VOCAB_QUERY = gql`
query TranslationQuery{
  translations{
    orig_text
    trans_text
    orig_lang
    trans_lang
    art_id
  }
}
`

export const ARTICLE_REC_ALL_QUERY = gql`
query ArticleRecommendationAll($lang:String!){
  articleRecommendationsAll(lang:$lang){
  	title
    link
    date
    lang
    art_id
  }
}
`
export const USER_QUERY = gql`
query User{
  user{
    name
    native_lang
    email
    en_rec
    fr_rec
    de_rec
    es_rec
    created_at
  }
}
`

