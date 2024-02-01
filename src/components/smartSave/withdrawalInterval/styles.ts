import {padding} from 'helpers/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  interval: {
    gap: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 14,
    ...padding(10, 14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
