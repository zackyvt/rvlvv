import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Checkbox, Text, Box, Input, NativeBaseProvider, Button, FormControl, Select, Skeleton, ScrollView, VStack } from 'native-base'
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, Link} from "expo-router"
import { TextInput } from 'react-native-gesture-handler';

export default function ProfileScreen() {
    const [username, setUsername] = useState(null);
    const [notesCount, setNotesCount] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("account").then((v) => {
            setUsername(v);
        });
        AsyncStorage.getItem("notes").then((n) => {
            if (n == null) {
                n = "[]"
            }
            setNotesCount(JSON.parse(n).length);
        })
    }, [])

    const signMeOut = () => {
        AsyncStorage.removeItem("account", () => {
            router.replace('/(tabs)')
        });
    }

  return (
  <NativeBaseProvider>
    <VStack flex={1} backgroundColor="white" padding={5} >
        <Box>
        <Text fontWeight={"bold"} fontSize={24}>@{username === null ? "" : username}</Text>
        <Text underline fontSize={16} marginTop={5}>Facts about you:</Text>
        <Checkbox isChecked colorScheme="green" value={''} marginTop={3}>
            You have been a user for 33 days
        </Checkbox>
        <Checkbox isChecked colorScheme="green" value={''} marginTop={3}>
            {"You have " + (notesCount == null ? "_" : String(notesCount)) + " notes in total"}
        </Checkbox>
        <Checkbox isChecked colorScheme="green" value={''} marginTop={3}>
            Most of your notes are school notes 
        </Checkbox>
        </Box>
        <Button onPress={() => signMeOut()} marginTop={10} _pressed={{ bg: "red.700" }} bg="red.600">Sign me out pls</Button>
    </VStack>
  </NativeBaseProvider>
  ) 
}
