import { StyleSheet, Button } from 'react-native';
import Netinfo from '@react-native-community/netinfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    console.log('Foreground permissions granted');
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      console.log('Background permissions granted');
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>teste</Text>
      <Button onPress={requestPermissions} title="Enable background location" />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.error(error.message);
    return;
  }
  if (data) {
    // do something with the locations captured in the background
    console.log(data.locations[0].coords);
  }
});

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
