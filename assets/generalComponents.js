//React module
import { View, Text, Pressable, StyleSheet } from 'react-native';
//Styles and Icons
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './Styles';

export const HeaderPage = ({ title, }) => (
    <View style={{}}>
        <Text>{title}</Text>
    </View>
)

const Styles = StyleSheet.create({
    HeaderPageText: {
        padding: 10
    }
})

