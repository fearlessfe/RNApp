import React from 'react';
import {View, Text, Button} from 'react-native';

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
          console.log(props.navigation);
          props.navigation.setParams({
            theme: {
              tintColor: 'red',
              updateTime: new Date().getTime(),
            },
          });
        }}
      />
    </View>
  );
};

export default Trending;
