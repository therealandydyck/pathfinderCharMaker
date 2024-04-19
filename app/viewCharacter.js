/**
 * \file    ViewCharacter.js
 * \author  Andy Dyck
 * \date    2024-04-15
 * \brief   screen for viewing character information
 */

import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../styles/stylesheet';
import Styles from '../styles/page-styles';
import * as SQLite from 'expo-sqlite';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [db, setDb] = useState(null);
  const [updateItems, forceUpdate] = useState(0);
  const [items, setItems] = useState([]);

  const { id } = useLocalSearchParams();

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
    return () => db ? db.closeAsync : undefined;
  }, [])

  // update when the database changes [db, updatecharsheets]
  useEffect(() => {
    if (db) {
      db.transaction(
        (tx) => {
          tx.executeSql('select * from charsheets where id =?', [id],
            (_, { rows: { _array } }) => { setItems(_array) });
        }
      )
    }
  }, [db, updateItems])






  return (
    <View style={styles.container}>
      <View style={{ flex: 0.3, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'left' }} >
          <Pressable
            style={Styles.button}
            onPress={() => {
              router.navigate({ pathname: '/' })
              db ? db.closeAsync : undefined;
            }}
          >
            <Text >Back to Home screen</Text>
          </Pressable>
        </View>
        <View style={{ justifyContent: 'left' }} >
          <Pressable
            style={Styles.button}
            onPress={() => {
              router.navigate({ pathname: 'editViewCharacter' })
              db ? db.closeAsync : undefined;
            }}
          >
            <Text >Back to Sheet View</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.heading}>Character Sheet</Text>
      <View>
        <Link key={id} href={{ pathname: 'editCharacter', params: { id } }} asChild style={{ marginBottom: 50 }}>
          <Pressable
            style={Styles.button}
          >
            <Text>Edit Character Sheet</Text>
          </Pressable>
        </Link>
      </View>
      <ScrollView style={styles.listArea}>
        {items.map(
          ({ id, name, race, background, charClass, multiclass, skills, feats, strength, dexterity, constitution, intelligence, wisdom, charisma }) => {
            return (
              <View key={id}>
                <View style={styles.flexRow} >
                  <Text>Character Name: {name}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text>Race: {race}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text>Background: {background}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text>Class: {charClass}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text>Multi-class: {multiclass}</Text>

                </View>
                <View style={styles.flexRow}>
                  <Text>Skills (skill name followed by value separated by a comma): </Text>
                </View>
                <View style={styles.flexRow} >
                  <Text>{skills}</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text>Feats (feat name followed by value separated by a comma): </Text>
                </View>
                <View style={styles.flexRow} >
                  <Text>{feats}</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text >Strength: {strength}</Text>


                  <Text >Dexterity: {dexterity}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text >Constitution: {constitution}</Text>


                  <Text >Intelligence: {intelligence}</Text>

                </View>
                <View style={styles.flexRow} >
                  <Text >Wisdom: {wisdom}</Text>


                  <Text >Charisma: {charisma}</Text>

                </View>
              </View>
            )
          }
        )}


      </ScrollView>
    </View>
  );
}  