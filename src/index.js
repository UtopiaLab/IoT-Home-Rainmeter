import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Card from './components/card';
import Images from './assets/images/img-config';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {firebase} from '@react-native-firebase/database';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      now: moment().utcOffset('+05:30').format('YYYY/M/D HH:mm'),
      hour: moment().utcOffset('+05:30').format('YYYY/M/D/H'),
      today: moment().utcOffset('+05:30').format('YYYY/M/D'),
      yesterday: moment()
        .subtract(1, 'days')
        .utcOffset('+05:30')
        .format('YYYY/M/D'),
      day: moment().utcOffset('+05:30').format('D'),
      month: moment().utcOffset('+05:30').format('M'),
      year: moment().utcOffset('+05:30').format('YYYY'),
      hourRead: 0,
      dayRead: 0,
      yesterdayRead: 0,
      monthRead: 0,
      yearRead: 0,
      reader: [],
    };
  }

  componentDidMount() {
    console.log('Initialized: ' + this.state.now);
    StatusBar.setHidden(true);
    const db = firebase
      .app()
      .database(
        'https://home-rainmeter-default-rtdb.asia-southeast1.firebasedatabase.app/',
      );

    db.ref(this.state.hour).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : 0;
      console.log('Now: ' + data);
      this.setState({
        hourRead: data,
        now: moment().utcOffset('+05:30').format('YYYY/MM/DD HH:mm'),
        reader: [...this.state.reader, 1],
      });
    });

    db.ref(this.state.today).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let read = {...data};
      let sum = 0;
      for (let each in read) {
        sum += read[each];
      }
      console.log('Today: ' + sum);
      this.setState({
        dayRead: sum,
        reader: [...this.state.reader, 2],
      });
    });

    db.ref(this.state.yesterday).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let read = {...data};
      let sum = 0;
      for (let each in read) {
        sum += read[each];
      }
      console.log('Yesterday: ' + sum);
      this.setState({
        yesterdayRead: sum,
        reader: [...this.state.reader, 3],
      });
    });

    let days = this.state.year + '/' + this.state.month;
    db.ref(days).on('value', querySnapShot => {
      let data = {...querySnapShot.toJSON()};
      let sum = 0;
      for (let i in data) {
        let part = data[i];
        for (let j in part) {
          sum += part[j];
        }
      }
      console.log('Month: ' + sum);
      this.setState({
        monthRead: sum,
        reader: [...this.state.reader, 4],
      });
    });

    db.ref(this.state.year).on('value', querySnapShot => {
      let data = {...querySnapShot.toJSON()};
      let sum = 0;
      for (let i in data) {
        let part = data[i];
        for (let j in part) {
          let pop = part[j];
          for (let k in pop) {
            sum += pop[k];
          }
        }
      }
      console.log('Year: ' + sum);
      this.setState({
        yearRead: sum,
        reader: [...this.state.reader, 5],
      });
    });
  }

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <ImageBackground source={Images.background} style={styles.background}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={styles.linear}>
            {this.state.reader.length > 4 ? (
              <>
                <View>
                  <Text style={styles.titleText}>Home Rainmeter</Text>
                  <Text style={styles.counterTitle}>
                    Live Rainfall (This Hour)
                  </Text>
                </View>
                <View style={styles.mainCounter}>
                  <Text style={styles.counterText}>{this.state.hourRead}</Text>
                  <Text style={styles.unit}>mm</Text>
                </View>
                <View>
                  <Text style={styles.timestamp}>{this.state.now}</Text>
                </View>
                <View style={styles.cardContainer}>
                  <Card title={'Today'} count={this.state.dayRead} />
                  <Card title={'Yesterday'} count={this.state.yesterdayRead} />
                  <Card title={'This Month'} count={this.state.monthRead} />
                  <Card title={'This Year'} count={this.state.yearRead} />
                </View>
                <View>
                  <Text style={styles.footerText}>
                    © 2021/2022 - Umayanga Madushan
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.loadingView}>
                <Text style={styles.loadingText}>Loading...</Text>
                <Text style={styles.loadingDesc}>
                  Please make sure you're connect to the internet.
                </Text>
              </View>
            )}
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101020',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  loadingDesc: {
    color: '#FFFFFF66',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    paddingTop: '20%',
    paddingBottom: 40,
    minWidth: '50%',
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '100',
  },
  counterTitle: {
    fontSize: 16,
    color: 'skyblue',
    textAlign: 'center',
  },
  counterText: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    paddingTop: '5%',
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 72,
    color: '#FFFFFF',
  },
  unit: {
    fontSize: 32,
    color: '#FFFFFF99',
    textAlignVertical: 'bottom',
    paddingBottom: 1,
  },
  timestamp: {
    color: 'teal',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
    justifyContent: 'center',
  },
  linear: {
    width: '100%',
    height: '100%',
  },
  footerText: {
    fontSize: 12,
    color: '#FFFFFF66',
    textAlign: 'center',
    paddingBottom: 20,
  },
});

export default App;
