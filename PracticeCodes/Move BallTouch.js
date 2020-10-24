/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Animated, PanResponder} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  position = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      // console.log(this.pan.x);
      // this.pan.setOffset(this.pan.__getValue());
    },
    onPanResponderMove: (e, gestureState) => {
      // console.log(this.pan);
      // console.log(gestureState.dx);
      this.position.setValue({x: gestureState.moveX, y: gestureState.moveY});
    },
    onPanResponderRelease: () => {
      // this.pan.flattenOffset();
    },
  });

  render() {
    return (
      <View>
        <Animated.View
          style={[this.position.getLayout()]}
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
