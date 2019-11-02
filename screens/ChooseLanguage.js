import React from 'react'
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'
import firebase from 'react-native-firebase'
import axios from 'axios'
import { Flag } from 'react-native-svg-flagkit'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Input, Icon } from 'native-base';

import ArtRec from '../components/ArtRec'

import  { LOGOUT_MUTATION, ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

  const removeToken = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('auth_token')

    return 
  }

class ChooseLanguage extends React.Component {

    state = {
      user: '',
    }

  static navigationOptions = {
    title: 'Choose Language',
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

      console.log(result)

      navigation.navigate('SignIn')
  }

  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})
  }


 render() {
  const { navigation } = this.props
  const { user } = this.state
  const { en_rec, fr_rec, es_rec, de_rec } = user
    return (
      <>
      <View style={{flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#F4F3EF',
        padding:'5%'}}>
      
        <>       
        <View>
          <Text>
            Welcome {user.name}
          </Text>
        </View>

        <View>
          <Text>
            Choose a Language
          </Text>
        </View>
        <ScrollView>
      {en_rec && 
        <View style={{padding:10,
          alignItems: "center",}}>      
          <TouchableOpacity onPress={() => navigation.navigate('CurrentRecommendations',{ lang:'en' })}>
          <Flag
            id={'GB'}
            
        />
            <Text style={{padding:10,
          alignItems: "center",}}>English</Text>
          </TouchableOpacity>
        </View>
      }

      {fr_rec && 
        <View style={{
          alignItems: "center",
          padding:10}}>
          <TouchableOpacity onPress={() => navigation.navigate('CurrentRecommendations',{ lang:'fr' })}>
          <Flag
            id={'FR'}
          />
            <Text style={{padding:10,
          alignItems: "center",}}>French</Text>  
          </TouchableOpacity>
        </View>
      }

      {de_rec && 
        <View style={{
          alignItems: "center",
          padding:10}}>
          <TouchableOpacity onPress={() => navigation.navigate('CurrentRecommendations',{ lang:'de' })}>
          <Flag
            id={'DE'}
          />
            <Text style={{padding:10,
          alignItems: "center",}}>German</Text>
          </TouchableOpacity>
        </View>
      }

      {es_rec && 
        <View style={{
          alignItems: "center",
          padding:10}}>
          <TouchableOpacity onPress={() => navigation.navigate('CurrentRecommendations',{ lang:'es' })}>
            <Flag
              id={'ES'}
            />
            <Text style={{padding:10,
          alignItems: "center",}}>Spanish</Text>
          </TouchableOpacity>
        </View>
      }
      </ScrollView>
      </>

        <View style={{padding:15,alignItems:'center'}}>
          <Button style={{backgroundColor:'#3A7891'}}  onPress={() => this.signOut(navigation)} title="Sign Out" >
            <Text>Sign Out</Text>
          </Button>
        </View>
       
        </View>
      </>
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

export default ChooseLanguage
