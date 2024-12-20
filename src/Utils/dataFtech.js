import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const baseUrl = "https://rainbow-taffy-e88132.netlify.app";


export async function signupWithEmailAndPassword(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { success: true, user };
    } catch (error) {
        console.error("Error in signupWithEmailAndPassword:", error);
        return { success: false, error: error.message };
    }
}

export async function signInWithEmailAndPasswordFirebase(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { success: true, user };
    } catch (error) {
        console.error("Error in signInWithEmailAndPasswordFirebase:", error);
        return { success: false, error: error.message };
    }
}



export async function fetchCategoryWithPagination(category,page,pageSize) {
    try {
        const response = await fetch(
            `${baseUrl}/category/${category}?page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
            throw new Error(`Error fetching category: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetchCategoryWithPagination:", error);
        throw error;
    }
}

export async function addUser(user) {
    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`Error adding user: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in addUser:", error);
        throw error;
    }
}

export async function fetchUserByEmail(email) {
    try {
        const response = await fetch(`${baseUrl}/users/${email}`);
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetchUserByEmail:", error);
        throw error;
    }
}


export async function fetchProductByIdAndCategory(category, productId) {
    try {
        const response = await fetch(`${baseUrl}/category/${category}/product/${productId}`);
        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetchProductByIdAndCategory:", error);
        throw error;
    }
}

export async function fetchFilteredSearchResults(filter, page = 1, pageSize = 10) {
    try {
        const response = await fetch(`${baseUrl}/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filter, page, pageSize }),
        });
        if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error in fetchFilteredSearchResults:", error);
        throw error;
    }
}

export async function fetchFilteredCategory(category, filter, page, pageSize) {
    try {
        const response = await fetch(
            `${baseUrl}/category/${category}/filter?page=${page}&pageSize=${pageSize}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filter),
            }
        );
        if (!response.ok) {
            throw new Error(`Error fetching filtered category: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetchFilteredCategory:", error);
        throw error;
    }
}

export async function updateUser(email, updatedUserData) {
    try {
        const response = await fetch(`${baseUrl}/users/${email}`, {
            method: 'PUT', // The HTTP method for updating
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(updatedUserData), // Convert the updated user data to a JSON string
        });

        if (!response.ok) {
            // Handle error if the response is not OK (non-2xx status code)
            const error = await response.json();
            throw new Error(error.error || 'Failed to update user');
        }

        const updatedUser = await response.json(); // Parse the response JSON to get the updated user
        return updatedUser; // Return the updated user object
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function updateProduct(category, productId, updatedFields) {
    try {
        const response = await fetch(
            `${baseUrl}/category/${category}/product/${productId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFields),
            }
        );
        if (!response.ok) {
            throw new Error(`Error updating product: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in updateProduct:", error);
        throw error;
    }
}
export async function deleteProduct(category, productId) {
    try {
        const response = await fetch(
            `${baseUrl}/category/${category}/product/${productId}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(`Error deleting product: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        throw error;
    }
}
