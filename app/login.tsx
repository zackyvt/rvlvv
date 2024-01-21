import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { TextArea, Text, Box, Input, NativeBaseProvider, Button, FormControl, Select, Skeleton, ScrollView, VStack } from 'native-base'
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router"
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen() {
  const RichText = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logMeIn = () => {
    AsyncStorage.setItem("account", username, () => {
      router.replace("/(tabs)")
    });
  }

  return (
  <NativeBaseProvider>
    <VStack flex={1} backgroundColor="white" padding={5}>
      <FormControl isRequired>
        <FormControl.Label _text={{
        bold: true
      }}>Username</FormControl.Label>
        <Input placeholder="JohnTheNotetaker" value={username == "" ? null : username} onChangeText={(t) => setUsername(t)} />
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
        <Input placeholder="Its a secret 🤫" type="password" value={password == "" ? null : password} onChangeText={(p) => setPassword(p)} />
        <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={() => logMeIn()} marginBottom={3} marginTop={5}>Log me in</Button>
      <Link href="/signup">
        <Text underline>Don't have an account?? Lets make you one</Text>
      </Link>
    </VStack>
  </NativeBaseProvider>
  ) 
}
