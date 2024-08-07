export  interface TodoArray {
    todo_id: number,
    task : string
}
export interface RequestParameter {
    method: string,
    headers: HeadersInit,
    body?: string
}
export interface updateTodoTitleParameter {
    id: number;
    newTitle: string
}

export interface UserSignUpParameter {
    email: string;
    password: string
}

export interface homePageProps {
    isLogin: boolean
}

export const BASE_URL = 'http://localhost:8000';
  