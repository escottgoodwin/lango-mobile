import React from 'react'
import { Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import moment from 'moment'
import { langSwitch, sortDate } from '../utils'

import { Query, } from "react-apollo"
import  { ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

import ArtRecHistory from '../components/ArtRecHistory'
import Loading from './Loading'
import Error from './Error'

const HistoryRecommendations = ({navigation}) =>  {

  const lang = navigation.getParam('lang', 'NO-ID')
  const date = navigation.getParam('date', 'NO-ID')
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
              if (error) return <Error error={error} />

            const { articleRecommendationsHistory } = data
            const artRecsSorted = sortDate(articleRecommendationsHistory)

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
                       {artRecsSorted.length} {language} Recommendations
                    </Text>
                  </View>
                    </Col>

                  </Row>

                </Grid>
                
              <FlatList
                data={artRecsSorted}
                renderItem={
                  ({ item }) => (
                    <ArtRecHistory {...item} searchDate={date} navigation={navigation}/>
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

HistoryRecommendations.navigationOptions = {
  title: 'History Recommendations'
}

export default HistoryRecommendations
