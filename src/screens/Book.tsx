import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { List } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import firebaseApp from '../initializers/Firebase';

type Books = {
  id: number;
  testamentId: number;
  name: string;
}[]

type Route = {
  params: {
    name: string;
    testamentId: number;
  }
}

export const BookScreen = ({ route }: { route: Route }) => {
  const { testamentId } = route.params;
  const [books, setBooks] = useState<Books>([]);
  const data: Books = books.filter(book => book.testamentId === testamentId);

  const navigation = useNavigation();

  useEffect(() => {
    firebaseApp.database().ref('books').once('value').then((snapshot) => {
      setBooks(snapshot.val())
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('chapter', {
              name: item.name,
              bookId: item.id,
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
