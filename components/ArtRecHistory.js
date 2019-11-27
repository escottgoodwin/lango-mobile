import React from 'react'
import { Text,  View, TouchableOpacity } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'
import { Button, Toast } from 'native-base';
import moment from 'moment'

import { Mutation } from "react-apollo"
import  { ADD_PLAYLIST_MUTATION, REMOVE_PLAYLIST_MUTATION, ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

const ArtRecHistory = ({art_id, lang, date, title, playlist, searchDate, navigation}) => {
    return(
        <>
            <Row>

                <Col size={15}>

                {playlist ? 

                    <Mutation
                    mutation={REMOVE_PLAYLIST_MUTATION}
                    variables={{ art_id }}
                    onError={error => _error (error)}
                    onCompleted={data => _confirm(data.removeFromPlaylist.message)}
                    refetchQueries={() => {
                        return [{
                        query: ARTICLE_REC_DATE_QUERY,
                        variables:{ lang, date: searchDate }
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
                    onError={error => _error (error)}
                    onCompleted={data => _confirm(data.addToPlaylist.message)}
                    refetchQueries={() => {
                        return [{
                        query: ARTICLE_REC_DATE_QUERY,
                        variables:{ lang, date: searchDate }
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

                <TouchableOpacity style={{marginLeft:5}} onPress={() => navigation.navigate('Article',{ art_id, lang })}>
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
    )  
}

_error = async error => {
    Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
    })
}

_confirm = async message => {
    Toast.show({
        text: message,
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
    })
}

export default ArtRecHistory