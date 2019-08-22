import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import NavigationUtil from '../navigator/NavigationUtil';

const Popular = props => {
  const topTabNames = ['Java', 'Android', 'IOS', 'React Native', 'PHP'];
  const generateTabs = () => {
    const tabs = {};
    topTabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        // eslint-disable-next-line no-shadow
        screen: props => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  };
  const TopTab = createAppContainer(
    createMaterialTopTabNavigator(generateTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: '#678',
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
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

const styles = StyleSheet.create({
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
  },
});

export default Popular;
