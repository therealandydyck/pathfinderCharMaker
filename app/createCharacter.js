/**
 * \file    createCharacter.js
 * \author  Andy Dyck
 * \date    2024-04-15
 * \brief   screen for entering character information and saving it to a database
 */

import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../styles/stylesheet';
import Styles from '../styles/page-styles';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [db, setDb] = useState(null);
  const [updateItems, forceUpdate] = useState(0);
  const [items, setItems] = useState([]);

  // Charater stats variables
  const [name, setName] = useState(null);
  const [race, setRace] = useState(null);
  const [background, setBackground] = useState(null);
  const [charClass, setClass] = useState(null);
  const [multiClass, setMultiClass] = useState(null);
  const [skills, setSkills] = useState(null);
  const [feats, setFeats] = useState(null);
  const [strength, setStrength] = useState(null);
  const [dexterity, setDexterity] = useState(null);
  const [constitution, setConstitution] = useState(null);
  const [intelligence, setIntelligence] = useState(null);
  const [wisdom, setWisdom] = useState(null);
  const [charisma, setCharisma] = useState(null);

  // open database on launch
  useEffect(() => {
    let db = null;
    if (Platform.OS === 'web') {
      db = {
        transaction: () => {
          return {
            executeSql: () => { },
          }
        }
      }
    } else {
      db = SQLite.openDatabase('chars5.db');
    }
    setDb(db);

    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists charsheets (id integer primary key not null, name text, race text, background text, charClass text, multiclass text, skills text, feats text, strength int, dexterity int, constitution int, intelligence int, wisdom int, charisma int);"
      )
    })
    return () => db ? db.closeAsync : undefined;

  }, [])

  // update when the database changes [db, updatecharsheets]
  useEffect(() => {
    if (db) {
      db.transaction(
        (tx) => {
          tx.executeSql('select * from charsheets', [],
            (_, { rows: { _array } }) => { setItems(_array) });
        }
      )
    }
  }, [db, updateItems])

  const createRecord = async () => {
    db.transaction(
      (tx) => {
        tx.executeSql('insert into charsheets (name, race, background, charClass, multiclass, skills, feats, strength, dexterity, constitution, intelligence, wisdom, charisma) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, race, background, charClass, multiClass, skills, feats, strength, dexterity, constitution, intelligence, wisdom, charisma])
        tx.executeSql('select * from charsheets', [],
          (_, { rows }) => console.log(JSON.stringify(rows)));
      },
      null,
      forceUpdate(f => f + 1),
    );
  }




  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Character Creation</Text>
      <ScrollView style={styles.listArea}>
        <View style={styles.flexRow}>
          <Text>Character Name: </Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            placeholder='Enter character name'
            style={styles.input}
            value={name}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Race: </Text>
          <TextInput
            onChangeText={(text) => setRace(text)}
            placeholder='Enter race'
            style={styles.input}
            value={race}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Background: </Text>
          <TextInput
            onChangeText={(text) => setBackground(text)}
            placeholder='Enter background'
            style={styles.input}
            value={background}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Class: </Text>
          <TextInput
            onChangeText={(text) => setClass(text)}
            placeholder='Enter main class'
            style={styles.input}
            value={charClass}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Multi-class: </Text>
          <TextInput
            onChangeText={(text) => setMultiClass(text)}
            placeholder='Enter multiclass (optional)'
            style={styles.input}
            value={multiClass}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Skills /skill name followed by value separated by a comma/: </Text>
        </View>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={(text) => setSkills(text)}
            placeholder='Enter skills'
            style={styles.input}
            value={skills}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Feats /feat name followed by value separated by a comma/: </Text>
        </View>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={(text) => setFeats(text)}
            placeholder='Enter feats'
            style={styles.input}
            value={feats}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Strength: </Text>
          <TextInput
            onChangeText={(text) => setStrength(text)}
            placeholder='Enter strength'
            style={styles.input}
            value={strength}
          />

          <Text>Dexterity: </Text>
          <TextInput
            onChangeText={(text) => setDexterity(text)}
            placeholder='Enter dexterity'
            style={styles.input}
            value={dexterity}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Constitution: </Text>
          <TextInput
            onChangeText={(text) => setConstitution(text)}
            placeholder='Enter constitution'
            style={styles.input}
            value={constitution}
          />

          <Text>Intelligence: </Text>
          <TextInput
            onChangeText={(text) => setIntelligence(text)}
            placeholder='Enter intelligence'
            style={styles.input}
            value={intelligence}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Wisdom: </Text>
          <TextInput
            onChangeText={(text) => setWisdom(text)}
            placeholder='Enter wisdom'
            style={styles.input}
            value={wisdom}
          />

          <Text>Charisma: </Text>
          <TextInput
            onChangeText={(text) => setCharisma(text)}
            placeholder='Enter charisma'
            style={styles.input}
            value={charisma}
          />
        </View>
        <View style={{ marginBottom: 50 }}>

          <Pressable
            style={Styles.button}
            onPress={() => {
              createRecord();
              setName(null);
              setRace(null);
              setBackground(null);
              setClass(null);
              setMultiClass(null);
              setSkills(null);
              setFeats(null);
              setStrength(null);
              setDexterity(null);
              setConstitution(null);
              setIntelligence(null);
              setWisdom(null);
              setCharisma(null);
              router.push('/');
            }}
          >
            <Text>Create Character</Text>
          </Pressable>

        </View>


      </ScrollView>
    </View>
  );
}  