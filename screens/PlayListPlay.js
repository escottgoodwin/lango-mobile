import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'

class PlayListPlay extends React.Component {

  static navigationOptions = {
    title: 'Playlist Article'
  }


  nextArticle = () => {
    const { navigation } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')
    playList.shift()
    navigation.navigate('PlayListPlay',{ playList })
  }

  render(){
    const { navigation } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')
    const { art_id, lang } = playList[0]
  return (

          <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                const { article } = data
            return (
              
              <PlayArticle nextArticle={this.nextArticle} lang={lang} {...article} navigation={navigation} />

            )
          }}
        </Query>

    )
  }

  }

export default PlayListPlay
