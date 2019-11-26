import React from 'react'
import { Text,  View, TouchableOpacity } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'
import { Button } from 'native-base';
import moment from 'moment'

import { Mutation } from "react-apollo"
import  { REMOVE_PLAYLIST_MUTATION, PLAYLIST_QUERY } from '../ApolloQueries'

const ArtRecPlaylist = ({art_id, lang, date, title, props}) => {
    return(
        <>
        <Row>

            <Col size={15}>

                <Mutation
                mutation={REMOVE_PLAYLIST_MUTATION}
                variables={{ art_id }}
                onError={error => this._error (error)}
                refetchQueries={() => {
                    return [{
                    query: PLAYLIST_QUERY,
                    }];
                }}
                >
                {mutation => (
                    <Button onPress={mutation} danger>
                        <Text style={{marginLeft:'40%',color:'white'}}>
                            X
                        </Text>
                    </Button>
                )}
                </Mutation>
            
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
        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, margin: 5 }} />
    </> 
    )  
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)

    error.networkError &&
        Toast.show({
            text: error.networkError.message,
            buttonText: 'Okay',
            duration: 3000,
            type: "danger"
        })
 
      Toast.show({
        text: gerrorMessage,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })
}


export default ArtRecPlaylist