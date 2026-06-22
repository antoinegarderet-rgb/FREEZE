import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OffresScreen } from '@/screens/home/OffresScreen';
import { CarteScreen } from '@/screens/home/CarteScreen';
import { ParrainageScreen } from '@/screens/parrainage/ParrainageScreen';
import { ProfilScreen } from '@/screens/profile/ProfilScreen';
import { colors } from '@/constants/colors';
import type { MainTabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Offres: '🏠',
  Carte: '🗺️',
  Parrainage: '🎁',
  Profil: '👤',
};

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.t3,
        tabBarIcon: () => <Text>{TAB_ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Offres" component={OffresScreen} />
      <Tab.Screen name="Carte" component={CarteScreen} />
      <Tab.Screen name="Parrainage" component={ParrainageScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}
