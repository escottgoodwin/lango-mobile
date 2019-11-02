import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const SpinnerLoading = () => (

      <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      </View>

    )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    padding:25,

  }
})

export default SpinnerLoading
