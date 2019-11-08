import React from 'react'
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native'
import { withApollo } from "react-apollo"
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

import axios from 'axios'
import { container, input, logo } from '../css'

import { Card, CardItem, Text, Button, Input, Icon } from 'native-base';

import {LOGIN_MUTATION} from '../ApolloQueries'

import ErrorMutation from '../components/ErrorMutation'


const processLogin = async (uid,props) => {
  const newToken = await AsyncStorage.setItem('uid', uid)

  axios({
    url: 'https://us-central1-langolearn.cloudfunctions.net/api',
    method: 'post',
    data: {
        query: LOGIN_MUTATION,
        variables: { uid }
    }
  }).then((result) => {
      const { token, user } = result.data.data.login
      const newToken = AsyncStorage.setItem('auth_token', token)
      const user3 = AsyncStorage.setItem('user', JSON.stringify(user))
  })

}

class SignIn extends React.Component {

  componentDidMount = async () => {
        //const fcmToken = await firebase.messaging().getToken()
        //const credentials =  await Keychain.getGenericPassword()
        //if (!credentials.username) {
        //  this.setState({touchId:false})
        //}
        //this.setState({pushToken:fcmToken})
        //this.setState({email:'',password:''})
        //this.props.navigation.navigate('StudentDashboard')
        //const { history } = this.props
        this.setState({email:'',password:''})
        firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           
            //this.props.navigation.navigate('StudentDashboard')
          } else {
          
        }
        })
        
      }
    
      emailSignIn = () => {
        const { email, password } = this.state
        this.setState({email:'',password:''})
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result) {
          processLogin(result.user.uid,this.props)
          
        }).catch((error) => {
          var errorMessage = error.message;
          this.setState({errorMessage,showError:true})
        })
        this.props.navigation.navigate('ChooseLanguage')
      }

      touchIdLogin = async () => {
        TouchID.authenticate('Login with your fingerprint')
          .then(success => Keychain.getGenericPassword())
          .then(credentials => {
            const {username, password } = credentials
            firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(result) {
          processLogin(result.user.uid,this.props)
          
        }).catch((error) => {
          var errorMessage = error.message;
          this.setState({errorMessage,showError:true})
        })
            
        })
         .catch(error => {
            console.log(error)
          })
        }

         facebookLogin =  async () => {
          try {
            const result = await LoginManager.loginWithPermissions(['public_profile']);
            console.log(result)
            if (result.isCancelled) {
              // handle this however suites the flow of your app
              throw new Error('User cancelled request'); 
            }
        
            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        
            // get the access token
            const data = await AccessToken.getCurrentAccessToken();
        
            if (!data) {
              // handle this however suites the flow of your app
              throw new Error('Something went wrong obtaining the users access token');
            }
        
            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            processLogin(firebaseUserCredential.user.uid,this.props)
            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
          } catch (error) {
            this.setState({error})
          }
        }

        googleLogin = async () => {
          try {
            await GoogleSignin.configure();
            const data = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            processLogin(firebaseUserCredential.user.uid,this.props)
          } catch (error) {
            this.setState({error})

          }
          this.props.navigation.navigate('ChooseLanguage')
        }

        twitterLogin = async () => {
          try {
            await RNTwitterSignIn.init('hWBjPH7UU221SKCxMUO5S8Vgx', 'bYGg1faZ9dw73QII5q1a1XJhysjuhcU9IJYJui8SAHBS2S1xbg');
        
            const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();    
        
            const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
        
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        
            processLogin(firebaseUserCredential.user.uid,this.props)
          } catch (e) {
            console.error(e);
          }
          
        }


  static navigationOptions = {
    title: 'Sign In',
  }

     state = {
       email: '',
       email1: '',
       password: '',
       graphQLError: '',
       isVisibleGraph:false,
       networkError:'',
       isVisibleNet:false,
       isVisibleAuth:false,
       touchIdError:'',
       isVisibleTID: false,
       authMsg:'',
       pushToken:'',
       touchId:true,
       loggedIn:'logged in no!',
       isLogin:false,
       error:''
     }

  render() {

    const { email, password, graphQLError, networkError, authMsg, touchIdError, isVisibleNet, isVisibleGraph, isVisibleAuth, isVisibleTID,  pushToken, isLogin, error } = this.state

    return (
      <ImageBackground source={require('../assets/loginmap1.jpg')} style={{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView
        style={{flex:1,
        justifyContent: "center",
        alignItems: "center",
        padding:10}}
        behavior="padding" >

      <Card 
        style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop:20,
        paddingBottom:20
        }} >
        <CardItem bordered >

          <Text style={{color:'#3A7891',fontSize:24}}>Langa Learn</Text>

        </CardItem>

        <CardItem >
          <TouchableOpacity onPress={() => this.googleLogin()} >
            <Icon  name='logo-google' style={{color:'#3A7891',margin:20}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.facebookLogin()} >
            <Icon name='logo-facebook' style={{color:'#3A7891',margin:20}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.twitterLogin()} >
            <Icon name='logo-twitter' style={{color:'#3A7891',margin:20}}/>
          </TouchableOpacity>

        </CardItem>

        <CardItem bordered>
       
        <Input
          placeholder='Email'
          onChangeText={(text) => this.setState({email:text})}
          value={email}
          autoCapitalize='none'
          keyboardType='email-address'
          />

      </CardItem>

      <CardItem bordered>

        <Input
          placeholder='Password'
          onChangeText={(text) => this.setState({password:text})}
          value={password}
          autoCapitalize='none'
          secureTextEntry={true}
          />
 
        </CardItem>

        <CardItem>
        <Button style={{backgroundColor:'#3A7891'}} onPress={() => this.emailSignIn()} >
          <Text>Login</Text>
        </Button>
        
        </CardItem>
        </Card>
      
      {isVisibleGraph && <ErrorMutation error={this.state.graphQLError} />}

      {isVisibleNet && <ErrorMutation error={this.state.networkError} />}

      {isVisibleAuth && <ErrorMutation error={this.state.authMsg} />}

      {isVisibleTID && <ErrorMutation error={this.state.touchIdError} />}

      {isLogin && <ErrorMutation error={this.state.error} />}

      
      </KeyboardAvoidingView>
      </ImageBackground>
    )
  }

  _error = async error => {
      this.setState({email:'',password:''})
      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }



  
  }

const styles = StyleSheet.create({
  container,
  input,
  logo
})

export default withApollo(SignIn)
