import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'
import Error from './Error'

const PlayListPlay = ({navigation}) => {

  const playList = navigation.getParam('playList', 'NO-ID')
  const { art_id, lang } = playList[0]

  nextArticle = () => {
    playList.shift()
    navigation.navigate('PlayListPlay',{ playList })
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

PlayListPlay.navigationOptions = {
  title: 'Playlist Article'
}

export default PlayListPlay
