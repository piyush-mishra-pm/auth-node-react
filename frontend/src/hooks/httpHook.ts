import { useState, useCallback, useRef, useEffect } from 'react';
import apiWrapper from '../apis/apiWrapper';
import { toast } from 'react-toastify';


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const activeHttpRequests = useRef<AbortController[]>([]); // Stores data across re-render cycles.

    const sendRequest = useCallback(
        async (successMessage: string = 'Successful!', url: string, method: any = 'GET', body: any = null, headers: any = {
            'Content-Type': 'application/json'
        }, timeout: number = 0) => {
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
                    // pending: 'Promise is pending', // Using LoadingSpinner component
                    success: `${successMessage} 👌`,
                    // error: 'Promise rejected 🤯' // Using ErrorModal for this.
                });

                const data = await response.data;

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    requestController => requestController !== httpAbortController
                );

                return data;
            } catch (err: any) {
                console.log(err);
                setError(err.response.data.message);
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
