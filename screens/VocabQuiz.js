import React from 'react'
import { View, ScrollView } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'

import { Query } from "react-apollo"
import { VOCAB_QUERY } from '../ApolloQueries'

import VocabTest from '../components/VocabTest'
import Loading from './Loading'
import Error from './Error'

const VocabQuiz = ({navigation}) =>  {

  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

      <Query query={VOCAB_QUERY} 
            fetchPolicy={"network-only"}>
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

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
                    <VocabTest vocab={translations} navigation={navigation} />
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

VocabQuiz.navigationOptions = {
  title: 'Vocabulary Quiz'
}

export default VocabQuiz
