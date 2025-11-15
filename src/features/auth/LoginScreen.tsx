import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {signIn} from './authSlice';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleLogin = () => {
    const userName = name.trim() || 'Invitado';
    dispatch(signIn({userName}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Desk</Text>
      <Text style={styles.subtitle}>Inicia sesión para ver tus tickets</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        placeholderTextColor="#4A5568"
        value={name}
        onChangeText={setName}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#0B1727',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2D3748',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#E2E8F0',
    marginBottom: 16,
  },
});
