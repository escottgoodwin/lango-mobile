import React from 'react'
import { Text, View, ScrollView,  FlatList, TouchableOpacity } from 'react-native'
import { Flag } from 'react-native-svg-flagkit'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { langSwitch, sortDate } from '../utils'

import { Query } from "react-apollo"
import  { ARTICLE_REC_ALL_QUERY } from '../ApolloQueries'

import ArtRec from '../components/ArtRec'
import Loading from './Loading'
import Error from './Error'

const CurrentRecommendations = ({navigation}) => {

  const lang = navigation.getParam('lang', 'NO-ID')
  const { language, flag_lang } = langSwitch(lang)
  const flaglang = flag_lang.toUpperCase()

  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

        <Query  query={ARTICLE_REC_ALL_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang }}  >
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />

            const { articleRecommendationsAll } = data
            const artRecsSorted = sortDate(articleRecommendationsAll)
 
            return (
              <>
              <View style={{marginBottom:5}}> 
              <Grid>
                  <Row>
                    <Col size={20}>
                    <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
                      <Flag id={flaglang} size={0.20} /> 
                    </TouchableOpacity>
                    </Col>

                    <Col size={80}>
                    
                    <View>
                    <Text style={{fontSize:22}}>
                      {artRecsSorted.length} Recommendations
                    </Text>
                  </View>
                    </Col>

                  </Row>

                </Grid>
                </View>

              <FlatList
                data={artRecsSorted}
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

CurrentRecommendations.navigationOptions = {
  title: 'Current Recommendations'
}

export default CurrentRecommendations
