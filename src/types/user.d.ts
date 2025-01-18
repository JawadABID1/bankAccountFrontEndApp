// // User slice state
// export interface UserState {
//     users: User[];
//     loading: boolean;
//     error: string | null | unknown;
// }
// // Define the structure of a User object
// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: 'admin' | 'user'; // Role can be 'admin' or 'user'
//     createdAt: string; // ISO string date format
//     updatedAt: string; // ISO string date format
// }
//
// // Define the login credentials structure
// export interface LoginCredentials {
//     email: string;
//     password: string;
// }
//
// // Define the response structure for user authentication (after login)
// export interface AuthResponse {
//     user: User;
//     token: string; // JWT or other types of tokens
// }
//
// // Define the payload for registering a new user
// export interface RegisterPayload {
//     name: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'user'; // Optional: Role can be defined during registration
// }
//
// // Optional: UserProfile for handling user-specific data
// export interface UserProfile extends User {
//     address: string;
//     phoneNumber: string;
// }
//
// // Define error response type, in case the API responds with an error
// export interface ErrorResponse {
//     message: string;
//     statusCode: number;
// }
