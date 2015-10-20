interface WebkitStorageInfo {
    queryUsageAndQuota(storageType: number, successCallback?: (bytesUsed: number, bytesRemaining: number) => void , errorCallback?: (error: Error) => void ): void;
    requestQuota(storageType: number, newQuotaInBytes: number, successCallback?: (bytesGranted: number) => void , errorCallback?: (error: Error) => void ): void;
}

interface WebkitStorage {
    queryUsageAndQuota(successCallback?: (bytesUsed: number, bytesRemaining: number) => void , errorCallback?: (error: Error) => void ): void;
    requestQuota(newQuotaInBytes: number, successCallback?: (bytesGranted: number) => void , errorCallback?: (error: Error) => void ): void;
}

interface WebkitWindow extends Window {
    webkitStorageInfo: WebkitStorageInfo;
}

interface WebkitNavigator extends Navigator {
    webkitTemporaryStorage: WebkitStorage;
    webkitPersistentStorage: WebkitStorage;
}