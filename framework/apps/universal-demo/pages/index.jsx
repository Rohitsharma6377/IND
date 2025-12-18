import React from 'react';
import { Screen, Container, Stack, Text, Grid, Card, Icon, Button, View, Link } from 'indjs';
import PlatformInfo from '../components/PlatformInfo.jsx';

export default function Home() {
  return (
    <Screen background="light">
      <Container maxWidth="xl">
        <Stack spacing={12}>
          {/* Header */}
          <Stack spacing={4} align="center">
            <Text className="text-5xl font-bold text-center text-gray-900">
              🚀 Universal Demo
            </Text>
            <Text className="text-xl text-gray-600 text-center">
              Built with <Text className="font-semibold text-blue-600 inline">INDJS Framework</Text>
            </Text>
            <Text className="text-gray-500 text-center">
              One codebase • Three platforms • Unlimited possibilities
            </Text>
          </Stack>

          {/* Platform Info Card */}
          <Container maxWidth="lg" padding={false}>
            <PlatformInfo />
          </Container>

          {/* Features Grid */}
          <Container maxWidth="2xl" padding={false}>
            <Grid columns={{ default: 1, md: 3 }} gap={6}>
              {/* Web Feature */}
              <Card hoverable>
                <Stack spacing={4}>
                  <Icon name="🌐" />
                  <Text className="text-xl font-bold text-gray-900">Web</Text>
                  <Text className="text-gray-600">
                    Modern web application with hot reload, SSR, and optimized performance.
                  </Text>
                  <View className="mt-4">
                    <Text className="text-sm text-gray-500">
                      <Text className="bg-gray-100 px-2 py-1 rounded font-mono inline-block">npm run dev</Text>
                    </Text>
                  </View>
                </Stack>
              </Card>

              {/* Desktop Feature */}
              <Card hoverable>
                <Stack spacing={4}>
                  <Icon name="🖥️" />
                  <Text className="text-xl font-bold text-gray-900">Desktop</Text>
                  <Text className="text-gray-600">
                    Native desktop app for Windows, macOS, and Linux using Electron.
                  </Text>
                  <View className="mt-4">
                    <Text className="text-sm text-gray-500">
                      <Text className="bg-gray-100 px-2 py-1 rounded font-mono inline-block">npm run desktop:dev</Text>
                    </Text>
                  </View>
                </Stack>
              </Card>

              {/* Mobile Feature */}
              <Card hoverable>
                <Stack spacing={4}>
                  <Icon name="📱" />
                  <Text className="text-xl font-bold text-gray-900">Mobile</Text>
                  <Text className="text-gray-600">
                    iOS and Android apps with native capabilities via Capacitor.
                  </Text>
                  <View className="mt-4">
                    <Text className="text-sm text-gray-500">
                      <Text className="bg-gray-100 px-2 py-1 rounded font-mono inline-block">npm run android:dev</Text>
                    </Text>
                  </View>
                </Stack>
              </Card>
            </Grid>
          </Container>

          {/* Tech Stack */}
          <Container maxWidth="lg" padding={false}>
            <Card>
              <Stack spacing={6}>
                <Text className="text-2xl font-bold text-gray-900 text-center">
                  ⚡ Tech Stack
                </Text>
                <Grid columns={{ default: 2, md: 4 }} gap={4}>
                  <Stack align="center" spacing={2}>
                    <Icon name="⚛️" size="large" />
                    <Text className="font-semibold">React 18</Text>
                  </Stack>
                  <Stack align="center" spacing={2}>
                    <Icon name="🎨" size="large" />
                    <Text className="font-semibold">Tailwind CSS</Text>
                  </Stack>
                  <Stack align="center" spacing={2}>
                    <Icon name="⚡" size="large" />
                    <Text className="font-semibold">Vite</Text>
                  </Stack>
                  <Stack align="center" spacing={2}>
                    <Icon name="🔧" size="large" />
                    <Text className="font-semibold">INDJS</Text>
                  </Stack>
                </Grid>
              </Stack>
            </Card>
          </Container>

          {/* Quick Start */}
          <Container maxWidth="lg" padding={false}>
            <Card className="bg-gray-900 text-white">
              <Stack spacing={4}>
                <Text className="text-2xl font-bold">🚀 Quick Start</Text>
                <Stack spacing={4}>
                  <View>
                    <Text className="text-gray-400 mb-2">Install dependencies:</Text>
                    <Text className="bg-black/50 px-4 py-2 rounded font-mono block">npm install</Text>
                  </View>
                  <View>
                    <Text className="text-gray-400 mb-2">Run development server:</Text>
                    <Text className="bg-black/50 px-4 py-2 rounded font-mono block">npm run dev</Text>
                  </View>
                  <View>
                    <Text className="text-gray-400 mb-2">Run as desktop app:</Text>
                    <Text className="bg-black/50 px-4 py-2 rounded font-mono block">npm run desktop:dev</Text>
                  </View>
                  <View>
                    <Text className="text-gray-400 mb-2">Setup Android:</Text>
                    <Text className="bg-black/50 px-4 py-2 rounded font-mono block">npm run android:setup</Text>
                  </View>
                </Stack>
              </Stack>
            </Card>
          </Container>

          {/* Footer */}
          <Stack align="center" spacing={2} className="text-gray-500">
            <Text className="text-center">Made with ❤️ using INDJS Framework</Text>
            <Link href="https://github.com/Rohitsharma6377/IND">
              <Text className="text-blue-600 hover:underline cursor-pointer">View on GitHub</Text>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Screen>
  );
}