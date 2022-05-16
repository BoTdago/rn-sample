//React module
import { View, Text, Pressable, StyleSheet } from 'react-native';
//Styles and Icons
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './Styles';

export const HeaderPage = ({ title, }) => (
    <View style={Styles.headerPage}>
        <Text style={Styles.titlePage}>{title}</Text>
    </View>
)

export const Styles = StyleSheet.create({
    headerPage: {
        padding: 20,
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
    },
    titlePage:{
        fontSize: 24,
        color: Colors.middleblue,
        fontWeight: 'bold'
    },
    
})
