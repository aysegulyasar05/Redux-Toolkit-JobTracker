import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './JobSlice';

export default configureStore({reducer:jobSlice})