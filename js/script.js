
const blogList = document.getElementById("blog-preview-container");

fetch("./data/posts.json")
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postElement = document.createElement("a");
      postElement.classList.add("blog-link");
      postElement.href = post.link;

      postElement.innerHTML = `
         <div class="blog-preview">
            <img class="bp-img" src="${post.image}" loading="lazy" alt="${post.alt}"> 
            <div class="bp-article">
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <span class="read-more">Read more &rarr;</span>
            </div>
        </div>
      `;
      blogList.appendChild(postElement);
    });
  });
