import React, { Component } from 'react'
import Tts from 'react-native-tts';

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'
import Error from './Error'

const PlayListPlay = ({navigation}) => {

  const playList = navigation.getParam('playList', 'NO-ID')
  const { art_id, lang } = playList[0]

  nextArticle = () => {
    Tts.stop()
    const playList = navigation.getParam('playList', 'NO-ID')
    playList.shift()
    if(playList.length>0){
      navigation.navigate('PlayListPlay',{ playList })
    } else { 
      console.log('back to home')
      navigation.navigate('ChooseLanguage')
    }
    
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
