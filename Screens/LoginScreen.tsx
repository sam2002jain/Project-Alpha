import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import EyeIcon from '../assets/eyeicon.svg'; 
import ErrorIcon from '../assets/error.svg'; 
import { Toast } from 'toastify-react-native';
import styles from '../styleSheets/loginscreenStyle';
import { emailregex } from '../utils/regex';
import axios from 'axios';

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

//lets complete the app with springboot and sql based backend connectivity to login and save data 
//locally then we can host this backend on vercel for free and get connectivity to the firebase database.

// I am using the springboot with mysql to do validation of the login data with dummy data for now.

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('https://alphabackend-fn3n.onrender.com/api/auth/signin', {
        email: data.email,
        password: data.password
      });

      if (response.data.message === 'Sign in successful') {
        navigation.navigate('Document');
        Toast.success('Login Successful');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Login failed';
        Toast.error(message);
      } else {
        Toast.error('Network error occurred');
      }
    } finally {
      setLoading(false);
    }
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
