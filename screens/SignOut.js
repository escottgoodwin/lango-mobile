import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native'

import { container, welcome, logo } from '../css'

import ButtonColor from '../components/ButtonColor'

export default class Welcome extends React.Component {

  static navigationOptions = {
    title: 'Sign Out',
  }

  render() {
    const { navigation } = this.props
    const authMsg = navigation.getParam('authMsg', 'NO-ID')

    return (
      <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.welcome}>
            Langa Learn
          </Text>

          <Text style={styles.welcome}>
            {authMsg}
          </Text>

          <ButtonColor
          title="Sign In"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("SignIn")}
          />

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container,
  logo,
  welcome
})
