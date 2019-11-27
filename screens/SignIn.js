import React from 'react'
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, KeyboardAvoidingView, ImageBackground, Image } from 'react-native'
import axios from 'axios'
import { withApollo } from "react-apollo"
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin'

import { Card, CardItem, Text, Button, Input, Icon, Toast } from 'native-base';

import { LOGIN_MUTATION } from '../ApolloQueries'

const processLogin = async (uid,props) => {
  await AsyncStorage.setItem('uid', uid)

  const result = await axios({
    url: 'https://us-central1-langolearn.cloudfunctions.net/api',
    method: 'post',
    data: {
        query: LOGIN_MUTATION,
        variables: { uid }
    }
  })

  const { token, user } = result.data.data.login
  await AsyncStorage.setItem('auth_token', token)
  await AsyncStorage.setItem('user', JSON.stringify(user))
  props.navigation.navigate('ChooseLanguage')
}

class SignIn extends React.Component {

  componentDidMount(){

    this.setState({email:'',password:''})
        
  }
    
  emailSignIn = () => {
    const { email, password } = this.state
    this.setState({email:'',password:''})
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      processLogin(result.user.uid,this.props)
      Toast.show({
        text: 'Login Successful!',
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
    })
      
    }).catch((error) => {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
    })
    })
    
  }

  touchIdLogin = async () => {
    TouchID.authenticate('Login with your fingerprint')
      .then(success => Keychain.getGenericPassword())
      .then(credentials => {
        const {username, password } = credentials
        firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function(result) {
      processLogin(result.user.uid,this.props)
      Toast.show({
        text: 'Login Successful!',
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
      })
      
    }).catch((error) => {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })
    })
        
    })
      .catch(error => {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
    })
      })
  }

    facebookLogin =  async () => {
    try {
      const result = await LoginManager.loginWithPermissions(['public_profile']);
      if (result.isCancelled) {
        Toast.show({
          text: 'User cancelled request',
          buttonText: 'Okay',
          duration: 3000,
          type: "danger"
        })
      }
  
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        Toast.show({
          text: 'Could not login.',
          buttonText: 'Okay',
          duration: 3000,
          type: "danger"
        })
      }
  
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
  
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

      processLogin(firebaseUserCredential.user.uid, this.props)
        Toast.show({
          text: 'Login Successful!',
          buttonText: 'Okay',
          duration: 3000,
          type: "success"
        })

    } catch (error) {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })
    }
  }

  googleLogin = async () => {
    try {
      await GoogleSignin.configure();
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      processLogin(firebaseUserCredential.user.uid,this.props)
      Toast.show({
        text: 'Login Successful!',
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
      })
    } catch (error) {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })

    }
    
  }

  twitterLogin = async () => {
    try {
      await RNTwitterSignIn.init('hWBjPH7UU221SKCxMUO5S8Vgx', 'bYGg1faZ9dw73QII5q1a1XJhysjuhcU9IJYJui8SAHBS2S1xbg');
  
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();    
  
      const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
  
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      processLogin(firebaseUserCredential.user.uid,this.props)

      Toast.show({
        text: 'Login Successful!',
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
      })
    } catch (error) {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
    })
    }
    
  }


  static navigationOptions = {
    title: 'Sign In',
  }

     state = {
       email: '',
       email1: '',
       password: '',
       touchId:true,
     }

  render() {

    const { email, password } = this.state

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

          <Image style={{width:'50%'}} source={require('../assets/langalogo.png')} />

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

      
  </KeyboardAvoidingView>
  </ImageBackground>
  )
}

}

export default withApollo(SignIn)
