
import React from 'react';
import { View, Text, StyleSheet } from 'indjs';

export default function StatCard({ title, value, color = '#007AFF', icon }) {
    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <View>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 20,
        width: '48%',
        height: 140,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 20,
    },
    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
    }
});
