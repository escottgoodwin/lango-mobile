import React from 'react'
import { StyleSheet, View } from 'react-native'
import { container } from '../css'
import { Flag } from 'react-native-svg-flagkit'
import { Text, Button } from 'native-base';
import { langSwitch } from '../utils'

class LangDashboard extends React.Component {

  static navigationOptions = {
    title: 'Language Dashboard'
  }

 render() {
  const { navigation } = this.props
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
          <Flag  id={flag_lang.toUpperCase()} />  
        </View>
            
        <View>
          <Text>
           {language}
          </Text>
        </View>
      
        <View>

          <Button block style={{backgroundColor:'#3A7891', marginTop:20}}  onPress={() => navigation.navigate('LangQuiz',{ lang })} title="Sign Out" >
            <Text>Quiz</Text>
          </Button>
          
          <Button block style={{padding:10,marginTop:10}} onPress={() => navigation.navigate('CurrentRecommendations',{ lang, language })}>
            <Text >
              Recommendations
            </Text>  
          </Button>

          <Button block style={{padding:10,marginTop:10}} onPress={() => navigation.navigate('ChooseHistory',{ lang, language })}>
            <Text >
              History
            </Text>  
          </Button>

          <Button block style={{padding:10,marginTop:10}} onPress={() => navigation.navigate('PlaylistLang',{ lang })}>
            <Text >
              Playlist
            </Text>  
          </Button>
        </View>

        <View style={{padding:15}}>
          <Button  block style={{backgroundColor:'#3A7891'}} onPress={() => navigation.navigate('ChooseLanguage')}  >
            <Text>Home</Text>
          </Button>
        </View>
       
        </View>
      </>
    )

  }

  _error = async error => {

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }
}


const styles = StyleSheet.create({
  container
})

export default LangDashboard
