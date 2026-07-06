import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { OffresScreen } from '@/screens/home/OffresScreen';
import { MapScreen } from '@/screens/home/MapScreen';
import { ParrainageScreen } from '@/screens/parrainage/ParrainageScreen';
import { ProfilScreen } from '@/screens/profile/ProfilScreen';
import { colors } from '@/constants/colors';
import type { MainTabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const INACTIVE = '#C4C8E8';

function GridIcon({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={7} height={7} rx={2} fill={color} />
      <Rect x={14} y={3} width={7} height={7} rx={2} fill={color} />
      <Rect x={3} y={14} width={7} height={7} rx={2} fill={color} />
      <Rect x={14} y={14} width={7} height={7} rx={2} fill={color} />
    </Svg>
  );
}

function MapPinIcon({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color} />
      <Circle cx={12} cy={9} r={2.5} fill="white" />
    </Svg>
  );
}

function GiftIcon({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={8} width={18} height={13} rx={2} fill={color} opacity={0.85} />
      <Rect x={2} y={6} width={20} height={5} rx={2} fill={color} />
      <Path d="M12 6V21" stroke="white" strokeWidth={1.5} />
      <Path d="M12 6C12 6 9 3 7.5 4.5C6 6 9 6 12 6" stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" />
      <Path d="M12 6C12 6 15 3 16.5 4.5C18 6 15 6 12 6" stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

function PersonIcon({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} fill={color} />
      <Path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={color} opacity={0.7} />
    </Svg>
  );
}

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: colors.s1,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 22,
          paddingTop: 8,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Offres"
        component={OffresScreen}
        options={{
          tabBarLabel: 'Offres',
          tabBarIcon: ({ color }) => <GridIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Carte"
        component={MapScreen}
        options={{
          tabBarLabel: 'Carte',
          tabBarIcon: ({ color }) => <MapPinIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Parrainage"
        component={ParrainageScreen}
        options={{
          tabBarLabel: 'Parrainage',
          tabBarIcon: ({ color }) => <GiftIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <PersonIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
