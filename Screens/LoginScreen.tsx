import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import EyeIcon from '../assets/eyeicon.svg'; 
import ErrorIcon from '../assets/error.svg'; 
import { Toast } from 'toastify-react-native';
import styles from '../styleSheets/loginscreenStyle';
import { emailregex } from '../utils/regex';
import { setLoginState } from '../Storage/storage';

enum FormFields {
  Username = 'username',
  Email = 'email',
  Password = 'password',
}


enum ErrorMessages {
  RequiredEmail = 'Email is required',
  InvalidEmail = 'Invalid email address',
  RequiredPassword = 'Password is required',
  PasswordMinLength = 'Password must be at least 6 characters long',
}


enum Placeholders {
  EmailPlaceholder = 'Enter your email',
  PasswordPlaceholder = 'Enter your password',
  LoginTitle = 'Login',
  AppPlaceholder = 'App ki adalat',
  LoginButton = 'Login',
}

interface FormData {
  email: string;
  password: string;
}

interface SignupScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoginState(true);
    navigation.navigate('Document');
    Toast.success('Login Successful');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{Placeholders.LoginTitle}</Text>
        <Text style={styles.placeholder}>{Placeholders.AppPlaceholder}</Text>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name={FormFields.Email}
            rules={{
              required: ErrorMessages.RequiredEmail,
              pattern: {
                value: emailregex,
                message: ErrorMessages.InvalidEmail,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputField}>
                <Text style={styles.label}>Email</Text>
                <View style={[styles.inputContainer, errors.email && styles.errorBorder]}>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={Placeholders.EmailPlaceholder}
                    keyboardType="email-address"
                  />
                </View>
                {errors.email && (
                  <View style={styles.errorContainer}>
                    <ErrorIcon width={20} height={20} style={styles.warningIcon} />
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  </View>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name={FormFields.Password}
            rules={{
              required: ErrorMessages.RequiredPassword,
              minLength: {
                value: 6,
                message: ErrorMessages.PasswordMinLength,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputField}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputContainer, errors.password && styles.errorBorder]}>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={Placeholders.PasswordPlaceholder}
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <View style={styles.eyeIconContainer}>
                      <EyeIcon width={24} height={24} fill="black" style={styles.eyeIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <View style={styles.errorContainer}>
                    <ErrorIcon width={20} height={20} style={styles.warningIcon} />
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  </View>
                )}
              </View>
            )}
          />

          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{Placeholders.LoginButton}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
