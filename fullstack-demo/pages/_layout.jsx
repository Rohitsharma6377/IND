import React from 'react';
import { SafeAreaView, View, Text } from 'indjs';

export default function Layout({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <Text className="text-xl font-bold text-indigo-600">Universal App</Text>
        <View className="hidden md:flex flex-row gap-4">
           <Text className="text-gray-600 hover:text-indigo-600 cursor-pointer">Start</Text>
           <Text className="text-gray-600 hover:text-indigo-600 cursor-pointer">About</Text>
        </View>
      </View>
      <View className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8">
        {children}
      </View>
      {/* Mobile Tab Bar (Visible only on small screens) */}
      <View className="md:hidden flex-row justify-around p-4 border-t border-gray-100 bg-white pb-safe">
         <Text className="text-sm font-medium text-indigo-600">Home</Text>
         <Text className="text-sm font-medium text-gray-500">Settings</Text>
      </View>
    </SafeAreaView>
  );
}