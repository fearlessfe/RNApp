import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {gray} from 'ansi-colors';

const PopularItem = props => {
  const {item} = props;
  if (!item || !item.owner) return null;
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>{item.full_name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Author:</Text>
            <Image
              style={{height: 22, width: 22}}
              source={{uri: item.owner.avatar_url}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Stars:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
          <View>{favoriteButton()}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const favoriteButton = props => (
  <TouchableOpacity
    style={{padding: 6}}
    onPress={() => {}}
    underlayColor={'transparent'}>
    <FontAwesome name={'star-o'} size={26} style={{color: 'red'}} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});

export default PopularItem;
