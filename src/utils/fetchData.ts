import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function useProducts(url: string) {
    const { data, isLoading, error } = useSWR(
        url,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        });
    return {
        data,
        isLoading,
        isError: error
    }
}