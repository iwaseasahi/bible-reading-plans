import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Provider as PaperProvider } from 'react-native-paper';

import { TestamentScreen } from './src/screens/Testament';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Testament"
            component={TestamentScreen}
            options={{
              tabBarIcon: () => <Ionicons name="book" size={32} color="blue" />,
              tabBarLabel: () => {return null},
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
