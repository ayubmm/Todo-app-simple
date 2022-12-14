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
import { Button, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(false);
  const [listTodo, setListTodo] = useState([]);
  const refInput = useRef();

  // console.log({ show });
  const onChange = (event, selectedDate) => {
    // console.log({ event });
    const currentDate = selectedDate;
    // jadiin show false
    setShow(false);
    // kalau cancel maka jangan tambahkan todo maupun tanya waktu
    if (event.type === 'dismissed') return;
    setDate(currentDate);
    if (mode === 'date') {
      // baru time picker di show
      showTimepicker();
    } else {
      setListTodo((nilaiTodoSekarang) => [...nilaiTodoSekarang, { date: currentDate, text }]);
      setText('');
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
      // refUpdated.current = false;
      showDatepicker();
    }
  };

  const focusToInput = () => {
    refInput.current.focus();
  };

  const blurFromInput = () => {
    refInput.current.blur();
  };

  const deleteTodo = (index) => () => {
    Alert.alert('Hapus Todo', 'Anda yakin untuk menghapus?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => setListTodo(listTodo.filter((_, i) => i !== index)),
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={focusToInput} title="FOKUS ke Input" />
      <Button onPress={blurFromInput} title="BLUR Input" />
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
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
      >
        {listTodo.map(({ text, date }, idx) => (
          <View
            key={idx}
            style={{
              height: 100,
              backgroundColor: 'white',
              marginVertical: 5,
              padding: 8,
              borderRadius: 10,
              elevation: 5,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'gray', marginBottom: 5, fontSize: 12 }}>
                {date.toLocaleString()}
              </Text>
              <Text style={{ color: 'black' }}>{text}</Text>
            </View>
            <TouchableOpacity
              onPress={deleteTodo(idx)}
              style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                position: 'absolute',
                right: 10,
                bottom: 10,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>HAPUS</Text>
            </TouchableOpacity>
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
            backgroundColor: '#ededed',
            color: 'black',
            height: 100,
            textAlignVertical: 'top',
            elevation: 5,
            borderWidth: 0.5,
            borderColor: '#ededed9c',
          }}
          placeholder="write your todo..."
          placeholderTextColor="gray"
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
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// lagi 2

export default App;
