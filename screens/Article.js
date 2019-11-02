import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'

import  { ARTICLE_QUERY } from '../ApolloQueries'

class Article extends React.Component {

    state = {
      user: '',
      lang:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
    }

  static navigationOptions = {
    title: 'Article',
    headerLeft: null
  }

  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})
  }

 render() {

  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const art_id = navigation.getParam('art_id', 'NO-ID')
  console.log(art_id, lang)
    return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <View><Text>Loading...</Text></View>
                if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                const { article, title, link, date, translations } = data.article
              
            return (
              <>
              <View>
                <Text>
                  {moment(date).format('MMMM Do YYYY')}
                </Text>
              </View>

              <View>
                <Text style={{fontSize:24,marginBottom:3,color:'#3A7891'}}>
                  {title}
                </Text>
              </View>
              
              <View>
                <Text style={{fontSize:18}}>
                  {article}
                </Text>
              </View>
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

export default Article
