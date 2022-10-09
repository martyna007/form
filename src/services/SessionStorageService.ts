import {UserData} from '../types'

export default class SessionStorageService {
    private static instance: SessionStorageService

    public static getInstance(): SessionStorageService {
        if (this.instance) {
            return this.instance
        } else {
            return this.instance = new SessionStorageService()
        }
    }
    public saveUserData(data: UserData): void {
        sessionStorage.setItem('userData', JSON.stringify(data))
    }
    public getUserData(): UserData {
        return SessionStorageService.getInstance().isUserData() && JSON.parse(sessionStorage.getItem('userData') as string)
    }
    public isUserData(): boolean {
        return sessionStorage.getItem('userData') !== null
    }
    public removeUserData(): void {
        sessionStorage.removeItem('userData')
    }
}