import React from 'react'
import { View, Text,  TouchableOpacity } from 'react-native'
import { Flag } from 'react-native-svg-flagkit'

const LangChoice = ({lang, language, navigation}) => 

    <View style={{
        alignItems: "center",
        padding:10}}>

    <Flag id={lang.toUpperCase()}  size={0.5}/>

    <TouchableOpacity onPress={() => navigation.navigate('CurrentRecommendations',{ lang, language })}>
        <Text style={{padding:10,alignItems: "center",}}>
            Recommendations
        </Text>  
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('ChooseHistory',{ lang, language })}>
        <Text style={{padding:10,alignItems: "center",}}>
            History
        </Text>  
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('PlaylistRecommendations',{ lang, language })}>
        <Text style={{padding:10,alignItems: "center",}}>
            Playlist
        </Text>  
    </TouchableOpacity>

    </View>
    
export default LangChoice