// import { View, Text } from 'react-native';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import Router from './Router';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Router />
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useState, useRef, useEffect } from 'react';
import { Button, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(false);
  const [listTodo, setListTodo] = useState([]);
  const refUpdated = useRef(false);
  const refInput = useRef();

  // console.log({ show });
  const onChange = (event, selectedDate) => {
    console.log('onchange', { nilaiRef: refUpdated.current });
    const currentDate = selectedDate;
    setDate(currentDate);
    if (mode === 'date') {
      showTimepicker();
    } else {
      console.log('ISI TEKS', { text });
      if (text && !refUpdated.current) {
        refUpdated.current = true;
        setListTodo((nilaiTodoSekarang) => [...nilaiTodoSekarang, { date: currentDate, text }]);
        setText('');
      }
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const addTodo = () => {
    // minta input tanggal
    if (text) {
      refUpdated.current = false;
      showDatepicker();
    }
  };

  const focusToInput = () => {
    refInput.current.focus();
  };

  console.log({ ref: refInput.current });

  const blurFromInput = () => {
    refInput.current.blur();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={focusToInput} title="FOKUS ke Input" />
      <Button onPress={blurFromInput} title="BLUR Input" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', paddingHorizontal: 5 }}
      >
        {listTodo.map(({ text, date }) => (
          <View style={{ height: 100, backgroundColor: 'green', marginVertical: 5 }}>
            <Text>{text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          ref={refInput}
          value={text}
          onChangeText={setText}
          style={{
            width: '80%',
            padding: 5,
            backgroundColor: 'gray',
            color: 'black',
            height: 100,
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity
          onPress={addTodo}
          style={{
            backgroundColor: 'blue',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
