/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.ValueXY({
        x: 0,
        y: 0,
      }),
    };
  }

  moveBall = () => {
    Animated.timing(this.state.value, {
      toValue: {
        x: 100,
        y: 100,
      },
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Animated.View style={this.state.value.getLayout()}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'red',
              borderRadius: 50,
              margin: 10,
            }}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            this.moveBall();
          }}
          style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
          <Text>Move Me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;
