import AsyncStorage from '@react-native-async-storage/async-storage'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import {api} from '@/Services/api'
import theme from './Theme'
import user from "@/Store/localSlice";
import opportunitySlice from "@/Store/opportunitySlice";
import taskSlice from "@/Store/tasksSlice";
import clientSlice from "@/Store/clientSlice";
import userSlice from "@/Store/userSlice";
import sourceSlice from "@/Store/sourceSlice";
import filterSlice from "@/Store/filterSlice";

const reducers = combineReducers({
    theme,
    api: api.reducer,
    user: user,
    opportunitySlice:opportunitySlice,
    taskSlice:taskSlice,
    clientSlice:clientSlice,
    userSlice:userSlice,
    sourceSlice:sourceSlice,
    filterSlice:filterSlice
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme', "user","opportunitySlice","taskSlice","clientSlice","userSlice","sourceSlice"],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware)

        if (__DEV__ && !process.env.JEST_WORKER_ID) {
            const createDebugger = require('redux-flipper').default
            middlewares.push(createDebugger())
        }

        return middlewares
    },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export {store, persistor}
