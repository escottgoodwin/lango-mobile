import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Flag } from 'react-native-svg-flagkit'

const LangChoice = ({lang, language, navigation}) => 

    <View style={{margin:10}}>

        <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
            <Flag style={{margin:10}} id={lang.toUpperCase()}  /> 
        </TouchableOpacity>

    </View>

export default LangChoice