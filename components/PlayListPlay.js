import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from './PlayArticle'
import Loading from './Loading'

class PlayListPlay extends React.Component {

  nextArticle = () => {
    const { navigation, nextArticle } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')

    playList.shift()
    navigation.navigate('PlayListPlay',{ playList })
  
  }

  render(){
    const { navigation, art_id, lang } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')
    const { art_id, lang } = playList[0]
  return (
        
          <Grid>
            <Row>
              <Col>
              <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                    const { article, title, date, translations } = data.article
     
                return (
                  
                  <PlayArticle nextArticle={nextArticle} date={date} title={title} lang={lang} article={article} navigation={navigation} />
 
                )
              }}
            </Query>
              </Col>
            </Row>
          </Grid>

    )
  }

  }

export default PlayListPlay
