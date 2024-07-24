import { Switch } from 'react-native';

import { useColorScheme } from '@/lib/useColorScheme';
import { COLOR_THEME } from '@/lib/constants';

function Toggle(props: React.ComponentPropsWithoutRef<typeof Switch>) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? COLOR_THEME.dark : COLOR_THEME.light

  return (
    <Switch
      trackColor={{
        true: theme.primary,
        false: theme.notification,
      }}
      thumbColor={theme.background}
      {...props}
    />
  );
}

export { Toggle };