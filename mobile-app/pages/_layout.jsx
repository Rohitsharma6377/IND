import React from 'react';
import { Provider } from 'react-redux';
import { View, SafeAreaView } from 'indjs';
import { store } from '../utils/persistedStore';
import BottomNav from '../components/BottomNav';
import '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <View className="min-h-screen bg-gray-50">
          {/* Main Content */}
          <View className="pb-24 flex-1">
            {children}
          </View>

          {/* Bottom Navigation */}
          <BottomNav />
        </View>
      </SafeAreaView>
    </Provider>
  );
}