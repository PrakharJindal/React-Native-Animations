import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

export default class ImageShadow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          onPress={() => {
            this.props.navigation.openDrawer();
          }}>
          Open
        </Text>
        <View
          style={{
            width: '80%',
            height: 500,
            overflow: 'hidden',
          }}>
          <Image
            style={{
              borderRadius: 30,
              opacity: 0.2,
              width: '100%',
              height: 500,
              position: 'absolute',
              transform: [{translateY: 10}],
            }}
            blurRadius={1}
            resizeMode="contain"
            source={{
              uri:
                'https://d3nn873nee648n.cloudfront.net/HomeImages/Festivals-and-Occasions.jpg',
            }}
          />
          <Image
            style={{
              borderRadius: 30,
              width: '100%',
              height: 500,
            }}
            resizeMode="contain"
            source={{
              uri:
                'https://d3nn873nee648n.cloudfront.net/HomeImages/Festivals-and-Occasions.jpg',
            }}
          />
        </View>
      </View>
    );
  }
}
