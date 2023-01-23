import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_PAYLOAD, UI_PAYLOAD, USER_PAYLOAD } from '../PAYLOAD_DEFINITIONS';

export const useAuthDispatcher = () => {
    const dispatch = useDispatch();
    return useCallback((type: string, payload: AUTH_PAYLOAD | undefined) => {
        dispatch({ type, payload })
    }, [dispatch]);
}

export const useUserDispatcher = () => {
    const dispatch = useDispatch();
    return useCallback((type: string, payload: USER_PAYLOAD | undefined) => {
        dispatch({ type, payload })
    }, [dispatch]);
}

export const useUiDispatcher = () => {
    const dispatch = useDispatch();
    return useCallback((type: string, payload: UI_PAYLOAD | undefined) => {
        dispatch({ type, payload })
    }, [dispatch]);
}