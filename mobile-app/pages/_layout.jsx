import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { View, Text, SafeAreaView, Pressable } from 'indjs';
import { store } from '../utils/store';
import BottomNav from '../components/BottomNav';
import '../styles/globals.css';

export default function Layout({ children, path }) {
  const [currentPage, setCurrentPage] = useState('tasks');
  const [pageContent, setPageContent] = useState(null);

  // Load page content dynamically
  useEffect(() => {
    const loadPage = async () => {
      try {
        let PageComponent;
        switch (currentPage) {
          case 'categories':
            PageComponent = (await import('./categories')).default;
            break;
          case 'statistics':
            PageComponent = (await import('./statistics')).default;
            break;
          case 'profile':
            PageComponent = (await import('./profile')).default;
            break;
          case 'tasks':
          default:
            PageComponent = (await import('./index')).default;
            break;
        }
        setPageContent(<PageComponent />);
      } catch (error) {
        console.error('Error loading page:', error);
        setPageContent(children);
      }
    };

    loadPage();
  }, [currentPage, children]);

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <View className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
          {/* Header */}
          <View className="bg-white shadow-md sticky top-0 z-40 backdrop-blur-lg bg-opacity-90">
            <View className="max-w-7xl mx-auto px-4 py-4">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-3">
                  <View className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </View>
                  <Text className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    TaskFlow
                  </Text>
                </View>

                <Pressable className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300">
                  <Text className="text-xl">🔔</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Main Content */}
          <View className="pb-24">
            {pageContent || children}
          </View>

          {/* Bottom Navigation */}
          <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        </View>
      </SafeAreaView>
    </Provider>
  );
}