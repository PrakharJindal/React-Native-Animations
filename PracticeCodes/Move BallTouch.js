/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Animated, PanResponder} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      console.log(this.pan.x);
      this.pan.setOffset(this.pan.__getValue());
    },
    onPanResponderMove: (e, gestureState) => {
      // console.log(this.pan);
      // console.log(gestureState.dx);
      this.pan.x.setValue(gestureState.dx);
      this.pan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
    },
  });

  render() {
    return (
      <View>
        <Animated.View
          style={{
            transform: [
              {
                translateX: this.pan.x,
              },
              {
                translateY: this.pan.y,
              },
            ],
          }}
          {...this.panResponder.panHandlers}>
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
      </View>
    );
  }
}

export default App;
