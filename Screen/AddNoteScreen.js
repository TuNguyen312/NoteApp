import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { React, useState, useContext } from 'react';
import { SettingsContext } from './SettingsContext';
import { useNavigation } from '@react-navigation/native';
import { db } from '../db';

export default function AddNoteScreen() {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { darkMode, fontSize } = useContext(SettingsContext);
    const addNote = () => {
        if (title.trim() === '') {

            Alert.alert('Warning', 'please enter a title!'), [
                {
                    text: 'OK',
                },
            ];
        }
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content],
                navigation.goBack());
        });
    };
    const titleHeight = fontSize !== null ? fontSize + 34 : 50;
    const contentHeight = titleHeight + 70;
    const textInputFontSize = fontSize !== null ? fontSize : 16;
    const placeholderTextColor = darkMode ? '#fff' : '#000';
    const iconsSize = fontSize !== null ? fontSize + 24 : 40;
    return (
        <View style={[styles.container, darkMode && { backgroundColor: '#1a1a1a' }]}>
            <TextInput
                style={[styles.noteInput, darkMode && { borderColor: '#fff', color: '#fff' }, { height: titleHeight, fontSize: textInputFontSize }]}
                placeholder='Enter your title'
                placeholderTextColor={placeholderTextColor}
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                style={[styles.noteInput, darkMode && { borderColor: '#fff', color: '#fff' }, { height: contentHeight, fontSize: textInputFontSize }]}
                multiline
                numberOfLines={4}
                placeholder='Enter your note'
                placeholderTextColor={placeholderTextColor}
                value={content}
                onChangeText={text => setContent(text)}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.cross} onPress={() => navigation.goBack()}>
                    <Ionicons name='close-circle' size={iconsSize} color='#ff0000' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.check} onPress={addNote}>
                    <Ionicons name='checkmark-circle' size={iconsSize} color='#00ff00' />
                </TouchableOpacity >

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noteInput: {
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        marginVertical: 10,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    check: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cross: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});


