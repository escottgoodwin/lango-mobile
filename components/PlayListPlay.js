import React from 'react'
import { Text, View } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from './PlayArticle'
import Loading from './Loading'

const PlayListPlay = ({art_id, lang, navigation}) => {

  const playList = navigation.getParam('playList', 'NO-ID')
  const { art_id, lang } = playList[0]

  nextArticle = () => {

    playList.shift()
    navigation.navigate('PlayListPlay',{ playList })
  
  }

    
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

export default PlayListPlay
