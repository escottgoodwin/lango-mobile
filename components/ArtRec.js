import React from 'react'
import { Text,  TouchableOpacity } from 'react-native'
import moment from 'moment'

const ArtRec = ({art_id, lang, date, title, props}) =>     
    <TouchableOpacity style={{marginTop:20}} onPress={() => props.navigation.navigate('Article',{ art_id, lang })}>
        <Text style={{fontSize:12,marginBottom:3}} >
            {moment(date).format('MMMM Do YYYY')}
        </Text>
        <Text style={{fontSize:18,marginBottom:3,color:'#3A7891'}} >
            {title}
        </Text>
    </TouchableOpacity>

export default ArtRec