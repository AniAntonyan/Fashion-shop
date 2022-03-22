import { apiUrl } from "../config";

export async function getData(){
    const response=await fetch("https://baby-island.herokuapp.com/homeproduct");
    const data=await response.json();
    return data;
}
export async function getProducts(){
const products= await fetch (`${apiUrl}/api/v1/product`)
const data =await products.json();
return data;
}
