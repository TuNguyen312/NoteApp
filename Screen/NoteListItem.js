import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function NoteListItem({ title, content, onPress, onDelete, darkMode, fontSize }) {
    const iconColor = darkMode ? '#fff' : '#4d4d4d';
    return (
        <View style={[styles.container, darkMode && { backgroundColor: '#1a1a1a' }]} >
            <TouchableOpacity style={[styles.noteTouchable, darkMode && { borderColor: '#fff' }]} onPress={onPress}>
                <View style={styles.noteContainer}>
                    <Text style={[styles.title, darkMode && { color: '#fff' }, { fontSize: fontSize + 5 }]}>{title}</Text>
                    <Text style={[styles.content, darkMode && { color: '#fff' }, { fontSize: fontSize }]}>{content}</Text>
                </View>
                <TouchableOpacity style={styles.iconContainer} onPress={onDelete}>
                    <Ionicons name='trash-outline' size={fontSize + 5} color={iconColor} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    noteTouchable: {
        paddingVertical: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    iconContainer: {
        marginRight: 20,
        position: 'absolute',
        left: 300,
    },
    noteContainer: {
        paddingLeft: 15,
        marginRight: 50,
    },
    title: {
        fontWeight: 'bold',
        color: '#4d4d4d',
    },
    content: {
        color: '#4d4d4d',
    },
});

