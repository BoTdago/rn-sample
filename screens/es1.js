import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { HeaderPage } from "../assets/generalComponents";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../assets/Styles";

const Es1 = ({ navigation, route }) => {

    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [result, setResult] = useState(0);

    // useEffect(() => {
    //     console.log(n1)
    // }, [n1, n2, result])

    return (
        <SafeAreaView style={{ flex: 1, height: "100%" }}>

            <HeaderPage title={"Calcolatrice"} freccia navigation={navigation} />

            <Text style={Styles.generalText}>
                Inserisci Numero 1
            </Text>

            <TextInput
                style={{
                    fontSize: 24,
                    marginLeft: 10,
                    width: 100,
                    borderBottomColor: Colors.lightgray,
                    borderBottomWidth: 1,
                    height: 50,
                }}
                placeholder="Numero 1"
                onChangeText={(number) => setN1(Number(number))}
            />

            <Text style={Styles.generalText}>
                Inserisci Numero 2
            </Text>

            <TextInput
                style={{
                    fontSize: 24,
                    marginLeft: 10,
                    width: 100,
                    borderBottomColor: Colors.lightgray,
                    borderBottomWidth: 1,
                    height: 50,
                }}
                placeholder="Numero 2"
                onChangeText={(number) => setN2(Number(number))}
            />

            <View style={{ flexDirection: "row", alignSelf: "center" }}>

                <TouchableOpacity onPress={() => { setResult(Number(n1) + Number(n2)) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Somma
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setResult(n1 - n2) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Sottrazione
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <TouchableOpacity onPress={() => { setResult(n1 * n2) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Moltiplicazione
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setResult(n1 / n2) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Divisione
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <TouchableOpacity onPress={() => { setResult(n1 % n2) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Modulo
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setResult(Math.pow(n1, n2)) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Potenza
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setResult(Math.pow(n1, (1 / n2))) }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Radice
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={Styles.result}>
                Risultato: {result}
            </Text>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    generalText: {
        fontSize: 20,
        color: Colors.darkblue,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 12
    },

    result: {
        fontSize: 40,
        color: Colors.darkblue,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 12
    }
})

export default Es1;