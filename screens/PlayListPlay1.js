import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'
import Error from './Error'

class PlayListPlay1 extends React.Component {

  static navigationOptions = {
    title: 'Play Article'
  }

  nextArticle = () => {
    const { navigation } = this.props
    const art_id = navigation.getParam('art_id', 'NO-ID')
    navigation.navigate('Article',{ art_id })
  }

  render(){
    const { navigation } = this.props
    const art_id = navigation.getParam('art_id', 'NO-ID')
    const lang = navigation.getParam('lang', 'NO-ID')

  return (

          <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

                const { article } = data
            return (
              
              <PlayArticle nextArticle={this.nextArticle} lang={lang} {...article} navigation={navigation} />

            )
          }}
        </Query>

    )
  }

  }

export default PlayListPlay1
