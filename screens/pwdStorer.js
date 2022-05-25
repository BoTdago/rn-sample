import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, TextInput, useWindowDimensions, View, StyleSheet, TouchableOpacity } from "react-native";
import { HeaderPage, } from "../assets/generalComponents";
import { Colors } from "../assets/Styles";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PwdStorer = () => {

    //--FILE DI PROVA (testo)
    /*
        1;1 --> EMAIL;PWD
        2;2 --> EMAIL;PWD
     */

    //States
    const [view_FL_PWD_I, setView_FL_PWD_I] = useState(-1);
    const [storedCred, setStoredCred] = useState([]);
    const [storedCred_STR, setStoredCred_STR] = useState("")
    //Arrays di appoggio     
    const creds_ARRAY = [];

    const encryptData = (str) => {
        return [...str].map(char => {
            // ; --> Serve per dividere tra Email e Pwd
            // \n --> Serve per dividere tra i diversi blocchi email/pwd
            // Non bisogna criptare questi due caratteri
            if (char !== ";" && char !== "\n") {
                const asciiChar = char.charCodeAt();
                return String.fromCharCode(asciiChar + 1);
            }
            else {
                return char;
            }
        }).toString().replace(/,/g, "");
    }

    const decryptData = (str) => {
        return [...str].map(char => {
            // ; --> Serve per dividere tra Email e Pwd
            // \n --> Serve per dividere tra i diversi blocchi email/pwd
            // Non bisogna decriptare questi due caratteri
            if (char !== ";" && char !== "\n") {
                const asciiChar = char.charCodeAt();
                return String.fromCharCode(asciiChar - 1);
            }
            else {
                return char;
            }
        }).toString().replace(/,/g, "");
    }


    const formatCreds = () => {
        //handle empty text
        if (storedCred_STR == "") {
            Alert.alert("Errore", "file vuoto")
            return;
        }

        //Salvataggio sullo state
        const credentials = storedCred_STR.split("\n");
        credentials.forEach((item, i) => {
            const thisCreds = item.split(";");
            creds_ARRAY.push({
                email: thisCreds[0],
                pwd: thisCreds[1],
                id: i//FlatList needs
            })
        })


    }


    const saveCredential = async () => {
        formatCreds()//Format data
        try {
            //Save in asyncstorage
            await AsyncStorage.setItem("credentials", encryptData(storedCred_STR));
            setStoredCred(creds_ARRAY);
        } catch (error) {
            Alert.alert("Errore", "Impossibile salvare le credenziali")
        }
    }
    const cleanCredentials = async () => {
        try {
            await AsyncStorage.removeItem("credentials");
            setStoredCred([])
        } catch (error) {
            Alert.alert("Errore", "Impossibile rimuovere le credenziali")
        }
    }

    const retrieveData = async () => {
        try {
            const cred = await AsyncStorage.getItem("credentials");
            if (cred != null) {//Error proof, esistono dei dati salvati
                //Salvataggio sullo state
                const credentials = decryptData(cred).split("\n");
                credentials.forEach((item, i) => {
                    const thisCreds = item.split(";");
                    creds_ARRAY.push({
                        email: thisCreds[0],
                        pwd: thisCreds[1],
                        id: i//FlatList needs
                    })
                })
                setStoredCred(creds_ARRAY);

            }
        } catch (error) {
            console.log(error)
            Alert.alert("Errore", "Impossibile caricare le credenziali")
        }
    }

    //Funzione che viene lanciata appena si apre questa pagina
    useEffect(() => {
        retrieveData()
    }, [])



    const { width } = useWindowDimensions();//Destrutturazione
    return (
        <SafeAreaView style={{ flex: 1, height: "100%", backgroundColor: Colors.white }}>
            {/* HEADER */}
            <HeaderPage title={"Storage"} />


            {/* MOSTRA PWD */}
            <FlatList
                extraData={storedCred}
                data={storedCred}
                keyboardShouldPersistTaps={"never"}
                keyboardDismissMode={"on-drag"}
                ListEmptyComponent={<Text style={Styles.generalText}>Non ci sono dati salvati</Text>}
                ListFooterComponent={
                    <>
                        {
                            storedCred.length != 0 &&//mostra il pulsante elimina solo se ci sono effetivamente dei dati salvati
                            <TouchableOpacity onPress={cleanCredentials}
                                style={{ backgroundColor: Colors.red, margin: 10, borderRadius: 12 }}>
                                <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }}>
                                    Elimina
                                </Text>
                            </TouchableOpacity>
                        }
                    </>
                }
                ListHeaderComponent={
                    <>
                        {/* USER INPUT */}
                        <View View style={{ width: width }}>
                            {/* USERNAME O EMAIL */}
                            <View style={{ margin: 10, flexDirection: "row", alignItems: "center", }}>
                                <Text style={Styles.generalText}>
                                    <Ionicons name={"ios-document-text"} size={24} color={Colors.darkblue} />
                                </Text>
                                <TextInput
                                    style={{ fontSize: 24, marginLeft: 10, width: width - 100, borderBottomColor: Colors.lightgray, borderBottomWidth: 1, height: 50 }}
                                    placeholder="File di testo"
                                    value={storedCred_STR}
                                    onChangeText={e => setStoredCred_STR(e)}
                                    multiline
                                />
                            </View>

                            <TouchableOpacity onPress={saveCredential}
                                style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                                <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                                    Salva
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>}
                keyExtractor={(e) => e.id}
                renderItem={({ item }) =>
                    <View style={{
                        padding: 10, margin: 10, marginBottom: 0,
                        width: "auto", height: "auto", borderColor: Colors.middleblue, borderWidth: 1, borderRadius: 15
                    }}>

                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <Text style={Styles.generalText}><Ionicons name="mail-outline" size={24} color={Colors.darkblue} /></Text>
                            <Text style={[Styles.generalText, { backgroundColor: Colors.white }]}>{item.email}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                            <Text style={Styles.generalText}><Ionicons name="ios-key-outline" size={24} color={Colors.darkblue} /></Text>
                            <TextInput
                                style={[Styles.generalText, { backgroundColor: Colors.white }]}
                                value={item.pwd}
                                editable={false}
                                secureTextEntry={item.id != view_FL_PWD_I}
                            />
                            <Ionicons name={item.id != view_FL_PWD_I ? "eye-off-outline" : "eye-outline"} size={24} color={Colors.darkblue} onPress={() => {
                                if (view_FL_PWD_I != item.id) {
                                    setView_FL_PWD_I(item.id)
                                }
                                else {
                                    setView_FL_PWD_I(-1)
                                }
                            }} />

                        </View>
                    </View>}
            />



        </SafeAreaView >
    );
}
const Styles = StyleSheet.create({
    generalText: {
        fontSize: 20,
        color: Colors.darkblue,
        backgroundColor: Colors.lightgray,
        padding: 10,
        borderRadius: 12
    }
})

export default PwdStorer;