import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const SignInHeader = (props) =>

<View style={styles.container}>


</View>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#e4f1fe',
      height:600
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    logo: {
      height: 120,
      marginBottom: 16,
      marginTop: 32,
      borderRadius:5
    },
  })

export default SignInHeader
