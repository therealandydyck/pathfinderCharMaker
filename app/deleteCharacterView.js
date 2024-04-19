/**
* \file    deleteCharacterView.js
* \author  Andy Dyck
* \date    2024-04-15
* \brief   screen for reviewing character information before deleting
*/

import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../styles/stylesheet';
import Styles from '../styles/page-styles';
import * as SQLite from 'expo-sqlite';
import { useRouter, useLocalSearchParams } from 'expo-router';

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


        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql('select * from charsheets', [],
                        (_, { rows: { _array } }) => { setItems(_array) });
                    tx.executeSql('select * from charsheets', [],
                        (_, { rows }) => console.log(JSON.stringify(rows)));
                    (_, error) => {
                        console.log(error);
                        return true;
                    }
                }
            )
        }

        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists charsheets (id integer primary key not null, name text, race text, background text, charClass text, multiclass text, skills text, feats text, strength int, dexterity int, constitution int, intelligence int, wisdom int, charisma int);"
            )
        })

        // console.log(db);

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


    const delRecord = (id) => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from charsheets where id =?", [id])
            },

            (_, error) => {
                console.log(error);
                return true;
            },
            forceUpdate(f => f + 1),

        )
    }



    return (
        <View style={styles.container}>
            <View style={{ flex: 0.2, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'left' }} >
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            router.navigate({ pathname: '/' })
                        }}
                    >
                        <Text >Back to Home screen</Text>
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'left' }} >
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            router.navigate({ pathname: 'deleteCharacter' })
                        }}
                    >
                        <Text >Back to Sheet View</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={styles.heading}>Character Sheet</Text>
            <Text>Long-Press Delete Button to permanently delete character sheet</Text>
            <View>
                <Pressable
                    style={Styles.button}
                    onLongPress={() => {
                        delRecord(id);
                    }}
                >
                    <Text>Delete Character Sheet</Text>
                </Pressable>
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