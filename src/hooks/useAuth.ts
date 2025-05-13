
import type {  LoginData, RegisterData, User } from '../types';
import { authService } from '../services';
import { useUserInfoStore } from '../stores/loginStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from '../components/common/SnackbarContext';

export const useAuth = () => {
    const { user, isLoggedIn, addUser, clearUser } = useUserInfoStore();
    const { showSnackbar } = useSnackbar();

    const loginMutation = useMutation({
        mutationFn: (data: LoginData) => authService.login(data),
        onSuccess: (response) => {
            showSnackbar('ورود با موفقیت انجام شد', 'success');
            addUser(response.data.user, response.data.token);
        },
        onError: (error) => {
            showSnackbar(error.message, 'error');
         },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterData) => authService.register(data),
        
        onSuccess: (response) => {
            showSnackbar('ثبت نام با موفقیت انجام شد', 'success');
            addUser(response.data.user,response.data.token);
        },
        onError: (error) => {
           showSnackbar(error.message, 'error');
        },
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearUser();
        },
    });

    const currentUserQuery = useQuery<User>({
        queryKey: ['currentUser'],
        queryFn: () => authService.getCurrentUser(),
        enabled: isLoggedIn,
    });

    // Update user in store when query data changes
    if (currentUserQuery.data) {
        addUser(currentUserQuery.data, localStorage.getItem('token') || '');
    }

    return {
        user,
        loading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending || currentUserQuery.isLoading,
        error: loginMutation.error || registerMutation.error || logoutMutation.error || currentUserQuery.error,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        getCurrentUser: currentUserQuery.refetch,
        isAuthenticated: isLoggedIn,
    };
}; 