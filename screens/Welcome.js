import React from 'react';
import { StyleSheet, Text, ScrollView} from 'react-native';

import ButtonColor from '../components/ButtonColor'

export default class Welcome extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

          
          <Text style={styles.welcome}>
            Lango Learn
          </Text>

          <Text style={styles.welcome}>
            Articles in the language you are learning.
          </Text>

          <Text style={styles.welcome}>
            Practice vocabulary.
          </Text>

          <ButtonColor
          title="Sign In"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("SignIn")}
          />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4f1fe',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
