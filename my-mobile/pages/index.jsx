
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'indjs';
import Header from '../components/Header.jsx';
import StatCard from '../components/StatCard.jsx';
import TaskCard from '../components/TaskCard.jsx';

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Standup', time: '10:00 AM', completed: true },
    { id: 2, title: 'Design Review', time: '11:30 AM', completed: false },
    { id: 3, title: 'Client Meeting', time: '2:00 PM', completed: false },
    { id: 4, title: 'Code Refactoring', time: '4:00 PM', completed: false },
    { id: 5, title: 'Gym Workout', time: '6:30 PM', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header name="Alex" />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsRow}>
            <StatCard
              title="Pending"
              value={pendingCount}
              color="#5E5CE6"
              icon="⏳"
            />
            <StatCard
              title="Completed"
              value={completedCount}
              color="#30D158"
              icon="✓"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => Alert.alert('Sort', 'Sort by time or priority?')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {tasks.map(task => (
            <TaskCard
              key={task.id}
              title={task.title}
              time={task.time}
              isCompleted={task.completed}
              onPress={() => toggleTask(task.id)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('New Task', 'This would open a modal to add a task.')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    height: '100vh',
    overflow: 'hidden'
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seeAll: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    cursor: 'pointer'
  },
  fabIcon: {
    fontSize: 32,
    color: 'white',
    fontWeight: '300',
    lineHeight: 32,
    marginTop: -4
  }
});
