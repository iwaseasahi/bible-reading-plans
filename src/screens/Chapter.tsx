import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'

import firebaseApp from '../initializers/Firebase';

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

type Route = {
  params: {
    name: string;
    bookId: number;
  }
}

export const ChapterScreen = ({ route }: { route: Route }) => {
  const { bookId } = route.params;
  const [chapters, setChapters] = useState<Chapters>([]);
  // 選択した書簡の章を抽出する
  const currentChapters: Chapters = chapters.filter(chapter => chapter.bookId === bookId);

  // 章の通読状態を初期値 false で生成する
  const [checkedState, setCheckedState] = useState(
    new Array(currentChapters.length).fill(false)
  );

  // 初回 useEffect で、fetchChapters を実行する
  // chapters の変更をフックして、再度 useEffect が実行される
  // fetchReadChapters を実行して、通読状態をチェックボックスに反映する
  useEffect(() => {
    fetchChapters();
    fetchReadChapters(currentChapters);
  }, [chapters])

  const fetchChapters = async () => {
    await firebaseApp.database().ref('chapters').once('value').then((snapshot) => {
      setChapters(snapshot.val())
    });
  };

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

  const storeReadChapter = (chapter: Chapter) => {
    try {
      AsyncStorage.setItem('readChapters:id:' + chapter.id, String(Date.now()));
    } catch (e) {
      console.log(e);
    }
  };

  const removeReadChapter = (chapter: Chapter) => {
    try {
      AsyncStorage.removeItem('readChapters:id:' + chapter.id);
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
