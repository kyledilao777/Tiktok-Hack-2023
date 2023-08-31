import { View, Image } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
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
  return (
    <View className="flex-1 justify-center bg-black/80 ">
      <Image
        className="mb-12 w-48 h-14 justify-center mx-auto"
        source={require("../../assets/whitetiktok.png")}
      />
      <View className="m-6">
        <Text className=" text-slate-100 font-calibri text-[16px] mb-1">
          Email
        </Text>
        <TextInput
          className="mb-4"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-slate-100 font-calibri text-[16px] mb-1">
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
        <Button onPress={handleSubmit}>Submit</Button>
        {errMsg !== "" && <Text>{errMsg}</Text>}
        {loading && <ActivityIndicator />}
      </View>
      <Link href="/register" className="mt-2 ml-4">
        <Button>Not registered yet?</Button>
      </Link>
    </View>
  );
}
