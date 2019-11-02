import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Query } from "react-apollo"
const moment = require('moment')

import { TEST_HEADER_QUERY } from '../ApolloQueries'

import SpinnerLoading1 from '../components/SpinnerLoading1'
import ErrorComponent from '../components/ErrorComponent'

export default class TestHeader extends React.Component {

  render() {

    return(
      <Query query={TEST_HEADER_QUERY} variables={{ testId: this.props.testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <SpinnerLoading1 />
              if (error) return <ErrorComponent {...error}/>

              const testToRender = data.test

          return (
            <View>
            <Text style={styles.welcome}>
              {testToRender.course.name} - {testToRender.course.courseNumber}
            </Text>

            <Text style={styles.welcome}>
              {testToRender.subject} - {testToRender.testNumber}
            </Text>
            </View>

    )
  }}
  </Query>

    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 7,
  },
})
