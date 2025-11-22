import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import { InventoryItem, loadItems, saveItems } from './storage'; 


type RootStackParamList = {
    List: undefined;
    Add: undefined;
};
type AddItemScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>;

const AddItemScreen: React.FC<AddItemScreenProps> = ({ navigation }) => {
    const [name, setName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [imageUri, setImageUri] = React.useState<string | null>(null);

    
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('ACCESS DENIED.', 'Permission Needed to access camera to save item.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name.trim() || !location.trim()) {
            Alert.alert('Incomplete Data', 'Location and Name are Mandatory.');
            return;
        }

        const newItem: InventoryItem = {
            id: Date.now(),
            name: name.trim(),
            location: location.trim(),
            imageUri: imageUri,
        };

        const currentItems = await loadItems();
        const newItems = [...currentItems, newItem];
        await saveItems(newItems);

        
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Item</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Item Name (e.g., Book X)"
                value={name}
                onChangeText={setName}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Location (e.g., Checkout 3, Section B)"
                value={location}
                onChangeText={setLocation}
            />

            {/* Button to Open Camera */}
            <TouchableOpacity onPress={takePhoto} style={styles.imageButton}>
                <Text style={styles.imageButtonText}>
                    📸 {imageUri ? 'Take Photo Again' : 'Take Item Photo'}
                </Text>
            </TouchableOpacity>

            {/* Image preview */}
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
            )}

            <TouchableOpacity 
                onPress={handleSave} 
                style={styles.saveButton}
            >
                <Text style={styles.saveButtonText}>Save Item</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1f2937' },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
    imageButton: { backgroundColor: '#059669', padding: 15, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
    imageButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    previewImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20, resizeMode: 'cover' },
    saveButton: { backgroundColor: '#4f46e5', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddItemScreen;