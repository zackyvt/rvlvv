import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Box, Button, Input, NativeBaseProvider, Text, TextArea } from 'native-base';
import { useState } from 'react'
import {Calendar, CalendarList, Agenda, AgendaSchedule} from 'react-native-calendars';

export default function CalendarScreen() {
  const [items, setItems] = useState(undefined);

  return (
    <NativeBaseProvider>
      <Agenda items={items as AgendaSchedule} />
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
