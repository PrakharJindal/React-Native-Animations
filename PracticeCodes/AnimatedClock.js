/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Dimensions, Animated, Easing} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: new Date().getHours(), //Current Hours
      min: new Date().getMinutes(), //Current Minutes
      sec: new Date().getSeconds(),
    };
  }

  secDeg = new Animated.Value(0);
  minDeg = new Animated.Value(0);
  hrDeg = new Animated.Value(0);
  a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  getTime = () => {
    setInterval(() => {
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds();
      this.secDeg.setValue(6 * sec);
      this.minDeg.setValue(6 * min);
      this.hrDeg.setValue(
        hours < 12
          ? 30 * hours + 0.5 * min
          : hours > 12
          ? 30 * (hours - 12) + 0.5 * min
          : 0.5 * min,
      );
    }, 1000);
  };

  componentDidMount = () => {
    this.getTime();
  };

  render() {
    const secRotation = this.secDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    const minRotation = this.minDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    const hrRotation = this.hrDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View
        style={{
          flex: 1,
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: width * 0.35,
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: height / 2 - width * 0.35,
          zIndex: 0,
        }}>
        <View
          style={{
            width: width * 0.7,
            height: width * 0.7,
            borderRadius: width * 0.35,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: height / 2 - width * 0.35,
            backgroundColor: '#b5f9ff80',
          }}>
          <View
            style={{
              width: width * 0.55,
              height: width * 0.55,
              borderRadius: width * 0.3,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#9fdbe090',
            }}
          />
        </View>
        <Animated.View
          style={{
            width: width * 0.8,
            height: width * 0.8,
            borderRadius: width * 0.4,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'flex-start',
            marginTop: height / 2 - width * 0.4,
            transform: [{rotate: minRotation}],
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              borderWidth: 1,
              width: 0,
              height: '50%',
              position: 'absolute',
              alignSelf: 'center',
              borderColor: 'rgba(0,0,0,0.6)',
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: width * 0.6,
            height: width * 0.6,
            borderRadius: width * 0.35,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'flex-start',
            marginTop: height / 2 - width * 0.3,
            transform: [{rotate: secRotation}],
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              borderWidth: 1,
              width: 0,
              height: '50%',
              position: 'absolute',
              alignSelf: 'center',
              borderColor: '#ff1e00',
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: width * 0.25,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'flex-start',
            marginTop: height / 2 - width * 0.25,
            transform: [{rotate: hrRotation}],
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              borderWidth: 1,
              width: 0,
              height: '50%',
              position: 'absolute',
              alignSelf: 'center',
              borderColor: 'rgba(0,0,0,0.6)',
            }}
          />
        </Animated.View>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: height / 2 - 5,
            backgroundColor: '#000',
          }}
        />
      </View>
    );
  }
}

export default App;
