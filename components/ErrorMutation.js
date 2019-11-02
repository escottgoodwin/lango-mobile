import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import { warning, messages } from '../css'

 const ErrorMutation = (props) =>

     <View style={styles.warning}>
       <Icon
       name='exclamation-triangle'
       type='font-awesome'
       color='#bb6a6a' />
       <Text style={styles.messages}>
        {props.error}
        </Text>
     </View>

const styles = StyleSheet.create({
  warning: warning,
  messages: messages
})

export default ErrorMutation
