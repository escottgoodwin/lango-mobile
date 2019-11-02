import React from 'react'
import { StyleSheet, Platform, Text, View, TouchableOpacity} from 'react-native'
import { Card } from 'react-native-elements'
import { Query } from "react-apollo"

import { USER_QUESTION_QUERY } from '../ApolloQueries'

import SpinnerLoading1 from '../components/SpinnerLoading1'
import ErrorComponent from '../components/ErrorComponent'

export default class QuestionStats extends React.Component {

  render() {

    return(

      <Query query={USER_QUESTION_QUERY} variables={{ testId: this.props.testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <SpinnerLoading1 />
              if (error) return <ErrorComponent {...error}/>

              const userQuestionStats = data.userQuestionStats

          return (

      <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('UserQs',{testId:this.props.testId})} >
      <Card title='Your Questions' containerStyle={{width: '90%'}}>
      <Text style={styles.instructions}>Total Questions : {userQuestionStats.totalQuestions} </Text>
      <Text style={styles.instructions}>Total Answers: {userQuestionStats.answers} </Text>

      <Text style={styles.instructions}>Answers Correct: {userQuestionStats.totalCorrect} </Text>
      <Text style={styles.instructions}>Percent: {Math.round(userQuestionStats.percentCorrect*100)}% </Text>
      </Card >
      </TouchableOpacity>

      )
    }}
    </Query>


    )
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }
})
