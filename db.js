//Nguyen Le Hoang Tu 21521613
import SQLite from 'react-native-sqlite-storage';
export const db = SQLite.openDatabase(
    {
        name: 'notes.db',
        location: 'default',
    },
    () => {
        console.log("DB opened");
    },
    error => {
        console.log(error);
    },
);

