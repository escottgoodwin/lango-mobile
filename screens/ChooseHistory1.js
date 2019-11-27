import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import {  Text, Button} from 'native-base';
import DatePicker from 'react-native-datepicker'
import { Flag } from 'react-native-svg-flagkit'
import { langSwitch } from '../utils'

const ChooseHistory = ({navigation}) => {

    const currDate = new Date()
    const [ date, setDate ] = useState(currDate)

    const lang = navigation.getParam('lang', 'NO-ID')
    const language = navigation.getParam('language', 'NO-ID')
    const { flag_lang } = langSwitch(lang)
    const flaglang = flag_lang.toUpperCase()

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
            {language}
          </Text>
        </View>

        <View style={{margin:20}}>
          <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
            <Flag id={flaglang} /> 
          </TouchableOpacity>
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
        onDateChange={(date) => setDate(date)}
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

ChooseHistory.navigationOptions = {
  title: 'Recommendations History'
}

export default ChooseHistory