import React from 'react';
import {View, Text} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import NavigationUtil from '../navigator/NavigationUtil';

const Popular = () => {
  const TopTab = createAppContainer(
    createMaterialTopTabNavigator({
      PopularTab: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab1',
        },
      },
      PopularTab2: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab2',
        },
      },
    }),
  );
  return (
    <View style={{flex: 1, marginTop: 30}}>
      <TopTab />
    </View>
  );
};

const PopularTab = props => {
  const {tabLabel} = props;
  return (
    <View>
      <Text>{tabLabel}</Text>
      <Text
        onPress={() => {
          NavigationUtil.goPage(
            {
              navigation: NavigationUtil.navigation,
            },
            'Detail',
          );
        }}>
        详情页
      </Text>
    </View>
  );
};

export default Popular;
