import React from 'react';
import { Screen, Container, Stack, Text, Grid, Card, Icon, View, Link } from 'indjs';
import PlatformInfo from '../components/PlatformInfo.jsx';

export default function Home() {
  return (
    <Screen>
      {/* Hero Section Background */}
      <View className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-600 to-indigo-900" />

      <Container maxWidth="xl" className="relative z-10 pt-12 pb-24">
        <Stack spacing={12}>
          {/* Header */}
          <Stack spacing={6} align="center">
            <View className="bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-2xl">
              <Text className="text-6xl">🚀</Text>
            </View>
            <Stack spacing={2} align="center">
              <Text className="text-5xl font-extrabold text-center text-white drop-shadow-lg tracking-tight">
                Universal Demo
              </Text>
              <Text className="text-xl text-blue-100 text-center font-light max-w-2xl mx-auto leading-relaxed">
                Built with <Text className="font-semibold text-white inline border-b-2 border-blue-300">INDJS Framework</Text>
              </Text>
              <View className="flex flex-row gap-4 mt-2">
                <View className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20"><Text className="text-sm text-white font-medium">One Codebase</Text></View>
                <View className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20"><Text className="text-sm text-white font-medium">Native Performance</Text></View>
              </View>
            </Stack>
          </Stack>

          {/* Platform Info Card */}
          <Container maxWidth="lg" padding={false}>
            <View className="transform hover:scale-[1.01] transition-transform duration-500">
              <PlatformInfo />
            </View>
          </Container>

          {/* Features Grid */}
          <Container maxWidth="2xl" padding={false}>
            <Text className="text-3xl font-bold text-gray-800 text-center mb-10">Deploy Anywhere</Text>
            <Grid columns={{ default: 1, md: 3 }} gap={8}>
              {/* Web Feature */}
              <Card className="bg-white shadow-xl rounded-2xl border-t-4 border-blue-500 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Stack spacing={4} align="center">
                  <View className="bg-blue-50 p-4 rounded-full">
                    <Text className="text-4xl">🌐</Text>
                  </View>
                  <Stack spacing={2} align="center">
                    <Text className="text-xl font-bold text-gray-900">Web App</Text>
                    <Text className="text-gray-500 text-center text-sm leading-relaxed">
                      SSR, SEO-ready, and lightning fast. Deploys to Vercel, Netlify, or Docker.
                    </Text>
                  </Stack>
                  <View className="w-full bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <Text className="text-xs text-gray-400 font-mono text-center mb-1">$ Run Command</Text>
                    <Text className="text-sm text-center font-mono text-blue-600 bg-white py-1 px-2 rounded border border-gray-200 shadow-sm block">npm run dev</Text>
                  </View>
                </Stack>
              </Card>

              {/* Desktop Feature */}
              <Card className="bg-white shadow-xl rounded-2xl border-t-4 border-purple-500 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Stack spacing={4} align="center">
                  <View className="bg-purple-50 p-4 rounded-full">
                    <Text className="text-4xl">🖥️</Text>
                  </View>
                  <Stack spacing={2} align="center">
                    <Text className="text-xl font-bold text-gray-900">Desktop App</Text>
                    <Text className="text-gray-500 text-center text-sm leading-relaxed">
                      Native Windows, macOS, and Linux apps via Electron integration.
                    </Text>
                  </Stack>
                  <View className="w-full bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <Text className="text-xs text-gray-400 font-mono text-center mb-1">$ Run Command</Text>
                    <Text className="text-sm text-center font-mono text-purple-600 bg-white py-1 px-2 rounded border border-gray-200 shadow-sm block">npm run desktop:dev</Text>
                  </View>
                </Stack>
              </Card>

              {/* Mobile Feature */}
              <Card className="bg-white shadow-xl rounded-2xl border-t-4 border-green-500 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Stack spacing={4} align="center">
                  <View className="bg-green-50 p-4 rounded-full">
                    <Text className="text-4xl">📱</Text>
                  </View>
                  <Stack spacing={2} align="center">
                    <Text className="text-xl font-bold text-gray-900">Mobile App</Text>
                    <Text className="text-gray-500 text-center text-sm leading-relaxed">
                      Native iOS and Android apps powered by Capacitor.
                    </Text>
                  </Stack>
                  <View className="w-full bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <Text className="text-xs text-gray-400 font-mono text-center mb-1">$ Run Command</Text>
                    <Text className="text-sm text-center font-mono text-green-600 bg-white py-1 px-2 rounded border border-gray-200 shadow-sm block">npm run android:dev</Text>
                  </View>
                </Stack>
              </Card>
            </Grid>
          </Container>

          {/* Quick Start Terminal */}
          <Container maxWidth="lg" padding={false}>
            <View className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mx-auto max-w-4xl">
              <View className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <View className="w-3 h-3 rounded-full bg-red-500" />
                <View className="w-3 h-3 rounded-full bg-yellow-500" />
                <View className="w-3 h-3 rounded-full bg-green-500" />
                <Text className="text-xs text-gray-400 font-mono ml-4">term user@indjs-demo ~</Text>
              </View>
              <Stack spacing={0} className="p-6 font-mono text-sm">
                <View className="flex flex-row mb-4">
                  <Text className="text-green-400 mr-2">➜</Text>
                  <Text className="text-blue-300 mr-2">~</Text>
                  <Text className="text-white">npm install</Text>
                </View>
                <Text className="text-gray-500 mb-4">
                  added 142 packages, and audited 143 packages in 3s...
                </Text>
                <View className="flex flex-row mb-2">
                  <Text className="text-green-400 mr-2">➜</Text>
                  <Text className="text-blue-300 mr-2">~</Text>
                  <Text className="text-white">npm run dev</Text>
                </View>
                <Text className="text-green-300 animate-pulse">
                  🚀 INDJS Dev Server Running on http://localhost:3000
                </Text>
              </Stack>
            </View>
          </Container>

          {/* Footer */}
          <View className="border-t border-gray-200 py-8 mt-12">
            <Stack align="center" spacing={2} className="text-gray-500">
              <Text className="text-center font-medium">Made with ❤️ using INDJS Framework</Text>
              <Link href="https://github.com/Rohitsharma6377/IND">
                <Text className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer">View Documentation</Text>
              </Link>
            </Stack>
          </View>
        </Stack>
      </Container>
    </Screen>
  );
}