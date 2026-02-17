import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastService } from '@services/toast.service';

export class AsyncStorageService {
    public static set(key: string, value: string) {
        return AsyncStorage.setItem(key, value)
            .catch(ToastService.errorCallback);
    }
    public static async setObject(key: string, value: object) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            ToastService.error((err as Error).message);
        }
    }
    public static get(key: string) {
        return AsyncStorage.getItem(key)
            .catch(ToastService.errorCallback);
    }
    public static async getObject<T extends object>(key: string): Promise<T | null> {
        try {
            const result = await AsyncStorage.getItem(key)

            return result ? JSON.parse(result) as T : null;
        } catch (err) {
            ToastService.error((err as Error).message);
            return null;
        }
    }
    public static multiSet(keyValues: Record<string, string>) {
        return AsyncStorage.multiSet(Object.entries(keyValues))
            .catch(ToastService.errorCallback);
    }
    public static multiGet(keys: string[]) {
        return AsyncStorage.multiGet(keys)
            .catch(ToastService.errorCallback);
    }
    public static async multiGetObjects<T>(keys: string[]): Promise<[string, T | null][] | null> {
        const data = await AsyncStorage.multiGet(keys)
            .catch(ToastService.errorCallback);

        if(!data) return null;

        return data.map(([key, value]) => {
            if (value) {
                return [key, JSON.parse(value) as T]
            }
            return [key, null];
        });
    }
    public static async multiSetObjects<T extends object>(keys: string[], objects: T[]) {
        const keyValues: [string, string][] = objects.map((item, index) => [keys[index], JSON.stringify(item)])
        await AsyncStorage.multiSet(keyValues)
            .catch(ToastService.errorCallback);
    }
    public static async multiMergeObjects<T>(keyValues: [string, T][]) {
        const keys: [string, string][] = keyValues.map(([key, value]) => [key, JSON.stringify(value)]);

        await AsyncStorage.multiMerge(keys)
            .catch(ToastService.errorCallback);
    }

    public static clearStorage() {
        void AsyncStorage.clear()
            .then(() => console.log('[AsyncStorageService] clear storage'));
    }

    public static multiRemove(keys: string[]) {
        return AsyncStorage.multiRemove(keys)
            .catch(ToastService.errorCallback)
    }public static remove(key: string) {
        return AsyncStorage.removeItem(key)
            .catch(ToastService.errorCallback)
    }

    public static getAllKeys() {
        return AsyncStorage.getAllKeys()
            .catch(ToastService.errorCallback)
    }

    public static mergeObject<T>(key: string, value: T) {
        AsyncStorage.mergeItem(key, JSON.stringify(value))
            .catch(ToastService.errorCallback)
    }

}