import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base';

 const Error = ({error}) =>

    <View style={styles.container}>
      <View style={{backgroundColor:'#d9534f',width:'80%',padding:20,borderRadius:5}}>
      
      <View style={{alignItems: 'center'}}>
        <Icon name='md-warning' style={{color:'white'}}/>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{color:'white',fontSize:36}}>Error!</Text>
      </View>

      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          margin: 5
        }}
      />

      <Text style={{color:'white',fontSize:24}}>{error.graphQLErrors[0].message}</Text>

      </View>
    </View>

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
})

export default Error
