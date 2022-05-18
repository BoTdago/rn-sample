import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList } from "react-native"
import { HeaderPage } from "../assets/generalComponents";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../assets/Styles";

import moment from "moment";

const Es2 = ({ navigation, route }) => {

    const [isStopped, setIsStopped] = useState(false)
    const [now, setNow] = useState(0)
    const [start, setStart] = useState(0)
    const [isStarted, setIsStarted] = useState(false)

    const [timer, setTimer] = useState()
    const [totalState, setTotalState] = useState(0)
    const [partials, setPartials] = useState([]);

    let interval = now - start;
    let total = totalState + interval;

    const startFunc = () => {
        setIsStopped(!isStopped)

        setStart(new Date().getTime())
        setNow(new Date().getTime())

        if (!isStarted) {
            setStart(new Date().getTime())
            setIsStarted(true)
        }

        if (!isStopped) {
            setTimer(setInterval(() => {
                setNow(new Date().getTime())
            }, 100))
        }
        else {
            clearInterval(timer)
            setTotalState(totalState + interval)
            setPartials([...partials, interval])
        }
    }

    function Timer() {
        const pad = (n) => {
            return n < 10 ? '0' + n : n
        }
        const duration = moment.duration(total)
        return (
            <View style={Styles.chronoContainer}>
                <Text style={Styles.chronoText}>
                    {pad(duration.minutes()) + ":"}
                </Text>
                <Text style={Styles.chronoText}>
                    {pad(duration.seconds()) + ","}
                </Text>
                <Text style={Styles.chronoText}>
                    {pad(parseInt(duration.milliseconds() / 10))}
                </Text>

            </View>

        )
    }

    const RenderPartials = ({item}) => {
        const pad = (n) => {
            return n < 10 ? '0' + n : n
        }
        const duration = moment.duration(item);
        return (
            <View style={Styles.chronoContainerPartials}>
                <Text style={Styles.chronoTextPartials}>
                    {pad(duration.minutes()) + ":"}
                </Text>
                <Text style={Styles.chronoTextPartials}>
                    {pad(duration.seconds()) + ","}
                </Text>
                <Text style={Styles.chronoTextPartials}>
                    {pad(parseInt(duration.milliseconds() / 10))}
                </Text>

            </View>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1, height: "100%" }}>

            <HeaderPage title={"Cronometro"} freccia navigation={navigation} />

            <Timer />

            <View style={{ flexDirection: "row", alignSelf: "center" }}>

                <TouchableOpacity onPress={() => { startFunc() }}
                    style={{ backgroundColor: !isStarted ? Colors.green : isStopped ? Colors.red : Colors.green, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        {!isStarted ? "Avvia" : isStopped ? "Pausa" : "Riprendi"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setTotalState(0)
                    setStart(new Date().getTime())
                    setNow(new Date().getTime())
                    setPartials([])
                }}
                    style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                        Azzera
                    </Text>
                </TouchableOpacity>

            </View>

            <View>
                <FlatList
                    data={partials}
                    renderItem={({ item }) =>
                        <RenderPartials item={item}/>
                    }
                    keyExtractor={(i) => i}
                    style={{marginBottom: 240}}
                />
            </View>

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

    chronoText: {
        textAlign: "center",
        fontSize: 60,
        padding: 3,
        paddingTop: 30,
        color: Colors.darkblue,
        borderRadius: 12
    },

    chronoTextPartials: {
        textAlign: "center",
        fontSize: 30,
        padding: 0,
        paddingTop: 10,
        color: Colors.darkblue,
        borderRadius: 12
    },

    chronoContainer: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        width: 270
    },

    chronoContainerPartials: {
        flexDirection: "row",
        alignSelf: "center",
    }
})

export default Es2;