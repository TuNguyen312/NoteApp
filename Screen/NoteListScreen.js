import { React, useCallback, useState, useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from './SettingsContext';
import NoteListItem from './NoteListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../db';

export default function NoteListScreen() {
    const navigation = useNavigation();
    const { fontSize, darkMode } = useContext(SettingsContext);
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();
    const getData = useCallback(() => {
        try {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM notes', [], (tx, results) => {
                    if (results.rows) {
                        console.log("Query completed");
                        const notesArray = [];
                        const len = results.rows.length;
                        if (len > 0) {
                            for (let i = 0; i < len; i++) {
                                const note = results.rows.item(i);
                                notesArray.push(note);
                            }
                            setNotes(notesArray);
                        }
                        else {
                            setNotes([]);
                        }
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        if (isFocused) {
            getData();
            console.log('Notelist fetched');
        }
    }, [isFocused, getData]);
    const deleteNote = (id) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM notes WHERE id =?', [id], () => {
                getData();
            });
        });
    }
    const appNameFontSize = fontSize !== null ? fontSize + 8 : 26;
    const titleFontSize = appNameFontSize - 2;
    const addNoteIconSize = fontSize !== null ? fontSize + 40 : 16;
    const addIconColor = darkMode ? '#0066ff' : '#ff6600';
    return (
        <View style={[styles.container, darkMode && { backgroundColor: '#1a1a1a' }]}>
            <Text style={[styles.appName, darkMode && { color: '#0066ff' }, { fontSize: appNameFontSize }]}>
                Note App
            </Text>
            <View style={styles.header}>
                <Text style={[styles.allNote, darkMode && { color: '#fff' }, { fontSize: titleFontSize }]}>
                    All notes
                </Text>
                <TouchableOpacity style={styles.addContainer}
                    onPress={() => navigation.navigate('AddNote')}>
                    <Ionicons name='add-circle' size={addNoteIconSize} color={addIconColor} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={notes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <NoteListItem
                        title={item.title}
                        content={item.content}
                        onPress={() => navigation.navigate('EditNote', { note: item })}
                        onDelete={() => deleteNote(item.id)}
                        darkMode={darkMode}
                        fontSize={fontSize}
                    />
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        padding: 20,
    },
    appName: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ff6600',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    allNote: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'gray'
    },
    addContainer: {
        justifyContent: "center",
        alignItems: 'center',

    },
    addNote: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    }
});