import React from "react"
import { SafeAreaView, Text } from "react-native"
import { HeaderPage } from "../assets/generalComponents";

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, height: "100%" }}>

            <HeaderPage />
        </SafeAreaView>
    )
}

export default Home;