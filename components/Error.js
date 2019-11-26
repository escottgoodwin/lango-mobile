import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

 const Error = ({error}) =>

    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
    </View>

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
})

export default Error
