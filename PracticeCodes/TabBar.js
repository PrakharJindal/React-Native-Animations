import React, {Component} from 'react';
import {View, Text} from 'react-native';
import TabBar from '@mindinventory/react-native-tab-bar-interaction';
import Feather from 'react-native-vector-icons/Feather';
class TabBarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabBar bgNavBar="white" bgNavBarSelector="white" stroke="skyblue">
          <TabBar.Item
            icon={<Feather name="grid" size={25} />}
            selectedIcon={require('../assets/user.png')}
            title="Tab1"
            screenBackgroundColor={{backgroundColor: '#008080'}}>
            <View>{/*Page Content*/}</View>
          </TabBar.Item>
          <TabBar.Item
            icon={require('../assets/user.png')}
            selectedIcon={require('../assets/user.png')}
            title="Tab2"
            screenBackgroundColor={{backgroundColor: '#F08080'}}>
            <View>{/*Page Content*/}</View>
          </TabBar.Item>
          <TabBar.Item
            icon={require('../assets/user.png')}
            selectedIcon={require('../assets/user.png')}
            title="Tab3"
            screenBackgroundColor={{backgroundColor: '#485d72'}}>
            <View>{/*Page Content*/}</View>
          </TabBar.Item>
        </TabBar>
      </View>
    );
  }
}

export default TabBarScreen;
