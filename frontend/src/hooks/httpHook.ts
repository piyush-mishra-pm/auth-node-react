import { useState, useCallback, useRef, useEffect } from 'react';
import apiWrapper from '../apis/apiWrapper';
import { toast } from 'react-toastify';


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const activeHttpRequests = useRef<AbortController[]>([]); // Stores data across re-render cycles.

    const sendRequest = useCallback(
        async (url: string, method: any = 'GET', body: any = null, headers: any = {}, timeout: number = 0) => {
            setIsLoading(true);

            const httpAbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortController);

            try {
                const response = await toast.promise(apiWrapper.request({
                    data: body,
                    signal: httpAbortController.signal,
                    method,
                    url,
                    timeout,
                    headers,
                }), {
                    pending: 'Promise is pending',
                    success: 'Promise resolved 👌',
                    error: 'Promise rejected 🤯'
                });

                const data = await response.data;

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    requestController => requestController !== httpAbortController
                );

                return data;
            } catch (err: any) {
                setError(err.message || 'Something went wrong!'); // Default error message shouldn't be required, as backend has a default error message anyways.
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    function clearErrorHandler() {
        setError(null);
    }

    // Runs when this element mounts.
    useEffect(() => {
        return () => {
            // Returned function: Runs a clean up logic when this element unmounts.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);


    return { isLoading, error, sendRequest, clearErrorHandler };
}
