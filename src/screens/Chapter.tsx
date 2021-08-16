import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'

type Chapters = {
  id: number;
  bookId: number;
  number: number;
}[]

const chapters: Chapters = [
  {
    id: 1,
    bookId: 1,
    number: 1,
  },
  {
    id: 2,
    bookId: 1,
    number: 2,
  },
  {
    id: 3,
    bookId: 1,
    number: 3,
  },
  {
    id: 4,
    bookId: 2,
    number: 1,
  },
  {
    id: 5,
    bookId: 2,
    number: 2,
  },
  {
    id: 6,
    bookId: 2,
    number: 3,
  },
  {
    id: 7,
    bookId: 3,
    number: 1,
  },
  {
    id: 8,
    bookId: 3,
    number: 2,
  },
  {
    id: 9,
    bookId: 3,
    number: 3,
  },
  {
    id: 10,
    bookId: 4,
    number: 1,
  },
  {
    id: 11,
    bookId: 4,
    number: 2,
  },
  {
    id: 12,
    bookId: 4,
    number: 3,
  },
  {
    id: 13,
    bookId: 5,
    number: 1,
  },
  {
    id: 14,
    bookId: 5,
    number: 2,
  },
  {
    id: 15,
    bookId: 5,
    number: 3,
  },
  {
    id: 16,
    bookId: 6,
    number: 1,
  },
  {
    id: 17,
    bookId: 6,
    number: 2,
  },
  {
    id: 18,
    bookId: 6,
    number: 3,
  },
]

type Route = {
  params: {
    name: string;
    bookId: number;
  }
}

export const ChapterScreen = ({ route }: { route: Route }) => {
  const { bookId } = route.params;
  const data: Chapters = chapters.filter(chapter => chapter.bookId === bookId);

  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <CheckBox
            containerStyle={styles.item}
            textStyle={styles.checkBoxText}
            title={`${item.number}章`}
            checked={checkedState[index]}
            onPress={() => handleOnChange(index)}
          />
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
    backgroundColor: '#fff',
  },
  checkBoxText: {
    fontWeight: 'normal',
    fontSize: 16,
  },
});
