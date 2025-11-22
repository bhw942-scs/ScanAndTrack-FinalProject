import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@InventoryTracker:items';


export interface InventoryItem {
  id: number;
  name: string;
  location: string;
  imageUri: string | null; 
}


export const saveItems = async (items: InventoryItem[]) => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving Data:", e);
  }
};


export const loadItems = async (): Promise<InventoryItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading Data:", e);
    return [];
  }
};