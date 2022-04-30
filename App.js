import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import Pantry from './Screens/Pantry';
import Recipes from './Screens/RecipePage';
import NewPantry from './Screens/NewPantry';
import Info from './Screens/Info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import React from 'react';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pantry" component={Pantry} />
          <Stack.Screen name="RecipePage" component={Recipes} />
          <Stack.Screen name="NewPantry" component={NewPantry} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

