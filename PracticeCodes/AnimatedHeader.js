import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

const Width = Dimensions.get('window').width;

class AnimatedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  HEADER_MAX_HEIGHT = 120;
  HEADER_MIN_HEIGHT = 70;
  PROFILE_MAX_HEIGHT = 80;
  PROFILE_MIN_HEIGHT = 40;
  render() {
    //const difclamp = Animated.diffClamp(this.state.scrollY, 0, this.HEADER_MAX_HEIGHT)
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90],
      outputRange: [this.HEADER_MAX_HEIGHT, this.HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const ProfilePicHeight = this.state.scrollY.interpolate({
      inputRange: [0, this.PROFILE_MAX_HEIGHT - this.PROFILE_MIN_HEIGHT],
      outputRange: [this.PROFILE_MAX_HEIGHT, this.PROFILE_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const ProfilePicMargin = this.state.scrollY.interpolate({
      inputRange: [0, this.PROFILE_MAX_HEIGHT - this.PROFILE_MIN_HEIGHT],
      outputRange: [
        this.HEADER_MAX_HEIGHT - this.PROFILE_MAX_HEIGHT / 2,
        this.HEADER_MAX_HEIGHT + 5,
      ],
      extrapolate: 'clamp',
    });

    const headerElevation = this.state.scrollY.interpolate({
      inputRange: [0, this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90],
      outputRange: [0, 10],
      extrapolate: 'clamp',
    });

    const name_S_Opacity = this.state.scrollY.interpolate({
      inputRange: [
        0,
        this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90 - 10,
        this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90,
      ],
      outputRange: [0, 0.2, 1],
      extrapolate: 'clamp',
    });

    const name_L_Opacity = this.state.scrollY.interpolate({
      inputRange: [
        0,
        this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90 - 40,
        this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT + 90,
      ],
      outputRange: [1, 0.05, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'lightskyblue',
            height: headerHeight,
            elevation: headerElevation,
          }}>
          <Animated.View
            style={{
              alignItems: 'center',
              marginTop: 20,
              opacity: name_S_Opacity,
              flexDirection: 'row',
            }}>
            <Animated.View
              style={{
                height: this.PROFILE_MIN_HEIGHT,
                width: this.PROFILE_MIN_HEIGHT,
                borderRadius: this.PROFILE_MAX_HEIGHT / 2,
                borderColor: 'white',
                borderWidth: 3,
                overflow: 'hidden',
                marginLeft: 10,
              }}>
              <Image
                source={require('../assets/user.png')}
                style={{flex: 1, width: null, height: null}}
              />
            </Animated.View>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', left: Width / 2 - 100}}>
              SuperMan
            </Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          style={{flex: 1, elevation: 1}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <Animated.View
            style={{
              height: ProfilePicHeight,
              width: ProfilePicHeight,
              borderRadius: this.PROFILE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: this.HEADER_MAX_HEIGHT - this.PROFILE_MAX_HEIGHT / 2,
              marginLeft: 10,
            }}>
            <Image
              source={require('../assets/user.png')}
              style={{flex: 1, width: null, height: null}}
            />
          </Animated.View>
          <Animated.View style={{marginLeft: 10, opacity: name_L_Opacity}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>SuperMan</Text>
          </Animated.View>
          <Image
            resizeMode="contain"
            style={{width: '100%'}}
            source={require('../assets/user.png')}
          />
        </ScrollView>
      </View>
    );
  }
}

export default AnimatedHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
