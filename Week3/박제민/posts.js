const postList = document.getElementById("post-list");
const postDetail = document.getElementById("post-detail");
const commentList = document.getElementById("comment-list");
const commentCount = document.getElementById("comment-count");

// 🔥 핵심: 별도 변수 사용 (const 충돌 방지)
let postsData = window.POSTS_DATA || [];
let selectedPostId = null;

function formatNumber(num) {
  return new Intl.NumberFormat("ko-KR").format(num || 0);
}

async function init() {
  try {
    const response = await fetch("./posts.json");

    if (response.ok) {
      postsData = await response.json();
      console.log("✅ JSON 데이터 로드 성공");
    } else {
      console.warn("⚠️ JSON 없음 → fallback 사용");
    }
  } catch (error) {
    console.warn("⚠️ fetch 실패 → fallback 사용");
  }

  // URL 파라미터 처리
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id") ? Number(urlParams.get("id")) : null;

  const hasPost = postsData.some(post => post.id === urlId);

  if (urlId !== null && !hasPost) {
    selectedPostId = -1;
  } else {
    selectedPostId = hasPost ? urlId : (postsData[0]?.id ?? null);
  }

  renderAll();
}

function renderPostList() {
  if (!postsData || postsData.length === 0) {
    postList.innerHTML = "<p>게시글이 없습니다.</p>";
    return;
  }

  postList.innerHTML = postsData.map(post => {
    const activeClass = post.id === selectedPostId ? "active" : "";

    return `
      <a href="?id=${post.id}" class="post-card ${activeClass}" data-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </a>
    `;
  }).join("");

  document.querySelectorAll(".post-card").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();

      selectedPostId = Number(card.dataset.id);
      history.pushState(null, "", `?id=${selectedPostId}`);

      renderAll();
    });
  });
}

function renderPostDetail() {
  const post = postsData.find(p => p.id === selectedPostId);

  if (!post) {
    postDetail.innerHTML = `
      <h3>⚠️ 존재하지 않는 게시글</h3>
    `;
    commentList.innerHTML = "";
    commentCount.textContent = "0개";
    return;
  }

  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
  `;

  commentCount.textContent = `${post.comments.length}개`;

  commentList.innerHTML = post.comments.map(c => `
    <div>
      <b>${c.author}</b>: ${c.content}
    </div>
  `).join("");
}

function renderAll() {
  renderPostList();
  renderPostDetail();
}

window.addEventListener("popstate", () => {
  const urlId = new URLSearchParams(window.location.search).get("id");
  selectedPostId = urlId ? Number(urlId) : postsData[0]?.id;
  renderAll();
});

init();