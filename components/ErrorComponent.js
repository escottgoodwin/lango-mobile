import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import { warning, messages } from '../css'

 const ErrorComponent = (props) =>

     <View style={styles.warning}>
     <Icon
     name='exclamation-triangle'
     type='font-awesome'
     color='#bb6a6a' />
     {
       props.graphQLErrors !== "undefined" &&
         props.graphQLErrors.map(error =>
           <Text key={error.message} style={styles.messages}>{error}</Text>
        )
      }

      {
       props.networkError !== null &&
       <Text key={error.message} style={styles.messages}>{props.networkError.message}</Text>
      }
    </View>

const styles = StyleSheet.create({
  warning: warning,
  messages: messages
})

export default ErrorComponent
