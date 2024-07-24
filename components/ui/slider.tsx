import RNSlider from '@react-native-community/slider';
import { Platform } from 'react-native';

import { useColorScheme } from '@/lib/useColorScheme';
import { COLOR_THEME } from '@/lib/constants';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNSlider>) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? COLOR_THEME.dark : COLOR_THEME.light

  return (
    <RNSlider
      thumbTintColor={thumbTintColor ?? Platform.OS === 'ios' ? theme.primary : theme.background}
      minimumTrackTintColor={minimumTrackTintColor ?? theme.primary}
      maximumTrackTintColor={
        maximumTrackTintColor ?? Platform.OS === 'android' ? theme.primary : undefined
      }
      {...props}
    />
  );
}

export { Slider };