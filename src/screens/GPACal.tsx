import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
import { Button, Card, Paragraph, Text, Title, Avatar, IconButton, TextInput, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}
                refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                  />
              }
            >

                <View style={styles.headerContainer}>
                    <Icon name="number"  color='#00BFFF' size={25} />
                    <Title style={styles.header}>GPA Calculator</Title>
                    <LottieView source={require('../assets/animations/welcome.json')} autoPlay loop style={styles.lottie} />
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
                    mode="contained"
                    loading={isLoading}
                    onPress={handleSubmit}
                    disabled={isLoading || isFetchingLists}
                    style={styles.button}
                    icon="calculator"
                >
                    Calculate GPA
                </Button>

                {isLoading ? (
                    <ActivityIndicator size="large" style={styles.loader} />
                ) : (
                    <View style={styles.resultContainer}>
                        <View style={styles.gpaContainer}>
                            {gpa !== null && (
                                <Card style={styles.gpaCard}>
                                    <Card.Title
                                        title="GPA"
                                        subtitle="Current GPA"
                                        titleStyle={styles.cardTitle}
                                        subtitleStyle={styles.cardSubtitle}
                                        left={(props) => <Avatar.Icon {...props} icon="star" color="#FFD700"
                                            style={{ backgroundColor: '#485768' }}
                                        />}
                                    />
                                    <Card.Content>
                                        <Title style={styles.cardContentTitle}>{gpa.toFixed(2)}</Title>
                                    </Card.Content>
                                </Card>
                            )}
                            {gpa2 !== null && (
                                <Card style={styles.gpaCard}>
                                    <Card.Title
                                        title="GPA without repeats"
                                        subtitle="Calculated without repeated courses"
                                        titleStyle={styles.cardTitle}
                                        subtitleStyle={styles.cardSubtitle}
                                        left={(props) => <Avatar.Icon {...props} icon="star-outline" color="#B0BEC5" style={{ backgroundColor: '#485768' }} />}
                                    />
                                    <Card.Content>
                                        <Title style={styles.cardContentTitle}>{gpa2.toFixed(2)}</Title>
                                    </Card.Content>
                                </Card>
                            )}
                        </View>
                        {courses.length > 0 && courses.map((course, index) => (
                            <Card key={index} style={styles.courseCard}>
                                <Card.Content>
                                    <Paragraph style={styles.courseText}>{course.Subject}</Paragraph>
                                    <Paragraph style={styles.courseText}>Grade: {course.FinalGrade}</Paragraph>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default GPACal;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1A232E',
    },
    scrollViewContent: {
        paddingBottom: 100, // Add sufficient padding to scroll above the navigator
    },
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

    headerInnerContainer: {
        flexDirection: 'row', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers items vertically in the row
    },

    container: {
        flex: 1,
        backgroundColor: '#1A232E',
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#FFFFFF',
        marginLeft: 10,
    },
    button: {
        marginVertical: 10,
    },
    loader: {
        marginTop: 20,
    },
    resultContainer: {
        padding: 10,
    },
    resultCard: {
        marginVertical: 8,
    },
    courseCard: {
        marginVertical: 4,
        backgroundColor: '#293543',
    },
    courseText: {
        color: '#FFFFFF',
    },
    lottie: {
        width: 100,
        height: 100,
    },
    gpaContainer: {
        flexDirection: 'row',  // Arrange items horizontally
        justifyContent: 'space-evenly',  // Evenly space items across the container
        flexWrap: 'wrap',  // Allow items to wrap in smaller screens
        alignItems: 'center',  // Align items vertically in the center
        marginBottom: 20,
    },
    gpaCard: {
        flex: 1,  // Take up equal space within the row
        margin: 8,  // Add some margin between cards
        minWidth: 160,  // Minimum width for each card
        maxWidth: 340,  // Maximum width to ensure it does not stretch too far on larger screens
        backgroundColor: '#293543',

    },
    cardTitle: {
        color: '#FFFFFF',  // White text for titles
    },
    cardSubtitle: {
        color: '#E0E0E0',  // Lighter white (grey) for subtitles
    },
    cardContentTitle: {
        color: '#FFFFFF',  // White text for content titles
        textAlign: 'center',  // Center the text within the card
        fontWeight: 'bold',  // Make the text bold
    },
});