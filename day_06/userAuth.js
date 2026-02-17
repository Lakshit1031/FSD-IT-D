import { readFile, writeFile } from "fs/promises";
import path from "path";

const FILE = path.join(__dirname, "users.json");

// Helper function to read and parse user data
const readUserData = async () => {
    try {
        const data = await readFile(FILE, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
};

// Helper function to write user data
const writeUserData = async (data) => {
    await writeFile(FILE, JSON.stringify(data, null, 2));
};

// 1. REGISTER - Create new user
const register = async (userData) => {
    try {
        const { email, password, name } = userData;
        
        if (!email || !password || !name) {
            return { success: false, message: "Email, password, and name are required" };
        }

        const users = await readUserData();

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return { success: false, message: "User with this email already exists" };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email,
            password, // In production, hash the password!
            name,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeUserData(users);

        // Don't return the password in the response
        const { password: _, ...userWithoutPassword } = newUser;
        return { success: true, message: "User registered successfully", user: userWithoutPassword };
    } catch (error) {
        return { success: false, message: "Error registering user: " + error.message };
    }
};

// 2. LOGIN - Authenticate user
const login = async (credentials) => {
    try {
        const { email, password } = credentials;

        if (!email || !password) {
            return { success: false, message: "Email and password are required" };
        }

        const users = await readUserData();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        // Don't return the password in the response
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, message: "Login successful", user: userWithoutPassword };
    } catch (error) {
        return { success: false, message: "Error logging in: " + error.message };
    }
};

// 3. READ - Get user by ID
const getUser = async (id) => {
    try {
        const users = await readUserData();
        const user = users.find(u => u.id === parseInt(id));

        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Don't return the password
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        return { success: false, message: "Error getting user: " + error.message };
    }
};

// 4. READ - Get all users
const getAllUsers = async () => {
    try {
        const users = await readUserData();
        
        // Don't return passwords
        const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
        return { success: true, users: usersWithoutPasswords };
    } catch (error) {
        return { success: false, message: "Error getting users: " + error.message };
    }
};

// 5. UPDATE - Update user information (not password)
const updateUser = async (id, updateData) => {
    try {
        const users = await readUserData();
        const userIndex = users.findIndex(u => u.id === parseInt(id));

        if (userIndex === -1) {
            return { success: false, message: "User not found" };
        }

        // Don't allow updating id, email, or password through this function
        const { id, email, password, createdAt, ...allowedUpdates } = updateData;

        // Update user properties
        users[userIndex] = {
            ...users[userIndex],
            ...allowedUpdates,
            updatedAt: new Date().toISOString()
        };

        await writeUserData(users);

        // Don't return the password
        const { password: __, ...userWithoutPassword } = users[userIndex];
        return { success: true, message: "User updated successfully", user: userWithoutPassword };
    } catch (error) {
        return { success: false, message: "Error updating user: " + error.message };
    }
};

// 6. CHANGE PASSWORD - Update user password
const changePassword = async (data) => {
    try {
        const { email, oldPassword, newPassword } = data;

        if (!email || !oldPassword || !newPassword) {
            return { success: false, message: "Email, old password, and new password are required" };
        }

        const users = await readUserData();
        const userIndex = users.findIndex(u => u.email === email && u.password === oldPassword);

        if (userIndex === -1) {
            return { success: false, message: "Invalid email or old password" };
        }

        // Update password
        users[userIndex].password = newPassword;
        users[userIndex].passwordChangedAt = new Date().toISOString();

        await writeUserData(users);

        return { success: true, message: "Password changed successfully" };
    } catch (error) {
        return { success: false, message: "Error changing password: " + error.message };
    }
};

// 7. DELETE - Remove user
const deleteUser = async (id) => {
    try {
        const users = await readUserData();
        const userIndex = users.findIndex(u => u.id === parseInt(id));

        if (userIndex === -1) {
            return { success: false, message: "User not found" };
        }

        // Remove user from array
        const deletedUser = users.splice(userIndex, 1)[0];
        await writeUserData(users);

        // Don't return the password
        const { password: _, ...userWithoutPassword } = deletedUser;
        return { success: true, message: "User deleted successfully", user: userWithoutPassword };
    } catch (error) {
        return { success: false, message: "Error deleting user: " + error.message };
    }
};

export {
    register,
    login,
    getUser,
    getAllUsers,
    updateUser,
    changePassword,
    deleteUser
};
