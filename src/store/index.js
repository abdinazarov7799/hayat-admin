import create from 'zustand'
import {devtools, persist} from "zustand/middleware";
import config from "../config";
import storage from "../services/storage";


let store = (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set(state => ({...state, user})),
    setAuthenticated: (isAuthenticated) => set(state => ({...state, isAuthenticated})),
})

let settingsStore = (set) => ({
    token: null,
    darkMode: false,
    isMenuOpen: true,
    lang: storage.get('lang') ||  config.DEFAULT_APP_LANG,
    setToken: (token) => set(state => ({...state, token})),
    setLang: (lang) => set(state => ({...state, lang})),
    setMode: () => set(state => ({...state, darkMode: !state.darkMode})),
    setOpenMenu: () => set(state => ({...state, isMenuOpen: !state.isMenuOpen})),
})


store = devtools(store);
settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, {name: 'settings'});

export const useStore = create(store)
export const useSettingsStore = create(settingsStore)

