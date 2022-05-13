//react native Elements
import { StyleSheet, StatusBar, } from 'react-native';

//Styles components
import { Colors } from './assets/Styles';

//Nav compnenent
import RootNav from './nav/Root';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={Colors.middleblue} barStyle={"light-content"} />
      <RootNav />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
