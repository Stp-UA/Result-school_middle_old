import { useEffect, useReducer, useRef } from 'react'

interface State<T> {
    data: T | undefined,
    isLoading: boolean,
    error: Error | undefined
}

interface RequestInitParams extends RequestInit {
    _limit: number
}

interface RequestParams {
    params: RequestInitParams
}

interface Answer<T> extends State<T> {
    refetch: (params: RequestParams) => void
}

type Action<T> =
  { type: 'loading' } |
  { type: 'fetched'; payload: T } |
  { type: 'error'; payload: Error }

export function useFetch<T>(url: string, options?: RequestInitParams): Answer<T> {
    const cancelRequest = useRef<boolean>(false)

    const initState: State<T> = {
        data: undefined,
        isLoading: false,
        error: undefined,
    }

    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initState, isLoading: true }
            case 'fetched':
                return { ...initState, data: action.payload, isLoading: false }
            case 'error':
                return { ...initState, error: action.payload, isLoading: false }
            default:
                return state
        }
    }

    const refetch = (prop: RequestParams): void => {
        options = prop.params
        console.log(options)
    }

    const [state, dispatch] = useReducer(fetchReducer, initState)

    useEffect(() => {
        cancelRequest.current = false

        const fetchData = async () => {
            dispatch({ type: 'loading' })

            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = (await response.json()) as T

                if (cancelRequest.current) return

                dispatch({ type: 'fetched', payload: data })
            } catch (error) {
                if (cancelRequest.current) return

                dispatch({ type: 'error', payload: error as Error })
            }
        }

        fetchData()

        return () => {
            cancelRequest.current = true
        }
    }, [options, url])

    return { ...state, refetch }
}
