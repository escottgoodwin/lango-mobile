import '@babel/polyfill'
import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './NavigationService'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen } from 'react-native-firebase'
import { fromTop, fadeIn } from 'react-navigation-transitions'

import SignIn from './screens/SignIn'
import SignOut from './screens/SignOut'
import CurrentRecommendations from './screens/CurrentRecommendations'
import Article from './screens/Article'
import NewQuestionModal from './components/NewQuestionModal'
import Welcome from './screens/Welcome'
import ChooseLanguage from './screens/ChooseLanguage'


const uri = 'https://us-central1-langolearn.cloudfunctions.net/api'

const getToken = async () => {
  const token = await AsyncStorage.getItem('auth_token')
  return token
}

const httpLink = createHttpLink({uri})

const authLink = setContext( async (_, { headers }) => {
  const token = await getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const link = authLink.concat(httpLink)
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache
})

const MainStack = createStackNavigator(
  {
    SignIn: SignIn,
    SignOut: SignOut,
    CurrentRecommendations: CurrentRecommendations,
    Welcome: Welcome,
    Article: Article,
    ChooseLanguage: ChooseLanguage
  },
  {
    initialRouteName: "SignIn",
    transitionConfig: () => fadeIn()
  }
)


const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: NewQuestionModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard:true,
    transitionConfig: () => fromTop()
  }
)

const Container = createAppContainer(RootStack)

export default class App extends React.Component {

  state = {
    isVisible:false,
    questionId: ''
  }

  componentDidMount = async () => {

    const enabled = await firebase.messaging().hasPermission()
        if (enabled) {

        } else {
            // user doesn't have permission
            try {
                await firebase.messaging().requestPermission()
                // User has authorised
            } catch (error) {
                // User has rejected permissions
                alert('No permission for notification')
            }
        }


        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          NavigationService.navigate('MyModal',{ questionId1: notification.data.questionId })
        })
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
          NavigationService.navigate('MyModal',{ questionId1: notification.data.questionId, course: notification.data.course, institution: notification.data.institution, testNumber: notification.data.testNumber, subject: notification.data.subject })
        })

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
            const action = notificationOpen.action
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification
            NavigationService.navigate('CreateQuestion1',{ questionId1: notification.data.questionId })

        })

        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification()
         if (notificationOpen) {
             // App was opened by a notification
             // Get the action triggered by the notification being opened
             const action = notificationOpen.action
             // Get information about the notification that was opened
             const notification: Notification = notificationOpen.notification
             NavigationService.navigate('CreateQuestion1',{ questionId1: notification.data.questionId })

         }
      }

      componentWillUnmount() {
          this.notificationDisplayedListener ()
          this.notificationListener()
          this.notificationOpenedListener()
      }

 render() {
    return (
      <ApolloProvider client={client}>
      <Container
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
      </ApolloProvider>
    )
  }
}
