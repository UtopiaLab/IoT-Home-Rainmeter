import React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

const Card = ({title, count}) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.outerCounter}>
        <Text style={styles.counter}>{count}</Text>
        <Text style={styles.unit}>mm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#00000066',
    minWidth: 150,
  },
  outerCounter: {
    flexDirection: 'row',
  },
  counter: {
    color: '#FFFFFF',
    fontSize: 36,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  title: {
    color: 'skyblue',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  unit: {
    fontSize: 16,
    color: '#FFFFFF99',
    textAlignVertical: 'bottom',
    paddingBottom: 15,
  },
});

export default Card;
