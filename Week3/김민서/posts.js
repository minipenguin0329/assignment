/*
 * [2주차 실습] posts.js
 * -> posts-data.js에 있는 posts 배열 → HTML 문자열 → #post-list 안에 삽입
 */

// [1] 목록을 넣을 빈 상자 찾기 (posts.html의 <section id="post-list">)
const postList = document.querySelector("#post-list");

// [2] 배열 posts의 각 요소(post)를 HTML 한 덩어리로 바꾸기 → map
// [3] 백틱(`) 문자열 안 ${post.title} 처럼 쓰면 → 템플릿 리터럴 (값이 문자열에 섞임)

function createPostItemHtml(post) {
  return `
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

  let postItemsHtml = "";

  for(let i = 0; i < posts.length; i++) {
    postItemsHtml += createPostItemHtml(posts[i]);
  }

  postList.innerHTML = postItemsHtml;
}

renderPostList();

// [5] innerHTML: 문자열을 실제 DOM으로 파싱해 자식으로 넣음 (이때 화면에 목록이 보임)