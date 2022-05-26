import { createContext } from 'react';
import { UserStore } from '../store/userStore';

export const storeContext = createContext<UserStore>(new UserStore());
