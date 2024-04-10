import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import StudentGPAView from '../components/StudentGPAView';
import axios from 'axios';

const Home = () => {
  const sampleProfile = {
    full_name: "Jane Doe",
  };

  const sampleGreeting = "Welcome to Your GPA Dashboard!";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true); // Enable the refreshing indicator on pull to refresh
    try {
      const response = await axios.post('https://notifibm.com/api/gpa', {
        studentID: "80859",
        program: "1110",
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data); 
      console.log('Data fetched:')
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Disable the refreshing indicator
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  const onRefresh = useCallback(() => {
    fetchData(); // Fetch data on pull to refresh
  }, []);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator while fetching data
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {data ? (
            <StudentGPAView 
              profile={sampleProfile} 
              greeting={sampleGreeting} 
              data={data} 
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Failed to load data</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
