import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';

export default function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setfName] = useState('');
    const [lastName, setlName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const main_signup = async () => {
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);

        if (error) {
            setErrMsg(error.message);
            return;
        }
        
    }

    const sec_signup = async () => {
        if (phoneNumber == '') {
            setErrMsg("phone number cannot be empty")
            return;
        }

        setLoading(true);
        const { error } = await supabase.from('profiles').insert({ 
            first_name: firstName, 
            last_name: lastName,
            phone_number: phoneNumber 
        });
        setLoading(false);

        if (error) {
            setErrMsg(error.message);
            return;
        }
        
    }

    const handleSubmit = async () => {
        main_signup();
        sec_signup();
        return;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>First Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='givenName'
                value={firstName}
                onChangeText={setfName} />
            <Text>Last Name</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='familyName'
                value={lastName}
                onChangeText={setlName} />
            <Text>Email</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Text>Phone Number</Text>
            <TextInput
                returnKeyType={'done'}
                keyboardType={'number-pad'} 
                value={phoneNumber}
                onChangeText={setNumber} 
            />
            <Button onPress={handleSubmit}>Submit</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
        </View>
    );
}
