import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, TouchableOpacity, Image } from "react-native";
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

    const handleSubmitRegister = () => {
        router.push("login");

    }

    return (
        <View className="flex-1  bg-black/80">
            <View className="mt-20 mb-5">
            <View className="flex mx-auto mb-4">
            <Image
                className="w-48 h-14 mx-auto"
                source={require("../../assets/whitetiktok.png")}
            />
            <Text className="text-white text-md text-right font-lato">E-commerce</Text>
            </View>
            <Text className="text-white font-lato">First Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='givenName'
                value={firstName}
                onChangeText={setfName} />
            <Text className="text-white font-lato">Last Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='familyName'
                value={lastName}
                onChangeText={setlName} />
            <View className="text-white font-lato">
                <Text className="text-white">Email</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text className="text-white font-lato">Password</Text>
            <TextInput
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Text className="text-white font-lato">Phone Number</Text>
            <TextInput
                rautoCapitalize='none'
                textContentType='telephoneNumber'
                value={phoneNumber}
                onChangeText={setNumber} 
            />
            </View>

            <TouchableOpacity onPress={handleSubmit} className="mx-auto mt-5">
                <Text className="text-white font-lato">
                    Submit
                </Text>
            </TouchableOpacity>
            

            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}

            <View style={{marginTop: 65, marginLeft: 10}}>
                <TouchableOpacity className="align-bottom justify-center" onPress={handleSubmitRegister}>

                    <Text className="text-white font-lato"> Back </Text>
                </TouchableOpacity>

            </View>
            </View>
            
        </View> 
    );
}