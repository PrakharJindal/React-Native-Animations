import React from 'react';
import {Animated, StyleSheet} from 'react-native';

import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

export class PinchableBox extends React.Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{nativeEvent: {scale: this._pinchScale}}],
      {useNativeDriver: true},
    );

    // Panning
    this.xPos = new Animated.Value(0);
    this.yPos = new Animated.Value(0);
    this._onPanGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.xPos, translationY: this.yPos}}],
      {useNativeDriver: true},
    );
  }

  _onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.xPos.setValue(event.nativeEvent.translationX);
      this.yPos.setValue(event.nativeEvent.translationY);
      Animated.timing(this.xPos, {
        toValue: 0,
        delay: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.yPos, {
        toValue: 0,
        delay: 0,
        useNativeDriver: true,
      }).start();
      console.log(event.nativeEvent);
    }
  };

  _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale = event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      console.log(this._lastScale);
      Animated.timing(this._baseScale, {
        toValue: 1,
        delay: 0,
        useNativeDriver: true,
      }).start();

      // Animated.timing(this._pinchScale, {
      //   toValue: 1,
      //   delay: 500,
      //   useNativeDriver: true,
      // });
      // this._baseScale.setValue(1);
      this._pinchScale.setValue(1);
    }
  };

  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onPanGestureEvent}
        simultaneousHandlers={this.pinchRef}
        onHandlerStateChange={this._onPanHandlerStateChange}
        minPointers={2}
        maxPointers={2}
        avgTouches>
        <Animated.View style={styles.wrapper}>
          <PinchGestureHandler
            ref={this.pinchRef}
            simultaneousHandlers={this.panRef}
            onGestureEvent={this._onPinchGestureEvent}
            onHandlerStateChange={this._onPinchHandlerStateChange}>
            <Animated.View style={styles.container}>
              <Animated.Image
                style={[
                  styles.pinchableImage,
                  {
                    transform: [
                      {scale: this._scale},
                      {translateX: this.xPos},
                      {translateY: this.yPos},
                    ],
                  },
                ]}
                resizeMode="contain"
                source={{
                  uri:
                    'https://d3nn873nee648n.cloudfront.net/HomeImages/Festivals-and-Occasions.jpg',
                }}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default PinchableBox;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'pink',
    // overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: '100%',
    // minHeight: 100,
    // maxHeight: 600,
    height: 600,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
  },
});
