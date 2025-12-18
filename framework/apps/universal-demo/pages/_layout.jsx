import React from 'react';
import { View } from 'indjs';

export default function Layout({ children }) {
  return (
    <View className="min-h-screen bg-white">
      {children}
    </View>
  );
}