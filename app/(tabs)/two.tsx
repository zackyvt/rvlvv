import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Box, Button, Input, NativeBaseProvider, Text, TextArea } from 'native-base';
import { useState } from 'react'

export default function TabTwoScreen() {
  const [question, setQuestion] = useState("")
  const [asked, setAsked] = useState(false);
  const [answer, setAnswer] = useState("You haven't asked me anything 😞 \n")

  return (
    <NativeBaseProvider>
      <Box flex={1} bgColor="white" padding={5} paddingTop={3}> 
        <Text fontWeight="bold" marginBottom={3} >Mr App answers questions about your notes </Text>
        <Input placeholder="Ask Mr App a question..." value={question == "" ? null : question} onChangeText={(t) => setQuestion(t)}></Input>
        <Button marginTop={3} isDisabled={question == ""} isLoading={asked} onPress={e => setAsked(true)}>Ask!</Button>

        <Text fontWeight="bold" marginTop={7}>Mr App's Brain</Text>
        <TextArea autoCompleteType={null} flexGrow={1} marginTop={3} fontSize={14} value={asked ? "Mr App is reading your notes and thinking of a reply..." : answer}></TextArea>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
