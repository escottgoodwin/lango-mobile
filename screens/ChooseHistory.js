import React from 'react'
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { container } from '../css'
import moment from 'moment'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Input, Icon } from 'native-base';
import DatePicker from 'react-native-datepicker'
import { Flag } from 'react-native-svg-flagkit'
import LangChoice from '../components/LangChoice'


  const removeToken = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('auth_token')

    return 
  }

class ChooseHistory extends React.Component {

    state = {
      user: '',
      date: new Date()
    }

  static navigationOptions = {
    title: 'Recommendations Date',
    headerLeft: null
  }


  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})
  }


 render() {
  const { navigation } = this.props
  const { user, date } = this.state
  const lang = navigation.getParam('lang', 'NO-ID')
  const language = navigation.getParam('language', 'NO-ID')
    return (
      <>
      <View style={{flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#F4F3EF',
        padding:'5%'}}>
      
        <>       
        <View>
          <Text>
            Welcome {user.name}
          </Text>
        </View>

        <View>
          <Text>
            {language}
          </Text>
        </View>

        <View style={{margin:20}}>
          <Flag id={lang.toUpperCase()}  />
        </View>

        <ScrollView>

        <View>
        <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-01-01"
        maxDate="2019-12-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
        </View>
        </ScrollView>
        </>

        <View style={{padding:15,alignItems:'center'}}>
          <Button style={{backgroundColor:'#3A7891'}} onPress={() => navigation.navigate('HistoryRecommendations',{ lang, language, date })}  >
            <Text>Get Recommendations</Text>
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

export default ChooseHistory
