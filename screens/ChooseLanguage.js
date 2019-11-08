import React from 'react'
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'
import firebase from 'react-native-firebase'
import axios from 'axios'
import { Text, Button } from 'native-base';

import LangChoice from '../components/LangChoice'

import  { LOGOUT_MUTATION } from '../ApolloQueries'

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
        { user.en_rec && <LangChoice lang='en' language='English' navigation={navigation} /> }

        { user.fr_rec && <LangChoice lang='fr' language='French' navigation={navigation} /> }

        { user.de_rec && <LangChoice lang='de' language='German' navigation={navigation} /> }

        { user.es_rec && <LangChoice lang='es' language='Spanish'  navigation={navigation} /> }
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
