import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useAuth } from '../auth/context/AuthProvider';

export const SettingsScreen: React.FC = () => {
  const {user, updateProfile, signOut} = useAuth();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user?.name ?? '');
  const [tempEmail, setTempEmail] = useState(user?.email ?? '');

  const handleOpenEditProfile = () => {
    setTempName(user?.name ?? '');
    setTempEmail(user?.email ?? '');
    setIsEditingProfile(true);
  };

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    const trimmedName = tempName.trim();
    const trimmedEmail = tempEmail.trim();

    if (!trimmedName || !trimmedEmail) {
      Alert.alert(
        'Campos incompletos',
        'Por favor ingresa nombre y correo para continuar.',
      );
      return;
    }

    await updateProfile({name: trimmedName, email: trimmedEmail});
    setIsEditingProfile(false);
  };

  const handleSignOutPress = () => {
  Alert.alert(
    'Cerrar sesión',
    '¿Seguro que quieres cerrar sesión en este dispositivo?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          // No hace falta navegar: RootNavigator cambiará automáticamente a LoginScreen
        },
      },
    ],
  );
};

  const displayName = user?.name ?? 'Usuario invitado';
  const displayEmail =
    user?.email ?? 'Inicia sesión para personalizar tu experiencia';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Ajustes</Text>

          {/* Perfil */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>{displayEmail}</Text>
            </View>

            {user && (
              <TouchableOpacity
                style={styles.profileAction}
                activeOpacity={0.8}
                onPress={handleOpenEditProfile}>
                <Text style={styles.profileActionText}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Cuenta */}
          <SettingsSection title="Cuenta">
            <SettingsRow
              label="Datos personales"
              helper="Nombre, cargo y avatar"
            />
            <SettingsRow
              label="Seguridad"
              helper="Contraseña y factores de autenticación"
            />
            <SettingsRow
              label="Dispositivos conectados"
              helper="Sesiones activas en otros equipos"
            />
          </SettingsSection>

          {/* Notificaciones */}
          <SettingsSection title="Notificaciones">
            <SettingsSwitchRow
              label="Notificaciones push"
              helper="Alertas cuando se asignen o actualicen tus tickets"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />
            <SettingsSwitchRow
              label="Resumen por correo"
              helper="Un resumen diario con tus tickets abiertos"
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />
          </SettingsSection>

          {/* Preferencias */}
          <SettingsSection title="Preferencias">
            <SettingsSwitchRow
              label="Modo oscuro"
              helper="Ajusta el tema según tu preferencia"
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
            <SettingsRow label="Idioma" helper="Español (Latinoamérica)" />
            <SettingsRow label="Formato de fecha" helper="DD/MM/AAAA" />
          </SettingsSection>

          {/* Acerca de */}
          <SettingsSection title="Acerca de TicketDesk">
            <SettingsRow
              label="Términos y condiciones"
              helper="Consulta los términos de uso de la plataforma"
            />
            <SettingsRow
              label="Política de privacidad"
              helper="Cómo protegemos tu información"
            />
            <SettingsRow
              label="Versión de la app"
              helper="TicketDesk Mobile · v1.0.0"
            />
          </SettingsSection>

          {/* Cerrar sesión */}
          {user && (
            <View style={styles.signOutContainer}>
              <TouchableOpacity
                style={styles.signOutButton}
                activeOpacity={0.9}
                onPress={handleSignOutPress}>
                <Text style={styles.signOutText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal editar perfil */}
      <Modal
        visible={isEditingProfile}
        transparent
        animationType="slide"
        onRequestClose={handleCancelEditProfile}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modalContainer}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeaderRow}>
                  <Text style={styles.modalTitle}>Editar perfil</Text>
                  <TouchableOpacity onPress={handleCancelEditProfile}>
                    <Text style={styles.modalClose}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.modalFieldLabel}>Nombre</Text>
                  <TextInput
                    style={styles.modalTextInput}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Nombre completo"
                    placeholderTextColor="#9CA3AF"
                  />

                  <Text style={[styles.modalFieldLabel, {marginTop: 12}]}>
                    Correo electrónico
                  </Text>
                  <TextInput
                    style={styles.modalTextInput}
                    value={tempEmail}
                    onChangeText={setTempEmail}
                    placeholder="Correo"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.modalActionsRow}>
                  <TouchableOpacity
                    style={styles.modalPrimaryButton}
                    activeOpacity={0.9}
                    onPress={handleSaveProfile}>
                    <Text style={styles.modalPrimaryButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalSecondaryButton}
                    activeOpacity={0.8}
                    onPress={handleCancelEditProfile}>
                    <Text style={styles.modalSecondaryButtonText}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

/* --------- COMPONENTES INTERNOS --------- */

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
};

type SettingsRowProps = {
  label: string;
  helper?: string;
};

const SettingsRow: React.FC<SettingsRowProps> = ({label, helper}) => {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8}>
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowLabel}>{label}</Text>
        {helper ? <Text style={styles.rowHelper}>{helper}</Text> : null}
      </View>
      <Text style={styles.rowChevron}>›</Text>
    </TouchableOpacity>
  );
};

type SettingsSwitchRowProps = {
  label: string;
  helper?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const SettingsSwitchRow: React.FC<SettingsSwitchRowProps> = ({
  label,
  helper,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowLabel}>{label}</Text>
        {helper ? <Text style={styles.rowHelper}>{helper}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#FFFFFF' : '#F3F4F6'}
        trackColor={{false: '#D1D5DB', true: '#4F46E5'}}
      />
    </View>
  );
};

/* ---------------- ESTILOS ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  profileAction: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  profileActionText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '500',
  },

  sectionContainer: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  rowHelper: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  rowChevron: {
    fontSize: 20,
    color: '#D1D5DB',
  },

  signOutContainer: {
    marginTop: 8,
  },
  signOutButton: {
    backgroundColor: '#F97373',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    elevation: 6,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalClose: {
    fontSize: 20,
    color: '#4B5563',
  },
  modalBody: {
    marginTop: 4,
  },
  modalFieldLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  modalTextInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  modalActionsRow: {
    marginTop: 16,
  },
  modalPrimaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalPrimaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalSecondaryButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  modalSecondaryButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
