import React from 'react'
import { StyleSheet, Text, View, ScrollView,  FlatList, TouchableOpacity } from 'react-native'
import { container } from '../css'
import { Flag } from 'react-native-svg-flagkit'
import ArtRec from '../components/ArtRec'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { langSwitch } from '../utils'

import { Query } from "react-apollo"
import  { ARTICLE_REC_ALL_QUERY } from '../ApolloQueries'

import Loading from './Loading'

function sortDate(array){

  return array.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  })
}

class CurrentRecommendations extends React.Component {

    state = {
      user: '',
      date:null,
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
    }

  static navigationOptions = {
    title: 'Current Recommendations'
  }

 render() {
  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const { date, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  const { language, flag_lang } = langSwitch(lang)
  const flaglang = flag_lang.toUpperCase()
  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

        <Query  query={ARTICLE_REC_ALL_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang, date }}  >
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

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

export default CurrentRecommendations
