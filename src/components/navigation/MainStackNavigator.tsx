import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { OfferDetailScreen } from '@/screens/home/OfferDetailScreen';
import { ScannerScreen } from '@/screens/scanner/ScannerScreen';
import { PostScanScreen } from '@/screens/scanner/PostScanScreen';
import { PaywallScreen } from '@/screens/paywall/PaywallScreen';
import { SubscribedScreen } from '@/screens/paywall/SubscribedScreen';
import { SavingsScreen } from '@/screens/profile/SavingsScreen';
import { HistoryScreen } from '@/screens/profile/HistoryScreen';
import { FavorisScreen } from '@/screens/profile/FavorisScreen';
import { SettingsScreen } from '@/screens/settings/SettingsScreen';
import { AccountInfoScreen } from '@/screens/settings/AccountInfoScreen';
import { SubscriptionScreen } from '@/screens/settings/SubscriptionScreen';
import { FAQScreen } from '@/screens/settings/FAQScreen';
import { ContactScreen } from '@/screens/settings/ContactScreen';
import { MyDataScreen } from '@/screens/settings/MyDataScreen';
import { LegalDocScreen } from '@/screens/settings/LegalDocScreen';
import { PayoutsHistoryScreen } from '@/screens/parrainage/PayoutsHistoryScreen';
import { PayoutDetailScreen } from '@/screens/parrainage/PayoutDetailScreen';
import { RIBFormScreen } from '@/screens/parrainage/RIBFormScreen';
import { ParrainageConditionsScreen } from '@/screens/parrainage/ParrainageConditionsScreen';
import type { MainStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabNavigator} />
      <Stack.Screen name="OfferDetail" component={OfferDetailScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Scanner" component={ScannerScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="PostScan" component={PostScanScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Paywall" component={PaywallScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Subscribed" component={SubscribedScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Savings" component={SavingsScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Favoris" component={FavorisScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="CancelSubscription" component={SubscriptionScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="FAQ" component={FAQScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="MyData" component={MyDataScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="LegalDoc" component={LegalDocScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="PayoutsHistory" component={PayoutsHistoryScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="PayoutDetail" component={PayoutDetailScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="RIBForm" component={RIBFormScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="ParrainageConditions" component={ParrainageConditionsScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}
