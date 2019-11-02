import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Button, Text, View } from 'react-native'

export default class NewQuestionModal extends React.Component {

  render() {
    const { navigation } = this.props

    const questionId1 = navigation.getParam('questionId1', 'NO-ID')
    const course = navigation.getParam('course', 'NO-ID')
    const institution = navigation.getParam('institution', 'NO-ID')
    const testNumber = navigation.getParam('testNumber', 'NO-ID')
    const subject = navigation.getParam('subject', 'NO-ID')

    return (

    <View style={styles.container} >

    <View style={{marginTop:18}} >
    <Text style={styles.message}>
    New question! {course} -  {testNumber}
    </Text>
    </View>

    <View style={styles.layout} >

    <Button
        title="Dismiss"
        onPress={() => navigation.goBack()}
        color="lightblue"
       />

    <Button
        title="Answer"
        color="lightblue"
        onPress={() => navigation.navigate('CreateQuestion',{ questionId1: questionId1 })}
       />

    </View>

    </View>

  )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:'15%',
    width:'100%',
    backgroundColor:'#21385b',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
  },
  message: {
    fontSize:16,
    color:'lightblue',
  },
  layout:{
    flexDirection:'row',
    flex:1,

  }
})
