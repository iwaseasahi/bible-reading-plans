import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const Stack = createStackNavigator();

type tastaments = {
  id: number;
  text: string;
}[]

const tastaments = [
  {
    id: 1,
    text: '旧約聖書',
  },
  {
    id: 2,
    text: '新約聖書',
  }
]

export const TestamentScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="聖書"
        component={listItems}
      />
    </Stack.Navigator>
  );
}

const listItems = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={tastaments}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <List.Item
              style={styles.item}
              title={item.text}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6e8',
  }
});
