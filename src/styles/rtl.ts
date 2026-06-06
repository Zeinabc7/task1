import { I18nManager, TextStyle, ViewStyle } from 'react-native';

export const isRTL = I18nManager.isRTL;

export const rtlRow: ViewStyle = {
  flexDirection: isRTL ? 'row-reverse' : 'row',
};

export const rtlText: TextStyle = {
  textAlign: isRTL ? 'right' : 'left',
  writingDirection: isRTL ? 'rtl' : 'ltr',
};