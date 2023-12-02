import React, { createContext, useEffect, useState } from 'react'
import { db } from '../db';
const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const updateDarkMode = (newDarkModeValue) => {
        setDarkMode(newDarkModeValue);
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM settings',
                    [],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            tx.executeSql(
                                'UPDATE settings SET theme = ? WHERE id = 1;',
                                [newDarkModeValue ? 1 : 0], () => {
                                    console.log('Theme updated');
                                }
                            );
                        }
                        else {
                            tx.executeSql(
                                'INSERT INTO settings (theme) VALUES (?);',
                                [newDarkModeValue ? 1 : 0], () => {
                                    console.log('Theme updated');
                                }

                            )
                        }
                    });
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    const updateFontSize = (newFontSizeValue) => {
        setFontSize(newFontSizeValue);
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM settings',
                    [],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            tx.executeSql(
                                'UPDATE settings SET fontsize = ? WHERE id = 1;',
                                [newFontSizeValue], () => {
                                    console.log('FontSize updated');
                                }
                            );
                        }
                        else {
                            tx.executeSql(
                                'INSERT INTO settings (fontsize) VALUES (?);',
                                [newFontSizeValue], () => {
                                    console.log('FontSize updated');
                                }
                            )
                        }
                    });
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchDataFromDatabase = () => {
            try {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM settings', [], (tx, results) => {
                        if (results.rows.length > 0) {
                            const { theme, fontsize } = results.rows.item(0);
                            setDarkMode(theme === 1);
                            setFontSize(fontsize);
                            return;
                        } else {
                            setDarkMode(false);
                            setFontSize(16);
                            return;
                        }
                    });
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataFromDatabase();
        console.log('SettingsContext fetched');
    }, []);
    return (
        <SettingsContext.Provider value={{ darkMode, updateDarkMode, fontSize, updateFontSize }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsContext, SettingsProvider };
