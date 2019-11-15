import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Query} from "react-apollo"
import  { ARTICLE_QUERY } from '../ApolloQueries'

import PlayArticle from '../components/PlayArticle'
import Loading from './Loading'

class PlayListPlay extends React.Component {

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
        <ScrollView style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
          <Grid>
            <Row>
              <Col>
                <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
                  {({ loading, error, data }) => {
                      if (loading) return <Loading />
                      if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                      const { article, title, date, translations } = data.article
      
                  return (
                    
                    <PlayArticle nextArticle={this.nextArticle} date={date} title={title} lang={lang} article={article} navigation={navigation} />
  
                  )
                }}
              </Query>
              </Col>
            </Row>
          </Grid>
        </ScrollView>
    )
  }

  }

export default PlayListPlay
