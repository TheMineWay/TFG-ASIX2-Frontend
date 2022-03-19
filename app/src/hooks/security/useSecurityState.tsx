import { useContext } from 'react';
import { SecurityDataContext } from '../../context/UserContext';

export default function useSecurityState() {
    const securityContext = useContext(SecurityDataContext)!;

    return securityContext;
}