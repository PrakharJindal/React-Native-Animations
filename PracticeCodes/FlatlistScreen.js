/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  StatusBar,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Easing} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');
const images = [
  'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
  'https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/Sample-image10-highres.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
  'https://wallpapercave.com/wp/wp2608078.jpg',
  'https://wallpaperaccess.com/full/138728.jpg',
  'https://images.unsplash.com/photo-1465572089651-8fde36c892dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
  'https://i.pinimg.com/originals/f0/60/d4/f060d45d3047e8e307fcf41d97186fdf.jpg',
];
const count = [1, 2, 3, 4, 5, 6, 7, 8];
const itemSize = width * 0.6;
const spacing = (width * 0.1) / 6;

// const AnimatedBlurView = new Animated.createAnimatedComponent(BlurView);
export default class FlatlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  xPos = new Animated.Value(0);
  blur = new Animated.Value(1);
  modalPos = new Animated.Value(height - 80);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {},
    onPanResponderMove: (e, gestureState) => {
      gestureState.moveY > 100 && gestureState.moveY < height - 80
        ? this.modalPos.setValue(gestureState.moveY)
        : null;
    },
    onPanResponderRelease: (e, gestureState) => {
      gestureState.moveY > 100 && gestureState.moveY < height - 80
        ? this.modalPos.setValue(gestureState.moveY)
        : null;
      if (gestureState.vy > 0 || gestureState.dy > height / 2) {
        Animated.timing(this.modalPos, {
          toValue: height - 80,
          useNativeDriver: true,
          ease: Easing.linear,
        }).start();
      } else {
        Animated.timing(this.modalPos, {
          toValue: 100,
          useNativeDriver: true,
          ease: Easing.linear,
        }).start();
      }
    },
  });

  render() {
    this.blur = this.modalPos.interpolate({
      inputRange: [100, height - 80],
      outputRange: [10, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1, backgroundColor: '#FFEFE0'}}>
        <View>
          <Text
            style={{
              margin: 30,
              fontSize: 20,
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            Flatlist Screen
          </Text>
          <Animated.FlatList
            data={count}
            keyExtractor={(item, index) => {
              return `${item}${index}`;
            }}
            contentContainerStyle={{
              paddingTop: 70,
              zIndex: 2,
              paddingHorizontal: itemSize / 3,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.xPos,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            horizontal
            pagingEnabled
            bounces={false}
            decelerationRate={0}
            snapToInterval={itemSize}
            scrollEventThrottle={16}
            renderItem={({item, index}) => {
              const size = this.xPos.interpolate({
                inputRange: [
                  (index - 1) * itemSize,
                  index * itemSize,
                  (index + 1) * itemSize,
                ],
                outputRange: [1, 1.2, 1],
                extrapolate: 'clamp',
              });
              const transy = this.xPos.interpolate({
                inputRange: [
                  (index - 1) * itemSize,
                  index * itemSize,
                  (index + 1) * itemSize,
                ],
                outputRange: [0, -30, 0],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  style={{
                    width: itemSize,
                    height: 250,
                    alignSelf: 'center',
                    transform: [{translateY: transy}, {scale: size}],
                  }}>
                  <View style={{marginHorizontal: spacing, padding: spacing}}>
                    <Image
                      style={{
                        height: '100%',
                        borderRadius: 20,
                      }}
                      source={{
                        uri: 'https://source.unsplash.com/random/600x900',
                        //   uri: item,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </Animated.View>
              );
            }}
          />
          <TouchableHighlight
            style={{
              width: 150,
              height: 50,
              backgroundColor: '#ecb5ec',
              alignSelf: 'center',
              paddingHorizontal: 20,
              borderRadius: 30,
            }}>
            <Text
              style={{
                height: '100%',
                textAlignVertical: 'center',
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              OPEN DRAWER
            </Text>
          </TouchableHighlight>
        </View>
        <Animated.View
          style={{
            padding: 20,
            paddingTop: 0,
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: '#BCD9E7',
            height: height,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            transform: [{translateY: this.modalPos}],
          }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={{
              width: '100%',
              height: 50,
              paddingVertical: 15,
              justifyContent: 'space-around',
              alignItems: 'center',
              zIndex: 10,
            }}>
            <View
              style={{
                width: 35,
                height: 3,
                backgroundColor: 'black',
              }}
            />
            <View
              style={{
                width: 35,
                height: 3,
                backgroundColor: 'black',
              }}
            />
            <View
              style={{
                width: 35,
                height: 3,
                backgroundColor: 'black',
              }}
            />
          </Animated.View>
          <Animated.FlatList
            contentContainerStyle={{
              alignItems: 'center',
            }}
            keyExtractor={(item, index) => {
              console.log(item + index + '----');
              return `${item}${index}`;
            }}
            data={images}
            renderItem={({item, index}) => {
              return (
                <Image
                  style={{
                    width: width * 0.9,
                    height: 200,
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                  source={{uri: item}}
                  resizeMode="cover"
                />
              );
            }}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
