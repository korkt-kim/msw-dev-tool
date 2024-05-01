import { createContext } from 'preact';

export const PopoverContext = createContext<{ close?: () => unknown }>({});
