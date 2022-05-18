import React from "react"
import { Pressable, SafeAreaView, Text, Touchable, TouchableOpacity } from "react-native"
import { HeaderPage } from "../assets/generalComponents";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../assets/Styles";
import Es1 from "./es1";
import Es2 from "./es2";
import Es3 from "./es3";

const Stack = createNativeStackNavigator();

const Home = ({ navigation, route }) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: Colors.middleblue,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }
            }}
            initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="Es1" component={Es1} />
            <Stack.Screen name="Es2" component={Es2} />
            <Stack.Screen name="Es3" component={Es3} />

        </Stack.Navigator>
    );
}

const HomeScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1, height: "100%" }}>

            <HeaderPage title={"Home"} />

            <TouchableOpacity onPress={() => { navigation.navigate("Es1") }}
                style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                    Calcolatrice
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate("Es2") }}
                style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                    Cronometro
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}



export default Home;