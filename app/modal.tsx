import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { ScrollView, TextArea, Text, Box, Input, NativeBaseProvider, Button, FormControl, Select, Skeleton } from 'native-base'
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router"
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

type Note = {
  id: number;
  name: string;
  contents: string;
}

export default function ModalScreen(props: any) {
  const params = useLocalSearchParams();
  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const RichText = useRef();

  useEffect(() => {
    AsyncStorage.getItem('notes').then((value) => {
      setNotes(JSON.parse(value as string))
    })
  }, [])

  useEffect(() => {
    setNote(notes.filter((x: any) => x.id == params.id)[0])
  }, [notes])

  const handleChangeName = (event: any) => {
    const value = event.nativeEvent.text;
    setNote({
      id: (note! as any).id, category: note.category,
      name: value, contents: (note! as any).contents
    });
  };

  const handleChangeContents = (value: any) => {
    setNote({
      id: (note! as any).id, category: note.category,
      name: note.name, contents: value
    });
  };

  const handleChangeCategory = (value: any) => {
    setNote({
      id: (note! as any).id,
      name: note.name,
      category: value,
      contents: note.contents
    });
  }

  const saveDetails = () => {
    AsyncStorage.setItem('notes', JSON.stringify([...(notes.filter(x => x.id != params.id)), note]), () => {
      router.replace('/(tabs)')
    })
  }

  return (
    <NativeBaseProvider>
      <Box style={styles.container} flex={1} flexDirection={"column"}>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        {note === null ?
          <Skeleton marginTop={2} flexGrow={1} rounded="sm" borderWidth={1} borderColor="coolGray.200" />
          :
          <Box flex={1} backgroundColor={"white"}>
            <ScrollView>
              <RichEditor
                onChange={(text) => handleChangeContents(text)}
                ref={RichText}
                initialContentHTML={note ? (note as any).contents : ""}
              />
            </ScrollView>
            <RichToolbar
              disabled={false}
              editor={RichText}
            />
          </Box>
        }
        <Box padding="5">
          <Text fontWeight={"bold"}>What's your note's category?</Text>
          {
            note === null ?
              <Skeleton marginTop={2} marginBottom={2} rounded="sm" borderWidth={1} borderColor="coolGray.200" />
              :
              <Select accessibilityLabel="Choose category" placeholder="Choose category" _selectedItem={{
                bg: "teal.600"
              }} marginBottom={2} marginTop={2} onValueChange={handleChangeCategory} selectedValue={note ? (note as any).category : null}>
                <Select.Item label="General 🤷" value="General" />
                <Select.Item label="School 🏫" value="School" />
                <Select.Item label="Work 🛠️ " value="Work" />
                <Select.Item label="Secret 🔐 " value="Secret" />
                <Select.Item label="Personal 💞 " value="Personal" />
              </Select>
          }
          <Text fontWeight={"bold"}>Title of your beloved note</Text>
          {note === null ?
            <Skeleton marginTop={2} rounded="sm" borderWidth={1} borderColor="coolGray.200" />
            :
            <FormControl isInvalid={note != null && note.name == ""}>
              <Input marginTop={2} w="100%" placeholder="Marcus the 5th" value={note ? (note as any).name : null} onChange={handleChangeName} />
              <FormControl.ErrorMessage>
                Your note needs a name 😠
              </FormControl.ErrorMessage>
            </FormControl>
          }

          <Button marginTop={3} onPress={saveDetails} isDisabled={note == null || note.name == ""}>Save pls</Button>
        </Box>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
