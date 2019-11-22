import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'
import { Flag } from 'react-native-svg-flagkit'
import ArtRec from '../components/ArtRec'
import { Col, Row, Grid } from 'react-native-easy-grid'
import  { ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'
import { langSwitch } from '../utils'

import Loading from './Loading'

class HistoryRecommendations extends React.Component {

    state = {
      date:null,
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
    }

  static navigationOptions = {
    title: 'History Recommendations'
  }

 render() {
  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const date = navigation.getParam('date', 'NO-ID')
  const { user, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  const { language, flag_lang } = langSwitch(lang)
  const flaglang = flag_lang.toUpperCase()
  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

        <Query  query={ARTICLE_REC_DATE_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang, date }}  >
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

            const { articleRecommendationsHistory } = data
 
            return (
              <>
              
                <Grid>
                  <Row>
                    <Col size={20}>
                      <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
                        <Flag id={flaglang} size={0.20} /> 
                      </TouchableOpacity>
                    </Col>

                    <Col size={80}>
                    <View>
                    <Text style={{fontSize:14}}>
                      {moment(date).format('MMMM Do YYYY')}
                    </Text>
                    </View>

                    <View>
                    <Text style={{fontSize:18}}>
                       {articleRecommendationsHistory.length} {language} Recommendations
                    </Text>
                  </View>
                    </Col>

                  </Row>

                </Grid>
                
              <FlatList
                data={articleRecommendationsHistory}
                renderItem={
                  ({ item }) => (
                    <ArtRec {...item} props={this.props}/>
                  )
                }
                keyExtractor={item => item.art_id}
                />
                </>
              )
            }}
         </Query>

      </ScrollView>
      </View>
    )

  }

  _error = async error => {

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }
}


const styles = StyleSheet.create({
  container
})

export default HistoryRecommendations
