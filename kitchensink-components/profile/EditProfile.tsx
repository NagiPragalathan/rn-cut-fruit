import { Input, InputField } from '@/components/ui/input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text, Platform, StyleSheet, ImageBackground  } from "react-native";
import { RadioButton } from "react-native-paper";
import {
    Button,
    ButtonText,
    ButtonIcon
  } from '@/components/ui/button';
import {Calendar, ArrowLeftFromLine} from "lucide-react-native";


export default function EditProfile() {
    const [dob, setDob] = useState<Date | null>(null);
    const [show, setShow] = useState<boolean>(false);
  
    // Function to handle when a date is selected
    const onChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || dob; 
      setShow(Platform.OS === "ios");
      setDob(currentDate);
    };
    const [selectedGender, setSelectedGender] = useState<string>("");
  
    return(
        <View style={styles.main_container}>
            <View className='bg-green-400 top-100 z-999 left-0 items-start justify-start w-full flex-1 absolute'>
                <Button className='bg-orange-700'>
                    <ButtonIcon as={ArrowLeftFromLine}></ButtonIcon>
                </Button>
            </View>
            <ImageBackground  
            source={{uri: 'https://static.vecteezy.com/system/resources/thumbnails/028/651/016/small/black-color-abstract-background-beautiful-and-simple-black-abstract-pattern-background-design-vector.jpg'}}
            style={styles.top_style}>

            </ImageBackground >
            <View style={styles.container}>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <InputField
                        placeholder='Enter User Name'
                    />
                </Input>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <InputField
                        placeholder='Enter Email ID'
                    />
                </Input>
                <Input variant="underlined" size="md" className='flex-1 gap-10 items-start justify-center' isDisabled={true}>
                    <InputField value={dob ? dob.toDateString() : "Select your birthdate"} />
                    <Button onPress={() => setShow(true)}><ButtonIcon as={Calendar}></ButtonIcon></Button>
                </Input>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={dob || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    />
                )}
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <InputField
                        placeholder='How Many Family Members' keyboardType="numeric" 
                    />
                </Input>
                <View style={{ marginLeft: 0 }}>
                    <Text style={{ fontSize: 18}}>Select Gender</Text>

                    <RadioButton.Group
                        onValueChange={value => setSelectedGender(value)} 
                        value={selectedGender}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{ flexDirection: "row", alignItems: "center"}}>
                                <RadioButton value="male" />
                                <Text>Male</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center"}}>
                                <RadioButton value="female" />
                                <Text>Female</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center"}}>
                                <RadioButton value="other" />
                                <Text>Other</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <Button className="p-3 w-full">
                    <ButtonText className="w-full h-[30px] item-center text-center justify-center">Submit</ButtonText>
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        main_container:{
            flex: 1,
            justifyContent: 'flex-start', 
            alignItems: 'center'
        },
        top_style:{
            height: '42%', 
            width: "100%", 
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1, 
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            padding: 20, 
            gap: 40, 
            borderColor: 'black', 
            position: 'absolute',
            backgroundColor: '#ffff',
            width: "95%",
            top: '27%',
            borderRadius: 10,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
        }
    }
)