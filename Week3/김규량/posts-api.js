async function fetchPosts() {
  try {
    const response = await fetch("./posts.json");
    
    // HTTP 상태 코드가 200~299가 아닌 경우 에러 발생
    if (!response.ok) {
      throw new Error(`데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("fetchPosts 에러:", error);
    // 에러가 났을 때 빈 배열을 반환하여 이후 로직이 터지는 것을 방지합니다.
    return []; 
  }
}

async function fetchPostById(postId) {
  const posts = await fetchPosts();
  const post = posts.find((post) => post.id === postId);
  
  // 해당하는 글이 없으면 undefined 대신 명시적으로 null을 반환하도록 처리
  return post || null; 
}