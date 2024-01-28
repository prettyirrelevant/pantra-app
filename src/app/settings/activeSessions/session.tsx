import React from 'react';
import {colors} from 'utils/Theming';
import {Trash} from 'phosphor-react-native';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RgText, Text} from 'components/_ui/typography';

interface SessionProps {
  session: {
    icon: any;
    desc: any;
    url: string;
    name: string;
  };
}

const Session = ({session}: SessionProps) => {
  return (
    <>
      <View style={styles.platformDetails}>
        <View style={[styles.imageContainer]}>
          <FastImage
            resizeMode="cover"
            source={session?.icon}
            style={[styles.platformImage]}
          />
        </View>

        <View style={[styles.platformInfo]}>
          <Text style={{fontSize: 16}}>{session?.name}</Text>

          <View style={[styles.platformInfo_desc]}>
            <RgText style={{color: colors.subText, fontSize: 14}}>
              {session?.desc}
            </RgText>
            <RgText style={{color: colors.subText, fontSize: 13}}>
              {session?.url}
            </RgText>
          </View>
        </View>

        <View style={[styles.icon]}>
          <Trash size={20} weight="regular" color={colors.warning} />
        </View>
      </View>
    </>
  );
};

export default Session;

const styles = StyleSheet.create({
  platformDetails: {
    gap: 18,
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  imageContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors?.accent,
  },
  platformImage: {
    width: '100%',
    height: '100%',
  },
  platformInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  platformInfo_desc: {
    gap: 2,
    flexDirection: 'column',
  },

  icon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
