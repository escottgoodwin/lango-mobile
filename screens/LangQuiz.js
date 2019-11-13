import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { container } from '../css'
import { Col, Row } from 'react-native-easy-grid'

import { Query } from "react-apollo"
import { VOCAB_QUERY } from '../ApolloQueries'

import LangVocabTest from '../components/LangVocabTest'
import Loading from './Loading'

class LangQuiz extends React.Component {

  static navigationOptions = {
    title: 'Vocabulary Quiz',
    headerLeft: null
  }

  render(){
    const { navigation } = this.props

  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

      <Query query={VOCAB_QUERY} 
            fetchPolicy={"network-only"}>
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <div>{JSON.stringify(error)}</div>

            const { translations } = data
                 
            return (                
              <View style={{
                flex:1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:'#F4F3EF',
                }}>

                <Row>
                  <Col>
                    <LangVocabTest vocab={translations} navigation={navigation} />
                  </Col>
                </Row>
                
                
            </View>
            )
          }}
        </Query>

      </ScrollView>
      </View>
    )
  }

  }




const styles = StyleSheet.create({
  container
})

export default LangQuiz
