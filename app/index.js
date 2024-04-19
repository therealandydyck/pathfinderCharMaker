import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import Styles from "../styles/page-styles";

export default function Page() {
    return (
        <View style={Styles.page}>
            <Text style={{ fontSize: 28 }}>Pathfinder Character Creator</Text>
            <View style={Styles.instructionsBox}>
                <Text style={Styles.instructionText}></Text>
                <Text style={Styles.text}></Text>
            </View>

            <Pressable style={Styles.button}>
                <Link href="/createCharacter">Create Character</Link>
            </Pressable>
            <Pressable style={Styles.button}>
                <Link href="/editViewCharacter">Edit/View Character</Link>
            </Pressable>
            <Pressable style={Styles.button}>
                <Link href="/deleteCharacter">Delete Character</Link>
            </Pressable>

        </View>
    )
}