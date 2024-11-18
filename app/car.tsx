import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const maintenanceDataFile = require('@/assets/hondapilot.json');

interface MaintenanceRecord {
  desc: string;
  due_mileage: number;
}
interface MaintenanceData {
  data: MaintenanceRecord[];
}

export default function Car() { 
  const { id, make, model, year, mileage, imageURL } = useLocalSearchParams();

  const [maintenanceData, setMaintenanceData] = useState<MaintenanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenanceData = async () => {
    try{
      if(maintenanceDataFile) {
        setMaintenanceData(maintenanceDataFile);
        setLoading(false);
        return
      }
    } catch (error: any) {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  return (
    <ThemedView>
      <ThemedView style={styles.box}>
        <Link style={styles.button}
        href={{
          pathname:'/editCar',
          params: {
            id: id,
            make: make,
            model: model,
            year: year,
            mileage: mileage,
            imageURL: imageURL
          }
          }}>  
          <FontAwesome5 name="edit" size={20} color="green" />
        </Link>
        <Image
          style={styles.image}
          source={{
          uri: `${imageURL}`
            }}></Image>
        <ThemedView style={styles.carInfo}>
          <ThemedText>{make} {model}</ThemedText>
          <ThemedText>Year: {year}</ThemedText>
          <ThemedText>Mileage: {mileage}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* {loading && <ActivityIndicator color="#00ff00" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {maintenanceData && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.header}>Maintenance Data:</Text>
          {maintenanceData.map((record, index) => ( // Assuming maintenanceData has a 'data' property containing an array
            <Text key={index} style={styles.dataText}>
              {index + 1 + '. ' + record.desc} every {record.due_mileage} miles
            </Text>
          ))}
          <Text style={styles.dataText}>{JSON.stringify(maintenanceData, null, 2)}</Text>
        </ScrollView>
      )} */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    padding: 12,
    textAlign: 'center',
    position: 'absolute',
    right: 20,
    top: 5
  },
  image: {
    width: 150,
    height: 120,
    objectFit: 'cover',
    borderRadius: 2
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    position: 'relative'
  },
  carInfo: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  scrollView: {
    flexGrow: 1, // Allows the ScrollView to take up all available space
    justifyContent: 'center', // Center content vertically
    paddingBottom: 20, // Add bottom padding for better scrolling
  },
  header: {
    fontSize: 20,
    color: '#fff', // Change color to white for better visibility
    marginBottom: 10,
  },
  dataText: {
    color: '#d3d3d3', // Change text color for better readability
    fontFamily: 'monospace', // Use a monospace font for better data display
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});
