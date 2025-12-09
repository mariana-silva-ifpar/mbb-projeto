export interface User {
    uid: string;
    name: string | null;
    email: string | null;
    username: string | null;
    password: string | null;
    createdAt: Date;
}