import {useMutation, useQuery} from "@tanstack/react-query";
import axios from 'axios'

export const useFetchUser = () => {
    return useQuery({
        queryFn: () => axios.get('/api/users/current'),
        select: data => data?.data
    })
}
export const useRegisterUser = () => {
    return useMutation(['register'], ({user}: {user: {username: string, password: string}}) => axios.post('/api/auth/register', {}, {auth: user}), {
        onSuccess: () => window.location.replace('/')
    })
}
export const useLoginUser = () => {
    return useMutation(['login'], ({user}: {user: {username: string, password: string}}) => axios.post('/api/auth/login', {}, {auth: user}), {
        onSuccess: () => window.location.replace('/')
    })
}