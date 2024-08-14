/* Use interface:

For defining object shapes, especially when you need to extend or merge interfaces.
When working with classes and needing to enforce a specific shape.

Use type:

For creating complex types, such as unions, intersections, and tuple types.
When you need type aliases for primitives or when working with more complex type compositions. */

// Defines a basic user type
export interface User {
  id: number;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

// Defines a type for a function that logs in a user
export type LoginFunction = (email: string, password: string) => Promise<User>;

// Defines a type for the application's theme
export type Theme = 'light' | 'dark';