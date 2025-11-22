import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { InventoryItem, loadItems, saveItems } from './storage'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootStackParamList = {
    List: undefined;
    Add: undefined;
};
type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
    const [items, setItems] = React.useState<InventoryItem[]>([]);

    const fetchItems = async () => {
        const storedItems = await loadItems();
        setItems(storedItems);
    };

    
    useFocusEffect(
        useCallback(() => {
            fetchItems();
        }, [])
    );

    const deleteItem = async (id: number) => {
        const newItems = items.filter(item => item.id !== id);
        await saveItems(newItems);
        setItems(newItems);
    };

    const confirmDelete = (id: number) => {
        Alert.alert(
            "Confirm Delete",
            "¿Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteItem(id), style: "destructive" },
            ]
        );
    };

    const renderItem = ({ item }: { item: InventoryItem }) => (
        <View style={styles.itemContainer}>
            {/* shows image, if not a placeholder will be shown */}
            {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            ) : (
                <View style={[styles.itemImage, styles.noImage]}>
                    <Text style={styles.noImageText}>No Photo</Text>
                </View>
            )}
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemLocation}>Location: {item.location}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Inventory</Text>
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No items. ¡Add one with the '+' Button!</Text>}
            />
            {/* Button to add */}
            <TouchableOpacity 
                onPress={() => navigation.navigate('Add')} 
                style={styles.addButton}
                accessibilityLabel="Add New Item"
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1f2937' },
    itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
    itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
    noImage: { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
    noImageText: { fontSize: 10, color: '#666' },
    itemDetails: { flex: 1 },
    itemName: { fontSize: 18, fontWeight: '600', color: '#1f2937' },
    itemLocation: { fontSize: 14, color: '#4b5563' },
    deleteButton: { padding: 8, backgroundColor: '#f8d7da', borderRadius: 50 },
    deleteButtonText: { fontSize: 20 },
    addButton: {
        position: 'absolute', right: 30, bottom: 30, backgroundColor: '#4f46e5', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8,
    },
    addButtonText: { fontSize: 30, color: '#fff', lineHeight: 30 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6b7280' },
});

export default ListScreen;