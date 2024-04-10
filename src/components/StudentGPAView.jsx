import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

// Assuming `profile`, `greeting`, and `data` are passed as props or obtained from a state/context

const CourseDetail = ({ subject, grade, points }) => (
    <View style={styles.courseContainer}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
        <Icon name="north-star" size={20} color={
            (grade === 'E' || grade === 'X' ) ? 'red'  : '#00BFFF'
        }
        style={{ marginTop: 4 }} />
        <Text
          style={[styles.courseText, { marginLeft: 10, flexShrink: 1, paddingRight: 20 }]}
          numberOfLines={2} // Allows text to wrap after 2 lines
        >
          {subject}
        </Text>
      </View>
      <Text 
      style={[
        styles.courseText, 
        { color: (grade === 'E' || grade === 'X') ? 'red' : styles.courseText.color }
      ]}
    >
        {grade}</Text>
    </View>
  </View>
  
);

const StudentGPAView = ({ profile, greeting, data }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi {profile.full_name || 'there'}</Text>
        {/* <Text style={styles.greetingText}>{greeting}</Text> */}
      </View>

      <View style={styles.gpaContainer}>

        <Icon name="mortar-board" size={50} color="#00BFFF" 
        style={styles.mortarBoard}
        />
        <View style={styles.gpaBox}>
          <Text style={styles.gpaLabel}>GPA</Text>
          <Text style={styles.gpaValue}>{data.gpaNonRepeat}</Text>
        </View>
        <View style={styles.subjectCount}>
          <Text style={styles.subjectText}>Subjects: {data.courses.length}</Text>
        </View>
      </View>

      <View style={styles.modulesContainer}>
        <Text style={styles.modulesHeader}>Modules</Text>
        {data.courses.map((course, index) => (
          <CourseDetail
            key={index}
            subject={course.Subject}
            grade={course.FinalGrade}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A232E',
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 50,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gpaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gpaBox: {
    borderColor: '#00BFFF',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpaLabel: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gpaValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
  },
  subjectCount: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  subjectText: {
    color: '#4A4A4A',
    fontSize: 12,
  },
  modulesContainer: {
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    padding: 20,
  },
  modulesHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  courseContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 8,
    marginBottom: 8,
  },
  courseText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  mortarBoard: {
    marginTop: 20,
    marginBottom: 20,

  },
});

export default StudentGPAView;
