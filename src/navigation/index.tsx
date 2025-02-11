import TabIcon from './tabIcons';
import LottieView from 'lottie-react-native';
import Colors, {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import useColorScheme from 'hooks/useColorScheme';
import {TouchableOpacity, View} from 'react-native';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomSheetNavigator} from '@th3rdwave/react-navigation-bottom-sheet';
import {
  RootTabParamList,
  BottomSheetParams,
  RootStackParamList,
} from 'typings/navigation';

// Screens
import Home from 'app/home';
import ScanQR from 'app/scanQR';
import ShareQR from 'app/shareQR';
import Settings from 'app/settings';
import SmartSave from 'app/smartSave';
import Onboarding from 'app/onboarding';
import NFTPreview from 'app/NFTPreview';
import PairModal from 'app/modals/pairModal';
import SignTxnModal from 'app/modals/signTxn';
import Loader from 'components/_common/Loader';
import SelectAvatar from 'app/modals/selectAvatar';
import ImportWalletModal from 'app/modals/importWallet';
import TxnDetailsModal from 'app/modals/txnDetailsModal';
import EditWalletModal from 'app/modals/editWalletModal';
import PassphraseModal from 'app/modals/passphraseModal';
import WalletOptionsModal from 'app/modals/walletOptionsModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomBackground from 'components/modals/customBackground';

import Wallets from 'app/settings/wallets';
import Transactions from 'app/transactions';
import Currencies from 'app/settings/currencies';
import Preferences from 'app/settings/preferences';
import SecuritySettings from 'app/settings/security';
import EnterPasscode from 'app/passcode/enterPasscode';
import {useNavigation} from '@react-navigation/native';
import ActiveSessions from 'app/settings/activeSessions';
import CreatePasscode from 'app/passcode/createPasscode';
import ConfirmPasscode from 'app/passcode/confirmPasscode';
import SelectActionModal from 'app/modals/selectActionModal';

import SendETH from 'app/processTxns/send';
import {useWallet} from 'providers/WalletProvider';
import {useSession} from 'providers/SessionProvider';
import {useSettings} from 'providers/SettingsProvider';

// Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomSheet = createBottomSheetNavigator<BottomSheetParams>();

const EmptyComponent = () => <></>;

// BottomTab Icons
function TabBarIcon(props: {
  label: string;
  color: string;
  focused: boolean;
  children?: React.ReactNode;
}) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        gap: 4,
        minWidth: 40,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: props.label === 'tabBtn' ? 0 : 8,
      }}>
      <TabIcon
        label={props.label}
        color={props.color}
        focused={props.focused}
        children={props.children}
      />

      {props.label !== 'tabBtn' && (
        <Text
          style={{
            fontSize: 10,
            lineHeight: 13,
            color: props?.focused
              ? Colors[colorScheme].tint
              : Colors[colorScheme].tabIconDefault,
          }}>
          {props.label === 'smartSave'
            ? 'Smart Save'
            : props?.label?.charAt(0).toUpperCase() + props?.label?.slice(1)}
        </Text>
      )}
    </View>
  );
}

// Navigation Container
export default function Navigation() {
  return (
    <>
      <BottomSheetNavigator />
    </>
  );
}

