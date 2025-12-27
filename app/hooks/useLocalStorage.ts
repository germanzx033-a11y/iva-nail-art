'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for persistent localStorage with TypeScript support
 * Replaces window.storage with native localStorage API
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Use ref for initial value to avoid dependency issues
  const initialValueRef = useRef(initialValue);

  // Initialize state with a function to read from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`[Storage] Error reading "${key}":`, error);
      return initialValue;
    }
  });

  // Set value - use functional update to avoid stale closure
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(valueToStore) }));
        }

        return valueToStore;
      });
    } catch (error) {
      console.warn(`[Storage] Error saving "${key}":`, error);
    }
  }, [key]);

  // Remove value
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: null }));
      }
      setStoredValue(initialValueRef.current);
    } catch (error) {
      console.warn(`[Storage] Error removing "${key}":`, error);
    }
  }, [key]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// =============================================
// IVA NAIL ART SPECIFIC STORAGE
// =============================================

export interface NailDesign {
  id: string;
  color: string;
  colorName: string;
  shape: string;
  finish: string;
  createdAt: string;
  isFavorite: boolean;
  imageUrl?: string;
}

export interface UserPreferences {
  language: 'en' | 'es';
  favoriteColors: string[];
  recentColors: string[];
  preferredShape: string;
  preferredFinish: string;
  hasSeenOnboarding: boolean;
  lastVisit: string;
}

export interface ARSession {
  id: string;
  screenshot?: string;
  design: NailDesign;
  timestamp: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  favoriteColors: [],
  recentColors: [],
  preferredShape: 'almond',
  preferredFinish: 'glossy',
  hasSeenOnboarding: false,
  lastVisit: new Date().toISOString(),
};

/**
 * Hook for managing saved nail designs
 */
export function useSavedDesigns() {
  const [designs, setDesigns, clearDesigns] = useLocalStorage<NailDesign[]>('iva-saved-designs', []);

  const saveDesign = useCallback((design: Omit<NailDesign, 'id' | 'createdAt'>) => {
    const newDesign: NailDesign = {
      ...design,
      id: `design-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDesigns(prev => [newDesign, ...prev].slice(0, 50)); // Keep max 50 designs
    return newDesign;
  }, [setDesigns]);

  const removeDesign = useCallback((id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
  }, [setDesigns]);

  const toggleFavorite = useCallback((id: string) => {
    setDesigns(prev => prev.map(d =>
      d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
    ));
  }, [setDesigns]);

  const favorites = designs.filter(d => d.isFavorite);

  return { designs, favorites, saveDesign, removeDesign, toggleFavorite, clearDesigns };
}

/**
 * Hook for managing user preferences
 */
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'iva-user-preferences',
    DEFAULT_PREFERENCES
  );

  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, [setPreferences]);

  const addFavoriteColor = useCallback((color: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteColors: [...new Set([color, ...prev.favoriteColors])].slice(0, 20),
    }));
  }, [setPreferences]);

  const removeFavoriteColor = useCallback((color: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteColors: prev.favoriteColors.filter(c => c !== color),
    }));
  }, [setPreferences]);

  const addRecentColor = useCallback((color: string) => {
    setPreferences(prev => ({
      ...prev,
      recentColors: [color, ...prev.recentColors.filter(c => c !== color)].slice(0, 10),
    }));
  }, [setPreferences]);

  const toggleLanguage = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'es' : 'en',
    }));
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    addFavoriteColor,
    removeFavoriteColor,
    addRecentColor,
    toggleLanguage,
  };
}

/**
 * Hook for managing AR session history
 */
export function useARHistory() {
  const [sessions, setSessions, clearSessions] = useLocalStorage<ARSession[]>('iva-ar-history', []);

  const saveSession = useCallback((session: Omit<ARSession, 'id' | 'timestamp'>) => {
    const newSession: ARSession = {
      ...session,
      id: `ar-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev].slice(0, 20)); // Keep max 20 sessions
    return newSession;
  }, [setSessions]);

  const removeSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  }, [setSessions]);

  return { sessions, saveSession, removeSession, clearSessions };
}
