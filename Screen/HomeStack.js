import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddNoteScreen from './AddNoteScreen';
import EditNoteScreen from './EditNoteScreen';
import NoteListScreen from './NoteListScreen';
import { SettingsContext } from './SettingsContext';

const Stack = createStackNavigator();

export default function HomeStack() {
    const darkMode = useContext(SettingsContext);
    const headerTextColor = darkMode ? '#fff' : '#000';
    const headerBackgroundColor = darkMode ? '#333333' : '#fff';
    return (
        <Stack.Navigator  >
            <Stack.Screen name='NoteList' component={NoteListScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AddNote' component={AddNoteScreen} options={{ headerTitleStyle: { color: headerTextColor }, headerStyle: { backgroundColor: headerBackgroundColor } }} />
            <Stack.Screen name='EditNote' component={EditNoteScreen} options={{ headerTitleStyle: { color: headerTextColor }, headerStyle: { backgroundColor: headerBackgroundColor } }} />
        </Stack.Navigator>
    );
}

