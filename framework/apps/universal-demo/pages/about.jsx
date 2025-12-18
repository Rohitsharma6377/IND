import React from 'react';
import { Screen, Container, Stack, Text, Grid, Card, Button, View, Link } from 'indjs';

export default function About() {
    return (
        <Screen background="light" className="bg-gradient-to-br from-purple-50 to-blue-50">
            <Container maxWidth="xl">
                <Stack spacing={12}>
                    {/* Header */}
                    <Stack spacing={4} align="center">
                        <Text className="text-5xl font-bold text-center text-gray-900">
                            About Universal Demo
                        </Text>
                        <Text className="text-xl text-gray-600 text-center">
                            A showcase of INDJS Framework's universal capabilities
                        </Text>
                    </Stack>

                    {/* What is Universal Demo */}
                    <Container maxWidth="xl" padding={false}>
                        <Card>
                            <Stack spacing={4}>
                                <Text className="text-3xl font-bold text-gray-900">
                                    What is Universal Demo?
                                </Text>
                                <Text className="text-gray-700 leading-relaxed">
                                    Universal Demo is a reference implementation showcasing how a single INDJS codebase
                                    can run seamlessly across multiple platforms: web browsers, desktop applications
                                    (via Electron), and mobile devices (via Capacitor).
                                </Text>
                                <Text className="text-gray-700 leading-relaxed">
                                    This demonstrates the true power of modern web technologies combined with
                                    INDJS's flexible architecture - write once, deploy everywhere.
                                </Text>
                            </Stack>
                        </Card>
                    </Container>

                    {/* Key Features */}
                    <Container maxWidth="xl" padding={false}>
                        <Card>
                            <Stack spacing={6}>
                                <Text className="text-3xl font-bold text-gray-900">
                                    ✨ Key Features
                                </Text>
                                <Grid columns={{ default: 1, md: 2 }} gap={6}>
                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            🌐 Web-First Design
                                        </Text>
                                        <Text className="text-gray-700">
                                            Built with modern web standards using React 18, with server-side
                                            rendering and static site generation support.
                                        </Text>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            🖥️ Desktop Native
                                        </Text>
                                        <Text className="text-gray-700">
                                            Packages as native desktop applications for Windows, macOS, and Linux
                                            using Electron with full system integration.
                                        </Text>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            📱 Mobile Ready
                                        </Text>
                                        <Text className="text-gray-700">
                                            Compiles to native iOS and Android apps with access to device APIs
                                            through Capacitor plugins.
                                        </Text>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            ⚡ Blazing Fast
                                        </Text>
                                        <Text className="text-gray-700">
                                            Powered by Vite for instant hot module replacement and optimized
                                            production builds with code splitting.
                                        </Text>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            🎨 Beautiful UI
                                        </Text>
                                        <Text className="text-gray-700">
                                            Styled with Tailwind CSS for rapid, responsive, and beautiful
                                            interface development.
                                        </Text>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Text className="text-xl font-semibold text-blue-600">
                                            🔧 Developer Friendly
                                        </Text>
                                        <Text className="text-gray-700">
                                            Complete with hot reload, error overlays, TypeScript support,
                                            and comprehensive tooling.
                                        </Text>
                                    </Stack>
                                </Grid>
                            </Stack>
                        </Card>
                    </Container>

                    {/* Technology Stack */}
                    <Container maxWidth="xl" padding={false}>
                        <Card>
                            <Stack spacing={6}>
                                <Text className="text-3xl font-bold text-gray-900">
                                    🛠️ Technology Stack
                                </Text>
                                <Stack spacing={4}>
                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">Framework:</Text>
                                        <Text className="text-gray-600">INDJS v3.0.1 - Next generation React framework</Text>
                                    </Stack>

                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">UI Library:</Text>
                                        <Text className="text-gray-600">React 18.2.0 - Component-based UI library</Text>
                                    </Stack>

                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">Styling:</Text>
                                        <Text className="text-gray-600">Tailwind CSS 3.4.1 - Utility-first CSS framework</Text>
                                    </Stack>

                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">Build Tool:</Text>
                                        <Text className="text-gray-600">Vite 5.4.0 - Next generation frontend tooling</Text>
                                    </Stack>

                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">Desktop:</Text>
                                        <Text className="text-gray-600">Electron 28.0.0 - Cross-platform desktop apps</Text>
                                    </Stack>

                                    <Stack direction="horizontal" spacing={4}>
                                        <Text className="w-32 font-semibold text-gray-700">Mobile:</Text>
                                        <Text className="text-gray-600">Capacitor 6.0.0 - Native mobile development</Text>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Card>
                    </Container>

                    {/* Get Started */}
                    <Container maxWidth="lg" padding={false}>
                        <Card variant="gradient">
                            <Stack spacing={6}>
                                <Text className="text-3xl font-bold">🚀 Get Started</Text>
                                <Text className="text-lg opacity-90">
                                    Ready to build your own universal application?
                                </Text>
                                <Stack direction="horizontal" spacing={4}>
                                    <Link href="/">
                                        <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                            ← Back to Home
                                        </Button>
                                    </Link>
                                    <Link href="https://github.com/Rohitsharma6377/IND">
                                        <Button className="bg-gray-900 hover:bg-gray-800">
                                            View on GitHub →
                                        </Button>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Card>
                    </Container>

                    {/* Footer */}
                    <Stack align="center" className="text-gray-500">
                        <Text className="text-center">Built with ❤️ using INDJS Framework v3.0.1</Text>
                    </Stack>
                </Stack>
            </Container>
        </Screen>
    );
}