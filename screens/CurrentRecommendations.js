import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'
import firebase from 'react-native-firebase'
import axios from 'axios'
import { Flag } from 'react-native-svg-flagkit'
import ArtRec from '../components/ArtRec'

import  { LOGOUT_MUTATION, ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

  const removeToken = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('auth_token')

    return 
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
    title: 'Current Recommendations',
    headerLeft: null
  }

  signOut = navigation => {
    firebase.auth().signOut().then(function() {
      
    }).catch(function(error) {
      console.log(error)
    })
  
      const {uid} = this.state
      removeToken()
      const result = axios({
        
        url: 'https://us-central1-langolearn.cloudfunctions.net/api',
        method: 'post',
        data: {
            query: LOGOUT_MUTATION,
            variables: { uid }
        }
      }).then((result) => {
          return result
      })
      .catch(function(error) {
        console.log(error)
      })

      navigation.navigate('SignIn')
  }

  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})

    const now = new Date()
    this.setState({date:now})
  }

 render() {
  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const { user, date, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  const flag = lang.toUpperCase()
  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

        <Query  query={ARTICLE_REC_DATE_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang, date }}  >
            {({ loading, error, data }) => {
              if (loading) return <View><Text>Loading...</Text></View>
              if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

            const { articleRecommendationsHistory } = data
 
            return (
              <>
              <View>
                <Flag
                    id={flag}
                    size={0.2}
                /> 
                <Text style={{fontSize:18}}>
                  {articleRecommendationsHistory.length} Recommendations
                </Text>
              </View>

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

export default CurrentRecommendations
