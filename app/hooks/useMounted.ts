"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Devuelve false en el servidor y durante la hidratación, y true ya en el cliente.
 * Útil para renderizar contenido que depende de valores aleatorios o del navegador
 * sin desajustes de hidratación ni setState dentro de un efecto.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
