import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import {connect} from 'react-redux';
import PopularItem from '../common/PopularItem';

import NavigationUtil from '../navigator/NavigationUtil';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';

const URL = 'https://api.github.com/search/repositories?q=topic:';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

const Popular = props => {
  const topTabNames = ['Java', 'Android', 'IOS', 'React Native', 'PHP'];
  const generateTabs = () => {
    const tabs = {};
    topTabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        // eslint-disable-next-line no-shadow
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
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
  let statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  };
  return (
    <View style={{flex: 1, marginTop: 30}}>
      <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
      />
      <TopTab />
    </View>
  );
};

const PopularTab = props => {
  const {tabLabel} = props;
  useEffect(() => {
    loadData();
  }, []);

  const loadData = (loadMore) => {
    const url = genFetchUrl(tabLabel);
    props.onRefreshPopular(tabLabel, url);
  };

  const genFetchUrl = key => {
    return URL + key + QUERY_STR;
  };

  const listData = props.popular[tabLabel] || {items: [], isLoading: false};

  const renderItem = data => {
    return (
      <View>
        <PopularItem item={data.item} />
        {/* <Text>111</Text> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={listData.items}
        renderItem={data => renderItem(data)}
        keyExtractor={item => '' + item.id}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={listData.isLoading}
            onRefresh={() => {
              loadData();
            }}
            tintColor={THEME_COLOR}
          />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshPopular(storeName, url)),
  onLoadMorePopular: (storeName, url) =>
    dispatch(actions.onLoadMorePopular(storeName, url)),
});

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default connect()(Popular);
