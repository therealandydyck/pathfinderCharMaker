/**
 * \file    Item pressable js file
 * \author  Andy D / Stephen Graham
 * \date    20240307 - modified 2024-04-16
 * \brief   a component that can be called multiple times to make a pressable in the main app
 */
import { Pressable, Text } from "react-native";
import styles from '../styles/stylesheet'

export default Item = ({charId, name, race, charClass, onPress, onLongPress}) => {


    return (
        <Pressable 
            style={styles.itemStyle}
            onPress={onPress}
        >
            <Text style={[styles.itemText]}># {charId} Name:{name} Race:{race} Main Class:{charClass}</Text>
        </Pressable>
    )
}