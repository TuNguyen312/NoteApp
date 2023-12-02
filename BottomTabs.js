import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Screen/HomeStack';
//Nguyen Le Hoang Tu 21521613
import Settings from './Screen/Settings';
import { SettingsContext } from './Screen/SettingsContext';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { darkMode } = useContext(SettingsContext);
  const headerTextColor = darkMode ? '#fff' : '#000';
  const headerBackgroundColor = darkMode ? '#333333' : '#fff';
  const iconUnfocusedColor = darkMode ? '#fff' : '#000';
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconname;
          color = focused ? '#188bf0' : iconUnfocusedColor;
          if (route.name === "Home") {
            iconname = "home";
          }
          if (route.name === "Settings") {
            iconname = "settings";
          }
          return <Icon name={iconname} size={30} color={color} />;
        },
        tabBarActiveBackgroundColor: darkMode ? '#000' : "#fff",
        tabBarInactiveBackgroundColor: darkMode ? '#000' : "#fff",
        tabBarLabelStyle: { fontSize: 13 },
      })
      }>
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Tab.Screen name='Settings' component={Settings} options={{ headerTitleStyle: { color: headerTextColor }, headerStyle: { backgroundColor: headerBackgroundColor } }} />
    </Tab.Navigator>
  );
}

