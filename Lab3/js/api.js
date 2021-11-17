const BASE_URL = 'http://localhost:5000';
const RESOURSE_URL = `${BASE_URL}/lamp`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
	try {
		const reqParams = {
			method,
			mode: 'cors',
			headers: {
				"Content-Type": "application/json"
			},
		};

		if (body) {
			reqParams.body = JSON.stringify(body);
		}
		return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
	} catch (error) {
		console.error("HTTP ERROR: ", error);
	}
};

export const getAllLamps = async () => {
	const rawRes = await baseRequest({ method: "GET" });
	return rawRes.json();
};

export const postLamp = (body) => baseRequest({ method: "POST", body });

export const editLamp = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteLamp = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });