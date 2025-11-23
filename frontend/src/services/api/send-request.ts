const HOST = process.env.NEXT_PUBLIC_API_URL;

const defaultRequestOptions: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  next: { revalidate: 0 },
};

const sendRequest = async <T>(
  path: string,
  requestOptions: RequestInit = {},
): Promise<T> => {
  const options = {
    ...defaultRequestOptions,
    ...requestOptions,
    headers: {
      ...defaultRequestOptions.headers,
      ...requestOptions.headers,
    },
  };
  console.log(` req: ${options.method} ${path}`);
  const response = await fetch(`${HOST}${path}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`[${response.status}] ${error.error}`);
  }
  return await response.json();
};

export default sendRequest;
