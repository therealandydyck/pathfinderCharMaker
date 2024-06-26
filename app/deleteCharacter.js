/**
 * \file    deleteCharacter.js
 * \author  Andy Dyck
 * \date    2024-04-15
 * \brief   landing page to delete previously saved characters 
 */

import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../styles/stylesheet';
import Styles from '../styles/page-styles';
import * as SQLite from 'expo-sqlite';
import { Link, useRouter } from 'expo-router';
import Item from '../components/item';



export default function EditViewCharacter() {
    const router = useRouter();
    const [db, setDb] = useState(null);
    const [updateItems, forceUpdate] = useState(0);
    const [items, setItems] = useState([]);



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
                    tx.executeSql('select * from charsheets', [],
                        (_, { rows: { _array } }) => { setItems(_array) });
                }
            )
        }
    }, [db, updateItems])



    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'left' }} >
                <Pressable
                    style={Styles.button}
                    onPress={() => { router.navigate({ pathname: '/' }) }}
                >
                    <Text >Back to Home screen</Text>
                </Pressable>
            </View>
            <View style={{ padding: 20 }} >
                <Text style={styles.heading}>
                    Sheet List
                </Text>
            </View>
            <ScrollView style={styles.listArea}>
                {items.map(
                    ({ id, name, race, charClass }) => {
                        return (
                            <Link key={id} href={{ pathname: 'deleteCharacterView', params: { id: id } }} asChild>
                                <Item charId={id} name={name} race={race} charClass={charClass} />
                            </Link>
                        )
                    }
                )}
            </ScrollView>
        </View>
    );

}
