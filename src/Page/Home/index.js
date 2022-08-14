import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Dummy } from '../../Assets';
import { Schedule } from '../../Component';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Header}>
        <View style={styles.boderPic}>
          <Image source={Dummy} style={styles.pic} />
        </View>
        <View>
          <Text style={styles.title}>Hallo, Agus</Text>
          <Text style={styles.subTitle}>2 Task For Today</Text>
        </View>
      </View>
      <Text></Text>
      <View style={{ flex: 1, marginTop: 0 }}>
        <Schedule />
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#0442D0',
    height: 108,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boderPic: { paddingLeft: 18, paddingRight: 20 },
  pic: { height: 56, width: 56, borderRadius: 56 / 2 },
  title: { fontSize: 15, fontWeight: '500', color: 'white' },
  subTitle: { fontSize: 20, fontWeight: '900', color: '#FABE2C' },
});
