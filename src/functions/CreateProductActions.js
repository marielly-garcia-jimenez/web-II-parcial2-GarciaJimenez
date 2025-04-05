import { useFormStatus } from "react-dom"

export default async function CreateProductActions(data) {
    const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    return await response.json()
}