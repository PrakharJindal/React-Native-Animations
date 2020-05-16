/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Image
          style={{
            width: 280,
            height: 280,
            marginTop: 'auto',
            borderColor: 'black',
            borderRadius: 140,
          }}
          resizeMode="contain"
          source={{
            uri:
              'https://d3nn873nee648n.cloudfront.net/HomeImages/Festivals-and-Occasions.jpg',
          }}
        />
        <View
          style={{
            marginTop: 'auto',
            paddingTop: 40,
            backgroundColor: 'lightblue',
            width: '100%',
            alignContent: 'center',
            borderRadius: 20,
            bottom: 0,
            height: '40%',
          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Welcome To Hotels4U
          </Text>
          <Button title="Sign Up" />
        </View>
      </View>
    );
  }
}

export default App;
