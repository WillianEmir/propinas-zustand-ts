import { create } from "zustand";
import { menuItems } from "../data/db";
import { ConsumoItem, MenuItem, Tip } from "../types";
import { persist } from "zustand/middleware";
import { ChangeEvent } from "react";

type PropinaState = {
  menuItems: MenuItem[];
  consumoItems: ConsumoItem[];
  tip: Tip['value'];
  addConsumoItem: (plato: MenuItem) => void;
  deleteItem: (id: MenuItem['id']) => void;
  saveOrden: () => void;
  setTip: (e: ChangeEvent<HTMLInputElement>) => void
}

export const usePropina = create<PropinaState>()(persist((set, get) => ({
  menuItems,
  consumoItems: [],
  tip: 0,
  addConsumoItem: (plato) => {
    const exists = get().consumoItems.some(item => item.id === plato.id)
    let newConsumoItens = []
    
    if(exists){
      newConsumoItens = get().consumoItems.map(
        item => item.id === plato.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      const newItem: ConsumoItem = { ...plato, quantity: 1 }
      newConsumoItens = [...get().consumoItems, newItem]
    }

    set(() => ({
      consumoItems: newConsumoItens
    }))
  }, 
  deleteItem: (id) => {
    set((state) => ({consumoItems: state.consumoItems.filter(item => item.id !== id)}))
    if(get().consumoItems.length === 0) set(() => ({tip: 0}))
  },
  saveOrden: () => {
    set(() => ({
      consumoItems: [],
      tip: 0
    }))
  },
  setTip: (e) => {
    set(() => ({
      tip: +e.target.value
    }))
  }
}), {
  name: 'propina-storage'
}))