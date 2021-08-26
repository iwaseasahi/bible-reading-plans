import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage';

type Chapters = {
  id: number;
  bookId: number;
  number: number;
}[]

type Chapter = {
  id: number;
  bookId: number;
  number: number;
}

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
  // 選択した書簡の章を抽出する
  const currentChapters: Chapters = chapters.filter(chapter => chapter.bookId === bookId);

  // 章の通読状態を初期値 false で生成する
  const [checkedState, setCheckedState] = useState(
    new Array(currentChapters.length).fill(false)
  );

  useEffect(() => {
    fetchReadChapters(currentChapters);
  }, [])

  // ローカルストレージから章の通読状態を state に反映する
  const fetchReadChapters = async (chapters: Chapters) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const updatedCheckedState = chapters.map(chapter => keys.includes('readChapters:id:' + chapter.id));

      setCheckedState(updatedCheckedState);
    } catch(e) {
      console.log(e);
    }
  };

  const handleOnChange = (chapter: Chapter, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    if (updatedCheckedState[position]) {
      storeReadChapter(chapter);
    } else {
      removeReadChapter(chapter);
    }

    setCheckedState(updatedCheckedState);
  };

  const storeReadChapter = async (chapter: Chapter) => {
    try {
      await AsyncStorage.setItem('readChapters:id:' + chapter.id, String(Date.now()));
    } catch (e) {
      console.log(e);
    }
  };

  const removeReadChapter = async (chapter: Chapter) => {
    try {
      await AsyncStorage.removeItem('readChapters:id:' + chapter.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={currentChapters}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <CheckBox
            containerStyle={styles.item}
            textStyle={styles.checkBoxText}
            title={`${item.number}章`}
            checked={checkedState[index]}
            onPress={() => {handleOnChange(item, index)}
            }
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
