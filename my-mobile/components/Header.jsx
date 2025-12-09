
import React from 'react';
import { View, Text, Image, StyleSheet } from 'indjs';

export default function Header({ name = "Rohit" }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }}
                style={styles.avatar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60, // Safe area top
        paddingBottom: 20,
    },
    greeting: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
    name: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1E',
        marginTop: 4,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#007AFF', // Premium blue
    }
});
