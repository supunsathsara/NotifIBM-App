import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';


const GPACal = () => {
    const [program, setProgram] = useState(null);
    const [batch, setBatch] = useState(null);
    const [student, setStudent] = useState(null);


    const [isProgramFocus, setIsProgramFocus] = useState(false);
    const [isBatchFocus, setIsBatchFocus] = useState(false);
    const [isStudentFocus, setIsStudentFocus] = useState(false);

    const [programList, setProgramList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const [gpa, setGPA] = useState<number | null>(null);
    const [gpa2, setGPA2] = useState<number | null>(null);
    const [courses, setCourses] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingLists, setIsFetchingLists] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
      setIsFetchingLists(true);
      try {
          const response = await axios.get('https://notifibm.com/api/gpa/programs');
          const transformedData = response.data.map(program => ({
              label: program.name,
              value: program.web_value.toString(),
          }));
          setProgramList(transformedData);
      } catch (error) {
          console.error('There was an error fetching the data: ', error);
      } finally {
          setIsFetchingLists(false);
      }
  }, []);

  useEffect(() => {
      fetchData();
  }, [fetchData]);


    const onRefresh = useCallback(() => {
      setRefreshing(true);
      //update to init state
      setGPA(null);
      setGPA2(null)
      setCourses([])
      setProgram(null)
      setBatch(null)
      setStudent(null)
      fetchData().then(() => setRefreshing(false));
  }, [fetchData]);


    useEffect(() => {
        if (program) {
            setIsFetchingLists(true);
            const fetchData = async () => {
                try {
                    const response = await axios.post('https://notifibm.com/api/gpa/batch', {
                        program: program,
                    });

                    console.log('Batch data fetched:', response.data)
                    // Transform the response to match the desired format if necessary
                    const transformedData = response.data.map(batch => ({
                        label: batch.name,
                        value: batch.value.toString(), // converting number to string to match your initial data format
                    }));
                    setBatchList(transformedData);
                } catch (error) {
                    console.error('There was an error fetching the data: ', error);
                } finally {
                    setIsFetchingLists(false);
                }
            };

            fetchData();
        }
    }, [program]);

    useEffect(() => {
        if (batch) {
            setIsFetchingLists(true);
            const fetchData = async () => {
                try {
                    const response = await axios.post('https://notifibm.com/api/gpa/student', {
                        program: program,
                        batch: batch,
                    });

                    console.log('Student data fetched:', response.data)
                    // Transform the response to match the desired format if necessary
                    const transformedData = response.data.map(student => ({
                        label: student.name,
                        value: student.value.toString(),
                    }));
                    setStudentList(transformedData);
                } catch (error) {
                    console.error('There was an error fetching the data: ', error);
                } finally {
                    setIsFetchingLists(false);
                }
            };

            fetchData();
        }
    }, [batch, program]);


    const handleSubmit = async (e) => {
        setIsLoading(true);
        setGPA(null);
        setGPA2(null);
        

        try {
            const response = await fetch('https://notifibm.com/api/gpa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentID: student,
                    program,
                }),
            });

            const data = await response.json();
            setGPA(parseFloat(data.gpa));
            setGPA2(parseFloat(data.gpaNonRepeat));
            setCourses(data.courses);

        }
        catch (error) {
            console.error('There was an error fetching the data: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
              />
          }
            >
                <View style={styles.headerContainer}>
                <View style={styles.headerInnerContainer}>
                    <Icon name="number" size={25} color="#00BFFF" />
                    <Text style={styles.header}>GPA Calculator</Text>              
                </View>
                <LottieView style={styles.lottie} source={require('../assets/animations/welcome.json')} autoPlay loop />
                </View>
                <Dropdown
                    style={[styles.dropdown, isProgramFocus && { borderColor: "#00BFFF" }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={programList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isProgramFocus ? 'Select Program' : '...'}
                    searchPlaceholder="Search..."
                    value={program}
                    onFocus={() => setIsProgramFocus(true)}
                    onBlur={() => setIsProgramFocus(false)}
                    onChange={item => {
                        setProgram(item.value);
                        setIsProgramFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Icon name="organization" size={20} style={styles.icon} />
                    )}
                />

                <Dropdown
                    style={[styles.dropdown, isBatchFocus && { borderColor: '#00BFFF' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={batchList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isBatchFocus ? 'Select Batch' : '...'}
                    searchPlaceholder="Search..."
                    value={batch}
                    onFocus={() => setIsBatchFocus(true)}
                    onBlur={() => setIsBatchFocus(false)}
                    onChange={item => {
                        setBatch(item.value);
                        setIsBatchFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Icon name="versions" size={20} style={styles.icon} />
                    )}
                />

                <Dropdown
                    style={[styles.dropdown, isStudentFocus && { borderColor: '#00BFFF' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={studentList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isStudentFocus ? 'Select Student' : '...'}
                    searchPlaceholder="Search..."
                    value={student}
                    onFocus={() => setIsStudentFocus(true)}
                    onBlur={() => setIsStudentFocus(false)}
                    onChange={item => {
                        setStudent(item.value);
                        setIsStudentFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Icon name="hash" size={20} style={styles.icon} />
                    )}
                />

                <Button
                    title={isLoading ? 'Calculating...' : 'Calculate GPA'}
                    onPress={handleSubmit}
                    disabled={isLoading || isFetchingLists}
                    color="#00B2ED"
                />

                {isLoading ? (
                    <View
                    style={{marginTop:25}}
                    >
                    <ActivityIndicator size="large" color="#FFFFFF"/>
                    </View>
                ) : (
                    <View style={styles.resultContainer}>
                        {gpa !== null && (
                            <View style={styles.gpaContainer}>

                                <Text style={styles.gpaText}>GPA: </Text>
                                <Text style={styles.gpaValue}>{gpa.toFixed(2)}</Text>
                                <Icon name="star" size={20} color={gpa >= 3.5 ? '#00BFFF' : '#FFFFFF'}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        )}
                        {gpa2 !== null && (
                            <View style={styles.gpaContainer}>
                                <Text style={styles.gpaText}>{gpa2.toFixed(2)} </Text>
                                <Text style={styles.gpaNote}>(without repeated courses)</Text>
                            </View>
                        )}

                        {/* Course list rendering */}
                        {courses?.length > 0
                            && courses?.map((course, index) => (
                                <View key={index} style={styles.courseContainer}>
                                    <Text style={styles.courseText}>{course?.Subject}</Text>
                                    <Text style={styles.courseText}>Grade: {course?.FinalGrade}</Text>
                                </View>
                            ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default GPACal;

const styles = StyleSheet.create({
    //   container: {
    //     padding: 16,
    //     backgroundColor: 'white',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //   },
    dropdown: {
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#EDFAFF',
        borderColor: '#555555',
        marginBottom: 20,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1A232E',
        paddingTop: 30,
        paddingBottom: 100,
        justifyContent: 'center',  // Centers children vertically in the container
        alignItems: 'center',      // Centers children horizontally in the container
        width:'auto'
    },
    gpaContainer: {
        flexDirection: 'row', // Aligns items in a row
        alignItems: 'center', // Centers items vertically
        marginBottom: 8,       // Adds a bit of margin between the two GPAs

    },
    gpaText: {
        color: '#FFFFFF', // White text for dark theme
        fontSize: 18,
        fontWeight: 'bold',
    },
    gpaValue: {
        color: '#FFFFFF', // White text for dark theme
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5, // Small space between "GPA:" and the value
    },
    gpaNote: {
        color: '#CCCCCC', // Lighter color for notes
        fontSize: 14,     // Smaller font size
        marginLeft: 5,    // Space between the GPA value and the note
    },
    courseContainer: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    courseText: {
        color: '#FFFFFF', // White text for dark theme
        fontSize: 16,
    },
    resultContainer: {
        marginTop: 20,
        width: '90%',
        minWidth: '90%'
    },
    headerContainer: {
        flexDirection: 'column', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers items vertically in the row
        justifyContent: 'center', // Centers the entire block in its container
        padding: 10, // Adds padding around the content for spacing
        paddingBottom: 20, // Adds more space between the header and the dropdown
    },
    headerInnerContainer: {
        flexDirection: 'row', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers items vertically in the row
    },
    header: {
        color: '#FFFFFF', // White text suitable for dark themes
        fontSize: 24, // Larger font size for headers
        fontWeight: 'bold', // Makes the text bold
        marginLeft: 10, // Adds space between the icon and the text
    },
    lottie: {
        width: 150,
        height: 150,
    },
});