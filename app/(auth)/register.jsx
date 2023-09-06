import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setfName] = useState('');
    const [lastName, setlName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }

        if (firstName == '') {
            setErrMsg("first name cannot be empty")
            return;
        }

        if (lastName== '') {
            setErrMsg("last name cannot be empty")
            return;
        }

        if (phoneNumber == '') {
            setErrMsg("phone number cannot be empty")
            return;
        }


        setLoading(true);
        const { error } = await supabase.auth.signUp({ 
            email, 
            password, 
            options: {
                data: {
                    phone_number: phoneNumber,
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        });
        setLoading(false);

        if (error) {
            setErrMsg(error.message);
            return;
        } else {
            return router.push('login')
        } 
    }

    return (
        <View className="flex-1 justify-center bg-black/80">
            <Text className="text-white">First Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='givenName'
                value={firstName}
                onChangeText={setfName} />
            <Text className="text-white">Last Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='familyName'
                value={lastName}
                onChangeText={setlName} />
            <View className="text-white">
                <Text className="text-white">Email</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text className="text-white">Password</Text>
            <TextInput
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Text className="text-white">Phone Number</Text>
            <TextInput
                rautoCapitalize='none'
                textContentType='telephoneNumber'
                value={phoneNumber}
                onChangeText={setNumber} 
            />
            </View>

            
            <Button onPress={handleSubmit}>Submit</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
        </View> 
    );
}