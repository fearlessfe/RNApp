import React from 'react';
import {PropTypes} from 'prop-types';
import {
  ViewPropTypes,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

const NavigationBar = props => {
  const {style} = props;
  return (
    <View style={[styles.container, style]}>
      {statusBar(props)}
      {content(props)}
    </View>
  );
};

const statusBar = props => {
  const {hidden} = props;
  return hidden ? null : (
    <View>
      <StatusBar {...props.statusBar} />
    </View>
  );
};

const titleViewBar = props => {
  const {titleView, title} = props;
  return titleView ? (
    titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {title}
    </Text>
  );
};

const content = props => {
  const {hide, leftButton, rightButton, titleLayoutStyle} = props;
  return hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(leftButton)}
      <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
        {titleViewBar(props)}
      </View>
      {getButtonElement(rightButton)}
    </View>
  );
};

const getButtonElement = button => {
  return <View style={styles.navBarButton}>{button ? button : null}</View>;
};

NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarShape),
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
};

NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#296f33',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : 0,
  },
});

export default NavigationBar;
