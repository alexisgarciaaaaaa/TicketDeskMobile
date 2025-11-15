// src/app/store/hooks.ts
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type { RootState , AppDispatch} from '../store';


// Dispatch tipado para toda la app
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Selector tipado para toda la app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
