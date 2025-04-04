import { IPaginatedRequestParams } from "@/Data/Interfaces/Global";
import { baseUrl } from "@/Data/System";
import { store } from "@/Data/Redux/Store";

type RequestType = "DELETE" | "GET" | "POST" | "PATCH";

const baseHeaders = {
	"Content-Type": "application/json",
	"Accept": "application/vnd.api+json"
};

export function GET<ReturnType = void>(path: string, params?: IPaginatedRequestParams) {
	if (params) {
		return request<ReturnType>(`${ path }?${ uriEncodeParameters(params) }`, "GET", undefined, undefined);
	}

	return request<ReturnType>(path, "GET", undefined, undefined);
}

export function POST<T, ReturnType = void>(path: string, body?: T): Promise<ReturnType> {
	return request<ReturnType>(path, "POST", JSON.stringify(body), undefined);
}

export function PATCH<T, ReturnType = void>(path: string, body?: T) {
	return request<ReturnType>(path, "PATCH", JSON.stringify(body), undefined);
}

export function DELETE<T, ReturnType = void>(path: string, body?: T) {
	return request<ReturnType>(path, "DELETE", JSON.stringify(body), undefined);
}

async function request<ReturnType>(path: string, method: RequestType, body?: string, headers?: { [key: string]: string }) {
	const url = `${ baseUrl }/api/${ path }`;
	const authToken = store.getState().userSlice.user?.token?.token;
	const authHeaders = { "Authorization": `Bearer ${ authToken }` };

	try {
		const response: Response = await fetch(url, {
			body,
			headers: { ...baseHeaders, ...authHeaders, ...headers },
			method,
			mode: "cors"
		});

		const { status } = response;

		if (status >= 200 && status < 300) {
			return status === 204
				? {} as ReturnType
				: await response.json();
		} else if (status >= 400 && status < 500) {
			if (status === 401)  {
				throw new Error("Unauthorized.");
			}

			throw new Error(`Client Error: ${ status }`);
		} else {
			throw new Error(`Server Error: ${ status }`);
		}
	} catch (error) {
		throw new Error(error);
	}
}

const uriEncodeParameters = (params: IPaginatedRequestParams) => {
	return Object.entries(params).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
};
