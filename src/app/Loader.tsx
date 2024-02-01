import {StatusBar} from 'react-native';
import Image from 'react-native-fast-image';
import {View} from '../components/_ui/themed';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle="light-content" />

      <Image
        resizeMode={Image.resizeMode.contain}
        style={{width: '100%', height: '100%'}}
        source={require('assets/images/splash.png')}
      />
    </View>
  );
};

export default Loader;
