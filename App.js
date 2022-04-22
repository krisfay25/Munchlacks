import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import Pantry from './Screens/Pantry';
import Recipes from './Screens/Recipes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Pantry" component={Pantry}/>
        <Stack.Screen name="RecipePage" component={Recipes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

