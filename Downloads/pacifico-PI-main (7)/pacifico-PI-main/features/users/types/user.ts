export interface User {
    id: string;
    name: string;
    last_name: string;
    email: string;
    rol_id: string;
}

export interface UsersResponse {
    message: string;
    data: User[];
}

export interface CreateUserRequest {
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol_id: string | number;
    branch_id: string | number;
    company_id: string | number;
}