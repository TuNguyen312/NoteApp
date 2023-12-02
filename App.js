import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import { SettingsProvider } from './Screen/SettingsContext';
import { db } from './db';

export default function App() {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, theme INTEGER, fontsize INTEGER)'
      );
      console.log('Database created');
    });
  }
  catch (error) {
    console.log(error);
  }

  return (
    <SettingsProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SettingsProvider>
  );
}


