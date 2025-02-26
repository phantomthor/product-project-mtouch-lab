import Image from "next/image"

export default async function Page({ params }) {
    const { id } = (await params)
    console.log(id)
    const data = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await data.json()
    return (
        <div className="container mx-auto min-h-dvh grid place-items-center">
            <div className="flex-col flex lg:flex-row gap-4">
                <div className="flex justify-center shrink-0">
                    <Image width={300} height={600} src={product.image} className="rounded" alt={product.title} />
                </div>
                <div className="flex justify-center flex-col gap-4 mt-8">
                    <p>
                        {product.title}
                    </p>
                    <p className="text-gray-600">
                        {product.description}
                    </p>
                    <p>
                        <span className="font-bold">Category:</span> {product.category}
                    </p>
                    <p>
                        <span className="font-bold">Price:</span> ₹{product.price}
                    </p>
                </div>
            </div>
        </div>
    )
}