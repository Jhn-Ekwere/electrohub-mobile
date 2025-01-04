import { API_URL } from "@/constant";

export async function fetchProductsEP() {
    const res = await fetch(`${API_URL}/products`);
    
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch data");
    } 
    return data
}

 
export async function fetchProductsByIdEP(id: string) {
    const res = await fetch(`${API_URL}/products/${id}`);
    
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch data");
    } 
    return data
}

 