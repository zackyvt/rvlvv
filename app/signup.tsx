import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { TextArea, Text, Box, Input, NativeBaseProvider, Button, FormControl, Select, Skeleton, ScrollView, VStack } from 'native-base'
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, Link} from "expo-router"
import { TextInput } from 'react-native-gesture-handler';

export default function SignUpScreen() {
  const RichText = useRef();

  return (
  <NativeBaseProvider>
    <VStack flex={1} backgroundColor="white" padding={5}>
      <FormControl isRequired>
        <FormControl.Label _text={{
        bold: true
      }}>Username</FormControl.Label>
        <Input placeholder="JohnTheNotetaker" />
        <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired marginTop={3}>
        <FormControl.Label _text={{
        bold: true
      }}>Secret password</FormControl.Label>
        <Input placeholder="Its a secret 🤫" type="password" />
        <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>
        <Button marginBottom={3} marginTop={5}>Gimme Account</Button>
      <Link href="/login">
        <Text underline>Already have an account?? Lets log you in</Text>
      </Link>
    </VStack>
  </NativeBaseProvider>
  ) 
}
