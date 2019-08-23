import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

const Trending = props => {
  return (
    <View>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Text>Trending</Text>
      <Button
        title="改变主题色"
        onPress={() => {
          props.onThemeChange('yellow');
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trending);
