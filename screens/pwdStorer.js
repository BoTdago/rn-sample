import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, TextInput, useWindowDimensions, View, StyleSheet, TouchableOpacity } from "react-native";
import { HeaderPage, } from "../assets/generalComponents";
import { Colors } from "../assets/Styles";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PwdStorer = () => {

    //States PROVA
    const [viewPwd, setViewPwd] = useState(true)
    const [view_FL_PWD_I, setView_FL_PWD_I] = useState(-1);
    const [email, setEmail] = useState("");//Può essere una mail, username, ecc...
    const [pwd, setPwd] = useState("");
    const [storedCred, setStoredCred] = useState([]);


    const checkCorrectANDDuplicate = () => {
        //Campi vuoti
        if (email === "" || pwd === "") {
            Alert.alert("Errore", "Email o password non possono essere vuoti");
            return false;
        }
        const allMails = storedCred.map(element => element.email);//Prendi tutte le mail
        allMails.push(email);//Agigungi quella che si vuole mettere
        const duplicates = allMails.filter((item, i) => allMails.indexOf(item) != i); //Prendi tutti i duplicati
        if (duplicates.length !== 0) {//Ci sono duplicati se la lunghezza è diversa da 0
            Alert.alert("Errore", "Non ci possono essere email o username duplicati");
            return false;
        }

        return true;
    }


    const saveCredential = async () => {

        //Controlla che i campi siano corretti
        if (!checkCorrectANDDuplicate()) {
            return;
        }


        //Aggiungi le nuove credenziali

        let cred = [...storedCred];
        cred.push({
            email: email,
            pwd: pwd,
            id: cred.length === 0 ? 0 : cred[cred.length - 1].id + 1
        })
        try {
            await AsyncStorage.setItem("credentials", JSON.stringify(cred));
        } catch (error) {
            console.log(error)
        }
        finally {
            setStoredCred(cred);
        }
    }

    const getAllCred = async () => {
        try {
            const cred = await AsyncStorage.getItem("credentials");
            if (cred != null) {
                //Error proof, esistono dei dati salvati
                const cred_ARR = JSON.parse(cred);
                for (let i = 0; i < cred_ARR.length; i++) {
                    cred_ARR[i].id = i;
                }
                setStoredCred(cred_ARR);
            }
        } catch (error) {
            Alert.alert("Errore", "Impossibile caricare le credenziali")
        }
    }

    //Funzione che viene lanciata appena si apre questa pagina
    useEffect(() => {
        getAllCred()
    }, [])



    const { width } = useWindowDimensions();
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
                ListHeaderComponent={
                    <>
                        {/* USER INPUT */}
                        <View View style={{ width: width }}>
                            {/* USERNAME O EMAIL */}
                            <View style={{ margin: 10, flexDirection: "row", alignItems: "center", }}>
                                <Text style={Styles.generalText}>@</Text>
                                <TextInput
                                    style={{ fontSize: 24, marginLeft: 10, width: width - 100, borderBottomColor: Colors.lightgray, borderBottomWidth: 1, height: 50 }}
                                    placeholder="email/username"
                                    value={email}
                                    onChangeText={e => setEmail(e)}
                                />
                            </View>

                            {/* PWD */}
                            <View style={{ margin: 10, flexDirection: "row", alignItems: "center", }}>
                                <Text style={Styles.generalText} >
                                    <Ionicons name={"lock-closed"} size={24} color={Colors.darkblue} />
                                </Text>
                                <TextInput
                                    style={{
                                        fontSize: 24,
                                        marginLeft: 10,
                                        width: width - 100,
                                        borderBottomColor: Colors.lightgray,
                                        borderBottomWidth: 1,
                                        height: 50,
                                    }}
                                    placeholder="pwd"
                                    secureTextEntry={viewPwd}
                                    value={pwd}
                                    onChangeText={e => setPwd(e)}
                                />
                                <Ionicons name={viewPwd ? "eye-off-outline" : "eye-outline"} size={24} color={Colors.darkblue} onPress={() => setViewPwd(!viewPwd)} />
                            </View>

                            <TouchableOpacity onPress={saveCredential}
                                style={{ backgroundColor: Colors.middleblue, margin: 10, borderRadius: 12 }}>
                                <Text style={{ fontSize: 20, color: Colors.white, padding: 10, borderRadius: 12, textAlign: "center" }} >
                                    Salva
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>}
                keyExtractor={(i) => i.id}
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
                                value={item.pwd + "dsd"}
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



        </SafeAreaView>
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