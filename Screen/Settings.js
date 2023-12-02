//Nguyen Le Hoang Tu 21521613
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { SettingsContext } from './SettingsContext';

export default function Settings() {
    const { darkMode, updateDarkMode, fontSize, updateFontSize } = useContext(SettingsContext);
    const handleOnDarkModeChange = () => {
        const newDarkMode = !darkMode;
        updateDarkMode(newDarkMode);
    };
    const handleOnFontSizeChange = (newFontSize) => {
        updateFontSize(newFontSize);
    };
    return (
        <View style={[styles.container, darkMode && { backgroundColor: '#1a1a1a' }]}>
            <View style={styles.modeContainer}>
                <Text style={[styles.mode, darkMode && { color: '#fff' }, { fontSize: fontSize }]}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={handleOnDarkModeChange}
                />

            </View>
            <View style={styles.modeContainer}>
                <Text style={[styles.fontSize, darkMode && { color: '#fff' }, { fontSize: fontSize }]}>
                    Font Size
                </Text>
                <Text style={[styles.fontSize, darkMode && { color: '#fff' }, { fontSize: fontSize }]}>
                    {fontSize}
                </Text>
            </View>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    step={2}
                    minimumValue={12}
                    maximumValue={36}
                    value={fontSize}
                    onValueChange={(value) => { handleOnFontSizeChange(value); }}
                    minimumTrackTintColor="#33691E"
                    maximumTrackTintColor="#757575"
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    modeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    sliderContainer: {
        height: 40,
        width: '70%',
    },
    slider: {
        width: '100%',
        position: 'absolute',
        left: 70,
        padding: 20,
    },
    mode: {

    },
    fontSize: {

    }
});