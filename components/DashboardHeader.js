import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Text, View } from 'react-native'

const DashboardHeader = (props) =>
  <View style={styles.container}>
    <Image source={require('../assets/RNFirebase.png')} style={[styles.logo]}/>
    <Text style={styles.welcome}>
      Welcome {props.name}
    </Text>
  </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})

export default DashboardHeader
