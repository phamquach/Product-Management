'use client'
import useSWR from "swr";

export function useProducts(url: string) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, isLoading, error } = useSWR(
        url,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        });
    return {
        product: data,
        isLoading,
        isError: error
    }
}