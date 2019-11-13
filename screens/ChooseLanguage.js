import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { container } from '../css'
import firebase from 'react-native-firebase'
import axios from 'axios'
import { Text, Button } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid'
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
          <Button  style={{width:'100%', backgroundColor:'#3A7891', marginTop:20}}  onPress={() => navigation.navigate('VocabQuiz')} >
            <Text>Quiz</Text>
          </Button>
        </View>

        <View>
         <Button  style={{width:'100%', backgroundColor:'#3A7891', marginTop:20}}  onPress={() => navigation.navigate('PlaylistRecommendations')} >
           <Text>Playlist</Text>
         </Button>
       </View>
        
        <ScrollView>

          <Grid>
          <Row>
          { user.en_rec &&  <LangChoice lang='en' language='English' navigation={navigation} /> }
          </Row>
          <Row>
          { user.fr_rec &&  <LangChoice lang='fr' language='French' navigation={navigation} /> }
          </Row>
          <Row>
          { user.de_rec &&  <LangChoice lang='de' language='German' navigation={navigation} />  }
          </Row>
          <Row>
          { user.es_rec && <LangChoice lang='es' language='Spanish'  navigation={navigation} /> }
          </Row>
          </Grid>

        </ScrollView>
        
        </>

        <View style={{padding:15,alignItems:'center'}}>
          <Button style={{backgroundColor:'#3A7891'}}  onPress={() => this.signOut(navigation)} >
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
