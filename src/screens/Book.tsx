import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { List } from 'react-native-paper';

type Books = {
  id: number;
  testamentId: number;
  name: string;
}[]

const books: Books = [
  {
    id: 1,
    testamentId: 1,
    name: '創世記',
  },
  {
    id: 2,
    testamentId: 1,
    name:  '出エジプト記',
  },
  {
    id: 3,
    testamentId: 1,
    name: 'レビ記',
  },
  {
    id: 4,
    testamentId: 2,
    name: 'マタイによる福音書',
  },
  {
    id: 5,
    testamentId: 2,
    name: 'マルコによる福音書',
  },
  {
    id: 6,
    testamentId: 2,
    name: 'ルカよる福音書',
  },
]

type Route = {
  params: {
    name: string;
    testamentId: number;
  }
}

export const BookScreen = ({ route }: { route:  Route }) => {
  const { testamentId } = route.params;
  const data: Books = books.filter(book => book.testamentId === testamentId);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity>
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
