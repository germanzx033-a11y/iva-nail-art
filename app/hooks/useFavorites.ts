"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "iva-favorites";

export interface FavoriteItem {
  id: string;
  type: "gallery" | "service" | "design";
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((id: string, type: FavoriteItem["type"] = "gallery") => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === id)) {
        return prev;
      }
      return [...prev, { id, type, addedAt: Date.now() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string, type: FavoriteItem["type"] = "gallery") => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id);
      if (exists) {
        return prev.filter((f) => f.id !== id);
      }
      return [...prev, { id, type, addedAt: Date.now() }];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const getFavoritesByType = useCallback(
    (type: FavoriteItem["type"]) => favorites.filter((f) => f.type === type),
    [favorites]
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
    clearAllFavorites,
    count: favorites.length,
    isLoaded,
  };
}

export default useFavorites;
