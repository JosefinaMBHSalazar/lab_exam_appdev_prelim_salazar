import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const categoryOptions = ['All', 'Food', 'Transpo', 'Bills'];
const initialExpenses: Array<{ id: string; title: string; amount: number; category: string; date: string }> = [];

export default function HomeScreen() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Food');
  const [filter, setFilter] = useState('All');

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const filteredExpenses = filter === 'All' ? expenses : expenses.filter((item) => item.category === filter);

  const addExpense = () => {
    const amount = Number(price);
    if (!name.trim() || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    const newExpense = {
      id: String(Date.now()),
      title: name.trim(),
      amount,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    setExpenses([newExpense, ...expenses]);
    setName('');
    setPrice('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Tracker</ThemedText>
      </View>

      <ThemedView style={styles.totalCard}>
        <ThemedText type="subtitle" style={styles.totalLabel}>
          Total Cost
        </ThemedText>
        <ThemedText style={styles.totalAmount}>₱{total.toFixed(2)}</ThemedText>
      </ThemedView>

      <View style={styles.formCard}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Item (Baon, Pamasahe)"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="Amount (₱)"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.categoryRow}>
          {['Food', 'Transpo', 'Bills'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setCategory(option)}
              style={[
                styles.categoryButton,
                category === option && styles.categoryButtonActive,
              ]}
            >
              <ThemedText style={category === option ? styles.categoryTextActive : styles.categoryText}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <ThemedText style={styles.addButtonText}>+ Add Expense</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {categoryOptions.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setFilter(option)}
            style={[
              styles.filterButton,
              filter === option && styles.filterButtonActive,
            ]}
          >
            <ThemedText style={filter === option ? styles.filterTextActive : styles.filterText}>
              {option}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.expenseRow}>
            <View>
              <ThemedText style={styles.expenseTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.expenseMeta}>
                {item.category} · {item.date}
              </ThemedText>
            </View>
            <ThemedText style={styles.expenseAmount}>₱{item.amount.toFixed(2)}</ThemedText>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No expenses found.</ThemedText>
          </View>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#1f2937',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  totalCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#10b981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  totalLabel: {
    color: '#ecfccb',
    marginBottom: 8,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  categoryButtonActive: {
    backgroundColor: '#10b981',
  },
  categoryText: {
    color: '#d1d5db',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  addButton: {
    marginTop: 4,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#1f2937',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1f2937',
  },
  filterText: {
    color: '#d1d5db',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#1f2937',
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  expenseMeta: {
    marginTop: 4,
    color: '#9ca3af',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptyState: {
    marginTop: 24,
    padding: 24,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  },
});
