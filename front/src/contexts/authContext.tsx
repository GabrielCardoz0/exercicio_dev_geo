import type { AuthContextType } from '@/assets/interfaces';
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
