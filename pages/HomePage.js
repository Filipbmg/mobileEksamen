import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { firebaseAuth } from '../services/firebase';


export default function HomePage({ navigation }) {
    return (
        <View>
            <Button title="Sign Out" onPress={() => firebaseAuth.signOut()}/>
        </View>
    )
}