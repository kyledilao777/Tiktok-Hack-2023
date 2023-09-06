import { View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const variantstyles = {
    default: "rounded bg-white",
    primary: "bg-blue-500 text-white",
    secondary: "bg-white-500 text-black",
  };
  
  const handleSubmit = async () => {
    setErrMsg("");
    if (email == "") {
      setErrMsg("email cannot be empty");
      return;
    }
    if (password == "") {
      setErrMsg("password cannot be empty");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErrMsg(error.message);
      return;
    }
  };

  const handleRegister = () => {
    router.push("register")
  }
  return (
    <View className="flex-1 justify-center bg-black/80 ">
      <View className="mb-8">
      <View className="flex mx-auto mb-4">
      <Image
        className="w-48 h-14 mx-auto"
        source={require("../../assets/whitetiktok.png")}
      />
      <Text className="text-white text-md text-right font-lato">E-commerce</Text>
      </View>
      <View className="m-6">
        
        <Text className=" text-slate-100 font-lato text-[16px] mb-1">
          Email
        </Text>
        <TextInput
          className="mb-4"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-slate-100 font-lato text-[16px] mb-1">
          Password
        </Text>
        <TextInput
          className="mb-4"
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        {errMsg !== "" && <Text className="mb-3 text-white font-lato">**{errMsg}**!</Text>}

        <View className="flex-row">
          

          <TouchableOpacity onPress={handleRegister}>
            <Text className="text-white font-lato">Not registered yet?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} className="border-white pl-40 ">
            <Text className="text-white font-lato">Submit</Text>
          </TouchableOpacity>
      
        
         
          {loading && <ActivityIndicator />}

        </View>
        </View>
        

      </View>

      
      
    
      
    </View>
  );
}
