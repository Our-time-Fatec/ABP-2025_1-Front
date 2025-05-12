import { TOKEN_LOCAL_STORAGE_KEY } from "../constants/local-storage";

async function getBody<T>(c: Response | Request): Promise<T> {
  const contentType = c.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return c.json()
  }

  return c.text() as Promise<T>
}

async function getHeaders(headers?: HeadersInit): Promise<HeadersInit> {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers ?? {}
}

// function getUrl(contextUrl: string): string {
//   const url = new URL(contextUrl, 'http://localhost:3333')
//   const pathname = url.pathname
//   const search = url.search

//   const baseUrl =
//     env.NODE_ENV === 'production'
//       ? env.API_URL_PROD
//       : env.API_URL_DEV || 'http://localhost:3333'

//   const requestUrl = new URL(`${baseUrl}${pathname}${search}`)

//   return requestUrl.toString()
// }

export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const requestHeaders = await getHeaders(options.headers)
//   const url = getUrl(path)

  const request = new Request(path, {
    ...options,
    headers: requestHeaders,
  })

  const response = await fetch(request)

  if (!response.ok) {
    const errorBody = await response.text()
    const errorData = errorBody
      ? JSON.parse(errorBody)
      : { message: 'Erro desconhecido' }
    
    throw new Error(errorData.message || `Erro HTTP ${response.status}`)
  }

  const data = await getBody<T>(response)
  return data
}
