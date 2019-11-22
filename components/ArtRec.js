import React from 'react'
import { Text,  View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Button } from 'native-base';

import { Mutation } from "react-apollo"
import  { ADD_PLAYLIST_MUTATION, REMOVE_PLAYLIST_MUTATION, ARTICLE_REC_ALL_QUERY } from '../ApolloQueries'

const ArtRec = ({art_id, lang, date, title, playlist, props}) => 
<>
    <Row>

        <Col size={15}>

        {playlist ? 

            <Mutation
            mutation={REMOVE_PLAYLIST_MUTATION}
            variables={{ art_id }}
            refetchQueries={() => {
                return [{
                query: ARTICLE_REC_ALL_QUERY,
                variables:{ lang }
                }];
            }}
            >
            {mutation => (
                <Button onPress={mutation} success>
                    <Text style={{marginLeft:'33%'}}>
                        PL
                    </Text>
                </Button>
            )}
            </Mutation>
            
            :

            <Mutation
            mutation={ADD_PLAYLIST_MUTATION}
            variables={{ art_id }}
            refetchQueries={() => {
                return [{
                query: ARTICLE_REC_ALL_QUERY,
                variables:{ lang }
                }];
            }}
            >
            {mutation => (
                <Button onPress={mutation} bordered success>
                    <Text style={{marginLeft:'33%'}}>
                        PL
                    </Text>
                </Button>
            )}
            </Mutation>
            }
        
        </Col>

        <Col size={85}>

        <TouchableOpacity style={{marginLeft:5}} onPress={() => props.navigation.navigate('Article',{ art_id, lang })}>
        <Text style={{fontSize:12,marginBottom:3}} >
            {moment(date).format('MMMM Do YYYY')}
        </Text>
        <Text style={{fontSize:16,marginBottom:3,color:'#3A7891'}} >
            {title}
        </Text>
    </TouchableOpacity>
        
        </Col>

    </Row>    
    <View
    style={{
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      margin: 5
    }}
  />
</>   

export default ArtRec