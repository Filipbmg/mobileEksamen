import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { firebaseAuth } from '../services/firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebaseAuth;

    async function signIn() {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Bekræftet")
        } catch (error) {
            console.log("Login Fejl: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    async function signUp() {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Registrering Bekræftet")
            alert('Registrering Bekræftet');
        } catch (error) {
            console.log("Registreringsfejl: " + error.message)
            alert("Registreringsfejl: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder='Email'
                style={styles.input}
            />

            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder='Password'
                style={styles.input}
            />
            {loading ? (
                <ActivityIndicator size='large' color='0000ff'/>)
                : (
                    <>
                    <Button title='Login' onPress={signIn}/>
                    <Button title='Sign Up' onPress={signUp}/>
                    </>
                )
            }    
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
  });
  