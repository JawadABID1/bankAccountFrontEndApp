import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store'; // Import the types for the store

// Custom typed `useDispatch` hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom typed `useSelector` hook
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected = useSelector;
