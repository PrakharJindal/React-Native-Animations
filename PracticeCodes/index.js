/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AnimatedClock from './AnimatedClock';
import AnimatedLoader from './AnimatedLoader';
import ImageViewer from './ImageViewer&Header';
import InstaImagePreview from './InstaImagePreview';
import InstaImageZoom from './InstaImageZoom';
import MoveBallTouch from './Move BallTouch';
import MoveBallBiggner from './MoveBallBiggner';
import SVGAnimation from './SVGAnimation';
import ImageUpload from './ImageUpload';
import AnimatedHeader from './AnimatedHeader';
import ImageViewer2 from './ImageViewer&Header2';
import TabBar from './TabBar';
import FlatlistScreen from './FlatlistScreen';
import CircularProgress from './CircularProgress';
import ImageShadow from './ImageShadow';
import Animated from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const Stack2 = createSharedElementStackNavigator();

// Screens
import MainScreen from './ShareMainScreen';
import DetailScreen from './ShareDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const list = [
  'InstaImagePreview',
  'FlatlistScreen',
  'SVGAnimation',
  'ImageShadow',
  'CircularProgress',
  'ImageViewer',
  'AnimatedHeader',
  'TabBar',
  'ImageViewer2',
  'AnimatedClock',
  'AnimatedLoader',
  'InstaImageZoom',
  'MoveBallTouch',
  'Share',
];

const getScreen = (u, props) => {
  if (u == 'ImageShadow') {
    return <ImageShadow {...props} />;
  } else if (u == 'CircularProgress') {
    return <CircularProgress {...props} />;
  } else if (u == 'SVGAnimation') {
    return <SVGAnimation {...props} />;
  } else if (u == 'ImageViewer') {
    return <ImageViewer {...props} />;
  } else if (u == 'TabBar') {
    return <TabBar {...props} />;
  } else if (u == 'ImageViewer2') {
    return <ImageViewer2 {...props} />;
  } else if (u == 'AnimatedClock') {
    return <AnimatedClock {...props} />;
  } else if (u == 'InstaImagePreview') {
    return <InstaImagePreview {...props} />;
  } else if (u == 'AnimatedLoader') {
    return <AnimatedLoader {...props} />;
  } else if (u == 'InstaImageZoom') {
    return <InstaImageZoom {...props} />;
  } else if (u == 'MoveBallTouch') {
    return <MoveBallTouch {...props} />;
  } else if (u == 'FlatlistScreen') {
    return <FlatlistScreen {...props} />;
  } else if (u == 'Share') {
    return (
      <Stack2.Navigator
        initialRouteName="List"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack2.Screen name="MainScreen" component={MainScreen} />
        <Stack2.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={(navigation) => ({
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({current: {prog}}) => {
              return {
                cardStyle: {
                  opacity: prog,
                },
              };
            },
          })}
          sharedElementsConfig={(route) => {
            const {data} = route.params;
            return [
              {
                id: `item.${data.id}.photo`,
                animation: 'move',
                resize: 'clip',
                align: 'center-top',
              },
              {
                id: `item.${data.id}.text`,
                animation: 'fade',
                resize: 'clip',
                align: 'left-center',
              },

              {
                id: `item.${data.id}.profilePic`,
                animation: 'move',
                resize: 'clip',
                align: 'left-center',
              },
              {
                id: `item.${data.id}.username`,
                animation: 'fade',
                resize: 'clip',
                align: 'left-center',
              },
              {
                id: `item.${data.id}.readtime`,
                animation: 'fade',
                resize: 'clip',
                align: 'left-center',
              },
            ];
          }}
        />
      </Stack2.Navigator>
    );
  }
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Welcome To Animation Practice
      </Text>
      {list.map((u, i) => {
        return (
          <DrawerItem
            activeTintColor="black"
            label={u}
            labelStyle={{color: 'white'}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate(u)}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 16],
  });
  const rotateZ = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, -0.2],
    extrapolate: 'clamp',
  });
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 60],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/pic.jpg')}
        style={{flex: 1}}
        blurRadius={5}>
        <Drawer.Navigator
          drawerType="slide"
          overlayColor="transparent" // color over screen when drawer is open
          contentContainerStyle={{flex: 1}}
          drawerContentOptions={{
            // Drawer list style
            activeBackgroundColor: 'transparent',
            activeTintColor: 'green',
            inactiveTintColor: 'grey',
          }}
          drawerStyle={styles.drawerStyles}
          sceneContainerStyle={{
            backgroundColor: 'transparent',
          }} // Outer area of Screen whene drwer is open
          drawerContent={(props) => {
            setProgress(props.progress);
            return <CustomDrawerContent {...props} />;
          }}>
          {list.map((u, i) => {
            return (
              <Drawer.Screen
                name={u}
                children={(props) => {
                  return (
                    <Animated.View
                      style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: borderRadius,
                        transform: [{scale}, {rotateZ}, {translateX}],
                      }}>
                      {getScreen(u, props)}
                    </Animated.View>
                  );
                }}
              />
            );
          })}
          <Drawer.Screen
            name={'Shared'}
            children={(props) => {
              return (
                <Animated.View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: borderRadius,
                    transform: [{scale}, {rotateZ}, {translateX}],
                  }}>
                  <Stack.Navigator
                    initialRouteName="List"
                    screenOptions={{
                      headerShown: false,
                    }}>
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                    <Stack.Screen
                      name="DetailScreen"
                      component={DetailScreen}
                      options={(navigation) => ({
                        headerBackTitleVisible: false,
                        cardStyleInterpolator: ({current: {prog}}) => {
                          return {
                            cardStyle: {
                              opacity: prog,
                            },
                          };
                        },
                      })}
                      sharedElementsConfig={(route) => {
                        const {data} = route.params;
                        return [
                          {
                            id: `item.${data.id}.photo`,
                            animation: 'move',
                            resize: 'clip',
                            align: 'center-top',
                          },
                          {
                            id: `item.${data.id}.text`,
                            animation: 'fade',
                            resize: 'clip',
                            align: 'left-center',
                          },

                          {
                            id: `item.${data.id}.profilePic`,
                            animation: 'move',
                            resize: 'clip',
                            align: 'left-center',
                          },
                          {
                            id: `item.${data.id}.username`,
                            animation: 'fade',
                            resize: 'clip',
                            align: 'left-center',
                          },
                          {
                            id: `item.${data.id}.readtime`,
                            animation: 'fade',
                            resize: 'clip',
                            align: 'left-center',
                          },
                        ];
                      }}
                    />
                  </Stack.Navigator>
                </Animated.View>
              );
            }}
          />
        </Drawer.Navigator>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {width: '90%', backgroundColor: '#00000070', marginVertical: 5},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
