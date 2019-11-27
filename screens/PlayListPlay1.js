import React from 'react'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'
import Error from './Error'

const PlayListPlay1  = ({navigation}) => {

  const art_id = navigation.getParam('art_id', 'NO-ID')
  const lang = navigation.getParam('lang', 'NO-ID')

  nextArticle = () => {
    navigation.navigate('Article',{ art_id })
  }

  return (

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
          {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />

              const { article } = data
          return (
            
            <PlayArticle nextArticle={nextArticle} lang={lang} {...article} navigation={navigation} />

          )
        }}
      </Query>

    )
  }

PlayListPlay1.navigationOptions = {
  title: 'Play Article'
}

export default PlayListPlay1
