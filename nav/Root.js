import React from "react" //React 

//Import and create Tabs
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//Icons for tabnav
import { Ionicons } from '@expo/vector-icons';

//Tabnav components
import Home from "../screens/home";
import PwdStorer from "../screens/pwdStorer";

const RootNav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = "md-home";//init route icon name
                        if (route.name === "home") {
                            iconName = "md-home";
                        }
                        else {
                            iconName = "ios-key-sharp"
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#2055fd",
                    tabBarInactiveTintColor: "#cecece",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#FFFFFF"
                    },
                    headerShown: false,
                    tabBarHideOnKeyboard: true,

                })}
                initialRouteName="home"
            >

                <Tab.Screen name="home" component={Home} />
                <Tab.Screen name="pwd" component={PwdStorer} />
            </Tab.Navigator>
        </NavigationContainer >
    )
}

export default RootNav;