import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native'

const NewQuestions = (props) =>
  <View style={{marginRight:'25%',marginLeft:'25%'}}>

    <FlatList
    data={props.newQuestions}
    renderItem={
      ({ item, index }) => (
        <TouchableOpacity
        style={{margin:5,padding:5,backgroundColor:'lightgreen', borderRadius:5}}
        onPress={() => props.navigation.navigate('CreateQuestion1', { questionId1: item.id })}
        >
        <Text style={{color:'green',textAlign:"center",fontSize:14,}} >New Question!</Text>
        <Text  style={{textAlign:"center",fontSize:12,}}>{item.test.course.name}</Text>
        </TouchableOpacity>
      )
    }
    keyExtractor={item => item.id}
    />


  </View>

const styles = StyleSheet.create({
  course: {
    textAlign:"center",
    fontSize:20,
    margin:10,
    color:'#282828'
  },
  touch: {
    margin:10,
    backgroundColor:"white",
    borderColor:"#e4fef1",
    borderRadius:5,
    padding:3
  }
})

export default NewQuestions
