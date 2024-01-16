import Icons from './Icons';
import {useEffect} from 'react';
import {View} from '../_ui/themed';
import layout from 'constants/layout';
import Image from 'react-native-fast-image';
import {useApp} from 'providers/AppProvider';
import {Text} from 'components/_ui/typography';
import {useSettings} from 'providers/SettingsProvider';
import {RootStackScreenProps} from 'typings/navigation';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface LoaderProps {
  isComponent?: boolean;
}

const Loader = ({
  navigation,
  isComponent = false,
}: RootStackScreenProps<'Loader'> & LoaderProps) => {
  const insets = useSafeAreaInsets();
  const {account} = useApp();
  const {isAuthorized, isBiometricsSupported, biometricsAuth} = useSettings();

  useEffect(() => {
    if (isComponent) return;
    if (!isAuthorized) return;
    navigation.replace(account ? 'Main' : 'Onboarding');
  }, [isAuthorized]);

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

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
          bottom: insets.bottom + layout.height * 0.14,
        }}>
        <TouchableOpacity
          onPress={() => {
            biometricsAuth();
          }}
          style={{
            gap: 12,
            width: '40%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 15}}>Unlock to continue</Text>
          {isBiometricsSupported ? (
            <Icons.FaceID size={50} />
          ) : (
            <Icons.FaceID size={50} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Loader;
