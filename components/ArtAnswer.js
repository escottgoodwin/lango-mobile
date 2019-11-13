import React from 'react'
import { Text,  TouchableOpacity, View } from 'react-native'

const ArtAnswer = ({art_id, art_lang, answered, ansCorrect, navigation}) =>     
<TouchableOpacity onPress={() => navigation.navigate('Article',{ art_id, lang:art_lang })}>
    <View style={{borderRadius:5, marginTop:10, padding:10, backgroundColor: ansCorrect ? '#5cb85c' : '#d9534f'}} >
        <Text style={{fontSize:18,color:'white'}}>{answered}</Text>
        <Text style={{fontSize:14,color:'white'}}>Source Article</Text>
    </View>
</TouchableOpacity>

export default ArtAnswer