import { useContext } from 'react';
import { UserDataContext } from '../../context/UserContext';

export default function useUserState() {
    const userContext = useContext(UserDataContext)!;

    return userContext;
}