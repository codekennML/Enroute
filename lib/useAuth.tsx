// hooks/useAuth.ts
import { selectUserInfo } from '@/redux/slices/user';
import { useSelector } from 'react-redux';

export function useAuth() {
    const userInfo = useSelector(selectUserInfo);

    const isAuthenticated = !!userInfo.roles && !!userInfo._id;

    return {
        isAuthenticated,
        roles: userInfo.roles,
        _id: userInfo._id,
        verified: userInfo.verified
    };
}