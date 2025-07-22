import { atom } from "jotai";

const localStorageKey = "mail:status";

const getInitialValue = (): string[] => {
  try {
    const value = localStorage.getItem(localStorageKey);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export const status = atom<string[]>(getInitialValue());

export const mailStatus = atom(
  (get) => get(status),
  (_, set, newValue: string[]) => {
    set(status, newValue);
    localStorage.setItem(localStorageKey, JSON.stringify(newValue));
  }
);

export const add = atom(null, (get, set, newItem: string) => {
  const current = get(mailStatus);
  if (!current.includes(newItem)) {
    set(mailStatus, [...current, newItem]);
  }
});

export const remove = atom(null, (get, set, itemToRemove: string) => {
  const current = get(mailStatus);
  const updated = current.filter((item) => item !== itemToRemove);
  set(mailStatus, updated);
});
