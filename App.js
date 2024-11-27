import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'
import { firebaseAuth } from './services/firebase';

const Stack = createNativeStackNavigator();
const [user, setUser] = useState(null);

export default function App() {

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
        { user ? (
          <Stack.Screen 
          name = 'HomePage'
          component={HomePage}
          options={{headerShown: false}}
        />) 
        : (
          <Stack.Screen 
            name = 'LoginPage'
            component={LoginPage}
            options={{headerShown: false}}
          />
        )}  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
