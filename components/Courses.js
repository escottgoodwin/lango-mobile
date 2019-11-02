import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native'

const Courses = (props) =>

    <FlatList
    data={props.classes}
    renderItem={
      ({ item, index }) => (
        <TouchableOpacity style={styles.touch}
        onPress={() => props.navigation.navigate('ClassDashboard', { courseId: item.id })}
        >
        <Text style={styles.course} >{item.name}</Text>
        <Text style={styles.course} >{item.institution.name}</Text>
        </TouchableOpacity>
      )
    }
    keyExtractor={item => item.id}
  />


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

export default Courses
