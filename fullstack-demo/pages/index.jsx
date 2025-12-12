import React from 'react';
import { View, Text, Button } from 'indjs';

export default function Home() {
  return (
    <View className="space-y-4 p-4">
      <View className="bg-indigo-600 rounded-xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-white">Welcome</Text>
        <Text className="text-white opacity-90 mt-2">This is your new Universal App.</Text>
      </View>
      <View className="bg-white p-6 rounded-xl border border-gray-200">
         <Text className="text-gray-800 text-lg font-semibold">Get Started</Text>
         <Text className="text-gray-600 mt-2">Edit pages/index.js to change this screen.</Text>
         <Button className="mt-4" onClick={() => alert('Hello!')}>Click Me</Button>
      </View>
    </View>
  );
}