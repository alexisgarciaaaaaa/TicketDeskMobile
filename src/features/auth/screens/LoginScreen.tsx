import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthProvider';

export const LoginScreen: React.FC = () => {
  const {signIn} = useAuth();
  const [email, setEmail] = useState('walter.gomez@ticketdesk.io');
  const [name, setName] = useState('Walter Gómez');

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim() || 'Usuario TicketDesk';

    if (!trimmedEmail) {
      return;
    }

    await signIn({
      name: trimmedName,
      email: trimmedEmail,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.content}>
            <Text style={styles.title}>TicketDesk</Text>
            <Text style={styles.subtitle}>
              Inicia sesión para seguir trabajando con tus tickets.
            </Text>

            <View style={styles.card}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.labelTop}>Correo corporativo</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="nombre@empresa.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.9}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>
              TicketDesk Mobile · Acceso interno para equipos de soporte.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  labelTop: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  helperText: {
    marginTop: 16,
    fontSize: 12,
    color: '#9CA3AF',
  },
});
