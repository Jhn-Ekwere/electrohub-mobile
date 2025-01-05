import { API_URL } from "@/constant";

export const loginEP = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to login");
    }
    return data;
}

export const registerEP = async (email: string, password: string, ) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to register");
    }
    return data;
}