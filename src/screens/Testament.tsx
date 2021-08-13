import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { List } from 'react-native-paper';

import { BookScreen } from './Book';

const Stack = createStackNavigator();

type tastaments = {
  id: number;
  name: string;
}[]

const tastaments = [
  {
    id: 1,
    name: '旧約聖書',
  },
  {
    id: 2,
    name: '新約聖書',
  }
]

export const TestamentScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='bible'
        component={listItems}
        options={{ title: '聖書' }}
      />
      <Stack.Screen
        name='book'
        component={BookScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

const listItems = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={tastaments}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('book', {
              name: item.name,
              testamentId: item.id,
            })}
          >
            <List.Item
              style={styles.item}
              title={item.name}
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
