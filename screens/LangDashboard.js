import React from 'react'
import { View } from 'react-native'
import { Flag } from 'react-native-svg-flagkit'
import { Text, Button } from 'native-base';
import { langSwitch } from '../utils'

const LangDashboard = ({navigation}) => {
  const lang = navigation.getParam('lang', 'NO-ID')
  const { language, flag_lang } = langSwitch(lang)
  return (
    <>
    <View style={{flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'#F4F3EF',
      padding:'5%'}}>
        
      <View>
        <Flag id={flag_lang.toUpperCase()} />  
      </View>
    
      <View>

        <Button block style={{backgroundColor:'#3A7891', marginTop:20}}  onPress={() => navigation.navigate('LangQuiz',{ lang })} title="Sign Out" >
          <Text>Quiz</Text>
        </Button>
        
        <Button block style={{padding:10, marginTop:10}} onPress={() => navigation.navigate('CurrentRecommendations',{ lang, language })}>
          <Text >
            Recommendations
          </Text>  
        </Button>

        <Button block style={{padding:10, marginTop:10}} onPress={() => navigation.navigate('ChooseHistory',{ lang, language })}>
          <Text >
            History
          </Text>  
        </Button>

        <Button block style={{padding:10, marginTop:10}} onPress={() => navigation.navigate('PlaylistLang',{ lang })}>
          <Text >
            Playlist
          </Text>  
        </Button>

        <Button  block style={{backgroundColor:'#3A7891', padding:10, marginTop:10}} onPress={() => navigation.navigate('ChooseLanguage')}  >
          <Text>
            Home
          </Text>
        </Button>
      </View>
     
      </View>
    </>

  )
  
}

LangDashboard.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('language', 'NO-ID')
  }
}

export default LangDashboard
