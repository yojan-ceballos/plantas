export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export const mockUser: User = {
    id: "u1",
    name: "Usuario Demo",
    email: "demo@example.com",
    avatar: "https://ui-avatars.com/api/?name=Usuario+Demo&background=0D8ABC&color=fff"
};
