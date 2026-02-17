import * as SecureStore from 'expo-secure-store';
import { SecureStoreConstants } from '@shared/consts';

export class SecureStoreService {

    public static async setUserData(login: string, passwordHash: string) {
        await Promise.all([
            SecureStore.setItemAsync(SecureStoreConstants.userLogin, login),
            SecureStore.setItemAsync(SecureStoreConstants.userPassword, passwordHash)
        ]);

        console.log('[SecureStoreService] setUserData: user data set');
    }

    public static async clearStore() {
        await this.clearUserData();

        console.log('[SecureStoreService] clearStore: store cleared');
    }

    public static async clearUserData() {
        await Promise.all([
            SecureStore.deleteItemAsync(SecureStoreConstants.userLogin),
            SecureStore.deleteItemAsync(SecureStoreConstants.userPassword)
        ]);

        console.log('[SecureStoreService] clearUserData: userData cleared');
    }

    /**
     * init login and password from Storage
     */
    public static async getUserAuthData() {
        const login = await SecureStore.getItemAsync(SecureStoreConstants.userLogin)
        const pass = await SecureStore.getItemAsync(SecureStoreConstants.userPassword)

        console.log('[Init] getUserAuthDataFromSecureStore: got {login, pass} from SecureStore')

        return {
            login,
            pass,
        }
    }
}
