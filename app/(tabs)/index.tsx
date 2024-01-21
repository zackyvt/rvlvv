/*import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Onee</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}*/
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Link } from "expo-router"
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box, Button, IconButton, Avatar, Alert, VStack, Skeleton} from "native-base";
import { TextProps } from '../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Note(props: any) {
    return (
      <Box flex={1} flexDirection="row" padding="3" bg="green" borderColor="coolGray.200" borderWidth="1" rounded="sm" justifyContent="space-between" marginBottom={2}>
      <Box flex={1} flexDirection="row">
      <Avatar bg={stringToColour(props.note.category)} size={8}>{props.note.category[0]}</Avatar>
      <Box flex={1} flexDirection="column" marginLeft={3}>
      <Text fontWeight="bold">{props.note.name}</Text>
      <Link href={{
          pathname: '/modal',
          params: {id: props.note.id }
        }}>
        <Text fontSize={10} color="lightBlue.600" underline={true}>Open this note 🤫</Text>
      </Link>
      </Box>
      </Box>
      <IconButton onPress={props.delete} icon={<MaterialIcons name="delete" color="#e74c3c" size={20}/>} padding="0" margin="0" />
      </Box>
    )
  }

type Note = {
    id: number;
    name: string;
    contents: string;
    category: string;
  }


const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

export default function App() {
  const [notes, setNotes] = useState(null as Note[])
  const [count, setCount] = useState(0)

  useEffect(() => {
    AsyncStorage.getItem('notes').then((value) => {
    if (value == null) {
      value = "[]"
    } 
    setNotes(JSON.parse(value as string))
  })
    AsyncStorage.getItem('count').then((value) => {
      if (value == null) {
          value = "0"
      }
      setCount(Number(value))
    })

  }, [])

  const newNote = () => {
      setNotes([...notes, {
          id: count,
          name: "new note #" + count,
          contents: "",
          category: "General", 
        }])
      setCount(count + 1)
    };

  useEffect(() => {
      AsyncStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]);

  useEffect(() => {
      AsyncStorage.setItem("count", count.toString())
    }, [count])

  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" padding="5" paddingTop="3" flexDirection="column" justifyContent="space-between">
        <Box maxHeight="80%" flex={1}>
       { notes === null ?
        <Skeleton rounded="md" flexGrow={1}/> :
        <ScrollView>
          { notes.length == 0 ? 
          <Alert flexGrow={1} padding={4} flex={1} flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
          <VStack marginLeft={3}>
          <Text fontWeight="bold" fontSize="md">No notes?</Text>
          <Text fontSize="sm">You don't have any notes right now 😕</Text>
          </VStack>
          </Alert>
          : 
          <>
          { notes.map((note) => 
          <Note key={note.id} note={note} delete={() => setNotes(notes.filter(x => x.id != note.id))}></Note>)}
          </>}
        </ScrollView>
       }
        </Box>
        <Box marginTop={5}> 
          <Button onPress={newNote} bg="green.600" _pressed={{ bg: "green.700" }} marginBottom="2">Lezz make a new note 👀</Button>
          <Button onPress={() => {setNotes([]); setCount(0)}} _pressed={{ bg: "red.700" }} bg="red.600">Delete everything ⚠️</Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 1,
    width:100,
    backgroundColor: '#0553',
  },
});

