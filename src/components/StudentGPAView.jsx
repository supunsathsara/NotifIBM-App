import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Badge, Avatar, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const CourseDetail = ({ subject, grade }) => (
  <Card style={styles.courseCard}>
    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Icon name="book-outline" size={20} color="#00BFFF" />
      <Text style={styles.courseText}>{subject}</Text>
      <Badge style={{
        backgroundColor: (grade === 'E' || grade === 'X')  ? '#dc3545': '#28a745',
      }}>{grade}</Badge>
    </Card.Content>
  </Card>
);

const StudentGPAView = ({ profile, data }) => {
  return(
  <SafeAreaView style={styles.safeArea}>
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.greetingContainer}>
      <Avatar.Text size={60} label={profile.full_name.split(" ").map((n)=>n[0]).join("")} style={styles.avatar} />
      <Title style={styles.greetingText}>Hi {profile.full_name || 'there'}, welcome back!</Title>
  
    </View>

    <Card style={styles.gpaCard}>
      <Card.Content style={styles.gpaContainer}>
        <Icon name="school-outline" size={50} color="#00BFFF" />
        
        <View style={styles.gpaBox}>
          <Paragraph style={styles.gpaLabel}>GPA</Paragraph>
          <Title style={styles.gpaValue}>{data.gpaNonRepeat}</Title>
        </View>
        <Badge size={28}
          style={{ backgroundColor: '#007BFF', paddingLeft: 7, paddingRight: 7,}}
        >{data.courses.length} Subjects</Badge>
      </Card.Content>
    </Card>

    <View style={styles.modulesContainer}>
      <Title style={styles.modulesHeader}>Modules</Title>
      {data.courses.map((course, index) => (
        <CourseDetail key={index} subject={course.Subject} grade={course.FinalGrade} />
      ))}
    </View>
    </ScrollView>
  </SafeAreaView>
)};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A232E',
  },
  scrollViewContent: {
    paddingBottom: 30, // Add sufficient padding to scroll above the navigator
  },
  container: {
    flex: 1,
    backgroundColor: '#1A232E',
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  greetingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  gpaCard: {
    elevation: 4,
    marginHorizontal: 20,
    backgroundColor: '#293543',
  },
  gpaContainer: {
    alignItems: 'center',
    padding: 20,
  },
  gpaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpaLabel: {
    color: '#FFFFFF',
  },
  gpaValue: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  modulesContainer: {
    margin: 20,
  },
  modulesHeader: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  courseCard: {
    marginBottom: 10,
    backgroundColor: '#293543',
  },
  courseText: {
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 10,
  },
  gradeBadge: {
    backgroundColor: '#00BFFF',
  },
  avatar: {
    backgroundColor: '#007BFF',
  },
});

export default StudentGPAView;
