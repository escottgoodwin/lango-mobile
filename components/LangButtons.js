import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'native-base';
import { Flag } from 'react-native-svg-flagkit'
import { Col, Row, Grid } from 'react-native-easy-grid'

const LangButtons = ({lang, language, navigation}) => 

    <View >
        <Button small style={{padding:10,margin:5,alignItems: "center"}} onPress={() => navigation.navigate('CurrentRecommendations',{ lang, language })}>
            <Text >
                Recommendations
            </Text>  
        </Button>

        <Button  small style={{padding:10,margin:5,alignItems: "center"}} onPress={() => navigation.navigate('ChooseHistory',{ lang, language })}>
            <Text >
                History
            </Text>  
        </Button>

        <Button  small style={{padding:10,margin:5,alignItems: "center"}} onPress={() => navigation.navigate('PlaylistRecommendations',{ lang, language })}>
            <Text >
                Playlist
            </Text>  
        </Button>
    </View>

export default LangButtons