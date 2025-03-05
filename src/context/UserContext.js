import React, { useState, createContext, useEffect } from "react";

// Create context
const UserContext = createContext();

// Provider component to wrap your app
export function UserProvider({ children }) {
    const [user, setUser] = useState({ id: null, isAdmin: false });

    useEffect(() => {
        // Check if there's a token in localStorage on page load
        const token = localStorage.getItem("token");

        if (token) {
            // Assuming the token contains user information, decode it and update the user state
            const decodedUser = decodeToken(token);  // Implement decoding logic or use a package like jwt-decode
            setUser(decodedUser);
        }
    }, []);

    const unsetUser = () => {
        setUser({ id: null, isAdmin: false }); // Clear user state
        localStorage.removeItem("token"); // Remove token from localStorage
    };

    const decodeToken = (token) => {
        // Decode your token here and return the user data
        // Example using jwt-decode library
        // return jwt_decode(token);

        // For simplicity, assuming the token contains { id, isAdmin }
        return { id: "someUserId", isAdmin: true }; // Replace with actual decoding logic
    };

    return (
        <UserContext.Provider value={{ user, setUser, unsetUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
