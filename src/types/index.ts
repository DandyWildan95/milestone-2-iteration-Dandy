interface Category {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

export interface Product {
    id: number;
    name: string;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    imageUrl?: string;
    creationAt: string;
    updatedAt: string;
}