// Bottom Sheet Navigator
const BottomSheetNavigator = () => {
  const insets = useSafeAreaInsets();
  const {pendingPair, declinePair} = useSession();

  return (
    <BottomSheet.Navigator
      initialRouteName="pairModal"
      screenOptions={{
        backdropComponent: props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        ),
      }}>
      <BottomSheet.Screen name="Root" component={RootNavigator} />

      {/* TabBar Button Options */}
      <BottomSheet.Screen
        name="selectActionModal"
        component={SelectActionModal}
        options={{
          snapPoints: [280],
          keyboardBlurBehavior: 'restore',
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* View Passphrase */}
      <BottomSheet.Screen
        name="viewPassphrase"
        component={PassphraseModal}
        options={{
          detached: true,
          snapPoints: [420],
          topInset: insets.top,
          enableOverDrag: false,
          handleComponent: null,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Edit Wallet */}
      <BottomSheet.Screen
        name="walletOptions"
        component={WalletOptionsModal}
        options={{
          detached: true,
          snapPoints: [350],
          enableOverDrag: false,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />
      <BottomSheet.Screen
        name="editWallet"
        component={EditWalletModal}
        options={{
          detached: true,
          snapPoints: [330],
          enableOverDrag: false,
          handleComponent: null,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          keyboardBlurBehavior: 'restore',
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Acct Setup */}
      <BottomSheet.Screen
        name="selectAvatar"
        component={SelectAvatar}
        options={{
          handleHeight: 0,
          snapPoints: ['46%'],
          handleComponent: null,
          backdropComponent: null,
          enableDismissOnClose: false,
          enablePanDownToClose: false,
          backgroundComponent: props => <CustomBackground {...props} />,
        }}
      />

      <BottomSheet.Screen
        name="importWalletModal"
        component={ImportWalletModal}
        options={{
          snapPoints: [256],
          enableOverDrag: true,
          overDragResistanceFactor: 3,
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => <CustomBackground {...props} />,
        }}
      />

      <BottomSheet.Screen
        name="txnDetails"
        component={TxnDetailsModal}
        options={{
          detached: true,
          snapPoints: [420],
          handleComponent: null,
          enableOverDrag: false,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Wallet Action modals */}
      <BottomSheet.Screen
        name="pairModal"
        component={PairModal}
        options={{
          onDismiss: () => {
            // if (pendingPair) declinePair(false);
          },
          detached: true,
          snapPoints: [330],
          enableOverDrag: false,
          handleComponent: null,
          bottomInset: insets.bottom,
          enableDismissOnClose: true,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      <BottomSheet.Screen
        name="signTxnModal"
        component={SignTxnModal}
        options={{
          detached: true,
          snapPoints: [640],
          topInset: insets.top,
          enableOverDrag: false,
          handleComponent: null,
          backdropComponent: null,
          bottomInset: insets.bottom,
          enableDismissOnClose: false,
          enablePanDownToClose: false,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />
    </BottomSheet.Navigator>
  );
};

//  Root Navigator
function RootNavigator() {
  const {account, isAcctReady} = useWallet();
  const {passcode, isAuthorized, loadingSettings} = useSettings();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAcctReady || loadingSettings ? (
        <Stack.Screen name="Loader" component={Loader} />
      ) : !account ? (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      ) : !!passcode && !isAuthorized ? (
        <>
          <Stack.Screen name="enterPasscode" component={EnterPasscode} />
        </>
      ) : (
        <Stack.Group>
          {/* <Stack.Screen name="sessions" component={ActiveSessions} /> */}
          <Stack.Screen name="Main" component={BottomTabNavigator} />

          <Stack.Screen name="sendETH" component={SendETH} />

          <Stack.Group>
            <Stack.Screen
              component={EnterPasscode}
              name="enterPasscodeInitial"
            />
            <Stack.Screen name="createPasscode" component={CreatePasscode} />
            <Stack.Screen name="confirmPasscode" component={ConfirmPasscode} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="NFTpreview" component={NFTPreview} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="wallets" component={Wallets} />
            <Stack.Screen name="currencies" component={Currencies} />
            <Stack.Screen name="preferences" component={Preferences} />
            <Stack.Screen name="sessions" component={ActiveSessions} />
            <Stack.Screen name="security" component={SecuritySettings} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen
              name="shareQR"
              component={ShareQR}
              options={{presentation: 'modal', animation: 'slide_from_bottom'}}
            />
            <Stack.Screen
              name="scanQR"
              component={ScanQR}
              options={{presentation: 'modal', animation: 'slide_from_bottom'}}
            />
          </Stack.Group>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabNavigator() {
  const {txnPending} = useWallet();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderTopWidth: 0.5,
          borderTopColor: '#1c1c1c',
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="home" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="smartSave"
        component={SmartSave}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="smartSave" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="tabBtn"
        component={EmptyComponent}
        options={() => ({
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('selectActionModal');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <TabBarIcon label="tabBtn" color={colors.primary} focused={true}>
                {txnPending && (
                  <LottieView
                    loop
                    autoPlay
                    speed={0.5}
                    style={{
                      width: 80,
                      height: 80,
                      marginTop: 5,
                      marginLeft: -15,
                      maxHeight: 100,
                      backgroundColor: 'transparent',
                    }}
                    source={require('assets/lotties/wave.json')}
                  />
                )}
              </TabBarIcon>
            </TouchableOpacity>
          ),
        })}
      />

      <BottomTab.Screen
        name="transactions"
        component={Transactions}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="transactions" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="settings" color={color} focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
