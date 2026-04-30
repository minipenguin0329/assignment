async function fetchPosts() {
        try {
        const response = await fetch("./posts.json"); 
        if (!response.ok) {
            throw new Error(`HTTP error : ${response}`)
        }
        return response.json(); }

        catch (error) {
            console.error("Failed to fetch posts:", error.message);
            throw error;
        }
    
}

async function fetchPostById(postId) {
    try {
        const posts = await fetchPosts();

        const post = posts.find((post) => post.id === postId);
        if (!post) {
                throw new Error(`Post with ID ${postId} not found.`);
            }
        return post;}

    catch (error) {
        console.warn(`Error in fetchPostById: ${error.message}`);
        return null; 
    } 
}   
    