export interface Product {
    inventario_id: number;
    product_id: number;
    name: string;
    description: string;
    foto_url: string;
    quantity: number;
    price: number;
}

export interface BranchProducts {
    branch_id: number;
    productos: Product[];
}