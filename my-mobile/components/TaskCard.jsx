
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'indjs';

export default function TaskCard({ title, time, isCompleted, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={[styles.checkbox, isCompleted && styles.checked]}>
                    {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, isCompleted && styles.completedTitle]}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={[styles.priority, { backgroundColor: '#FFD60A' }]} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#C7C7CC',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#34C759',
        borderColor: '#34C759',
    },
    checkmark: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#8E8E93',
    },
    time: {
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '500',
    },
    priority: {
        width: 4,
        height: 30,
        borderRadius: 2,
        marginLeft: 12,
    }
});
