import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'search-history';

export async function getSearchHistory(): Promise<string[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function addToSearchHistory(term: string) {
  const history = await getSearchHistory();
  const newHistory = term.length > 0 ? [term, ...history.filter((t) => t !== term)].slice(0, 25) : history;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export async function clearSearchHistory() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
