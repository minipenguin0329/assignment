/*
 * [2주차 실습] posts.js
 * -> posts-data.js에 있는 posts 배열 → HTML 문자열 → #post-list 안에 삽입
 */

// [1] 목록을 넣을 빈 상자 찾기 (posts.html의 <section id="post-list">)
const postList = document.querySelector("#post-list");

// [2] 배열 posts의 각 요소(post)를 HTML 한 덩어리로 바꾸기 → map
// [3] 백틱(`) 문자열 안 ${post.title} 처럼 쓰면 → 템플릿 리터럴 (값이 문자열에 섞임)

function createPostItemHtml(post){
  return`
      <article class="post-item">
        <div class="post-item-category">${post.category}</div>
        <h3 class="post-item-title">
          <a href="./post.html?id=${post.id}">${post.title}</a>
        </h3>
        <p class="post-item-summary">${post.summary}</p>
        <div class="post-item-info">
          <span>${post.author}</span>
          <span>${post.date}</span>
          <span>조회수 ${post.views}</span>
        </div>
      </article>
    `;
}

async function renderPostList() {
  const posts = await fetchPosts();

  // 데이터가 없거나 배열이 비어있는 경우(에러 발생 포함) 예외처리
  if (!posts || posts.length === 0) {
    postList.innerHTML = `<p class="empty-message">게시글 목록을 불러올 수 없거나 등록된 게시글이 없습니다.</p>`;
    return; // 더 이상 아래 코드를 실행하지 않고 함수 종료
  }

  let postItemsHtml = "";
  for (let i = 0; i < posts.length; i++) {
    postItemsHtml += createPostItemHtml(posts[i]);
  }
  
  postList.innerHTML = postItemsHtml;
}

renderPostList();