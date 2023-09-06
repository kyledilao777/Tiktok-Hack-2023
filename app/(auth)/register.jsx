import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (email == "") {
      setErrMsg("Email cannot be empty");
      return;
    }
    if (password == "") {
      setErrMsg("Password cannot be empty");
      return;
    }

    if (firstName == "") {
      setErrMsg("First name cannot be empty");
      return;
    }

    if (lastName == "") {
      setErrMsg("Last name cannot be empty");
      return;
    }

    if (phoneNumber == "") {
      setErrMsg("Phone number cannot be empty");
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
        },
      },
    });
    setLoading(false);

    if (error) {
      setErrMsg(error.message);
      return;
    } else {
      return router.push("login");
    }
  };

  const handleSubmitRegister = () => {
    router.push("login");
  };

  return (
    <View className="flex-1 justify-center bg-bgblack/80">
      <View className="mt-20 mb-5">
        <View className="flex mx-auto mb-4">
          <Image
            className="w-48 h-14 mx-auto"
            source={require("../../assets/whitetiktok.png")}
          />
          <Text className="text-white text-md text-right font-lato">
            E-commerce
          </Text>
        </View>
        <View className="m-6">
          <View className="flex flex-row">
            <View className="flex-1 flex-col">
              <Text className="text-white font-lato mb-1">First Name</Text>
              <TextInput
                className="mb-4 flex-1"
                autoCapitalize="none"
                textContentType="givenName"
                value={firstName}
                onChangeText={setfName}
              />
            </View>
            <View className="flex-1 flex-col ml-4">
              <Text className="text-white font-lato mb-1">Last Name</Text>
              <TextInput
                className="mb-4"
                autoCapitalize="none"
                textContentType="familyName"
                value={lastName}
                onChangeText={setlName}
              />
            </View>
          </View>

          <View className="text-white font-lato">
            <Text className="text-white font-lato mb-1">Email</Text>
            <TextInput
              className="mb-4"
              autoCapitalize="none"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
            <Text className="text-white font-lato mb-1">Password</Text>
            <TextInput
              className="mb-4"
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              value={password}
              onChangeText={setPassword}
            />
            <Text className="text-white font-lato mb-1">Phone Number</Text>
            <TextInput
              className="mb-4"
              rautoCapitalize="none"
              textContentType="telephoneNumber"
              value={phoneNumber}
              onChangeText={setNumber}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="border-white w-full bg-bgred py-2 rounded-lg"
          >
            {loading ? (
              <ActivityIndicator className="mx-auto" />
            ) : (
              <Text className="text-white font-lato mx-auto">Submit</Text>
            )}
          </TouchableOpacity>

          {errMsg !== "" && <Text>{errMsg}</Text>}
          {loading && <ActivityIndicator />}

          <View className="flex-row">
            <TouchableOpacity
              className="align-bottom justify-center mt-8"
              onPress={handleSubmitRegister}
            >
              <Text className="text-white font-lato">
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
