import React, { useContext } from 'react'
import { AuthCredentialsContext } from '../../context/AuthContext'

export default function useAuthState() {
    const authContext = useContext(AuthCredentialsContext)!;

    return authContext;
}