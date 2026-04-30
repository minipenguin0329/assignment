const postDetail = document.querySelector("#post-detail");
const commentSection = document.querySelector("#comment-section");

function createCommentItemHtml(comment) {
  return `
    <div class="comment-item">
      <div class="comment-info">
        <strong>${comment.author}</strong>
        <span>${comment.date}</span>
      </div>
      <p>${comment.content}</p>
    </div>
  `;
}

function renderComments(comments) {
  let commentItemsHtml = "";

  for (let i = 0; i < comments.length; i++) {
    commentItemsHtml += createCommentItemHtml(comments[i]);
  }
  commentSection.innerHTML = `
    <h2 class="comment-title">댓글 ${comments.length}</h2>
    ${commentItemsHtml}
  `;
}

function renderPost(post) {
  let contentHtml = "";

  for (let i = 0; i < post.content.length; i++) {
    contentHtml += `<p>${post.content[i]}</p>`;
  }
  
  postDetail.innerHTML = `
    <div class="category">${post.category}</div>
    <h2 class="post-title">${post.title}</h2>
    
    <div class="post-info">
      <span>작성자: ${post.author}</span>
      <span>작성일: ${post.date}</span>
      <span>조회수: ${post.views}</span>
    </div>
    
    <div class="post-content">
      ${contentHtml}
    </div>

    <a href="./index.html" class="btn">목록으로</a>
  `;

  renderComments(post.comments);
}

async function renderPostDetail() {
  const params = new URLSearchParams(window.location.search);
  const postId = Number(params.get("id"));

  // 1차 예외처리: URL에 id가 없거나 숫자가 아닌 경우 접근 차단
  if (!postId) {
    postDetail.innerHTML = `
      <h2 class="post-title">잘못된 접근입니다.</h2>
      <a href="./index.html" class="btn">목록으로</a>
    `;
    commentSection.style.display = "none"; // 댓글 영역 숨기기
    return;
  }

  const selectedPost = await fetchPostById(postId);

  // 2차 예외처리: id에 해당하는 게시글 데이터가 없는 경우
  if (!selectedPost) {
    postDetail.innerHTML = `
      <h2 class="post-title">존재하지 않거나 삭제된 게시글입니다.</h2>
      <p class="empty-message">요청하신 게시글을 찾을 수 없습니다.</p>
      <a href="./index.html" class="btn">목록으로</a>
    `;
    commentSection.style.display = "none"; // 댓글 영역 숨기기
    return;
  }

  // 예외를 모두 통과한 정상적인 경우에만 렌더링
  renderPost(selectedPost);
}

renderPostDetail();