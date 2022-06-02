import React, {useState, useEffect} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

// Images
import iconBlack from './src/assets/icons/eco-light-off.png';
import iconLight from './src/assets/icons/eco-light.png';
import logoDioWhite from './src/assets/icons/logo-dio-white.png';
import logoDioBlack from './src/assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  function handleChangeTogget() {
    setToggle(valueTogget => !valueTogget);
  }

  useEffect(() => {
    //Liga o flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(valueTogget => !valueTogget);
    });

    //essa funcao vai ser chamada quando o component for chamado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLinght : style.container}>
      <StatusBar
        backgroundColor={toggle ? 'white' : 'black'}
        barStyle={toggle ? 'dark-content' : 'light-content'}
      />
      <TouchableOpacity onPress={handleChangeTogget}>
        <Image
          source={toggle ? iconLight : iconBlack}
          style={toggle ? style.lightingOn : style.lightingOff}
        />

        <Image
          style={style.dioLogo}
          source={toggle ? logoDioBlack : logoDioWhite}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLinght: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    tintColor: 'white',
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
