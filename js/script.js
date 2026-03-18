  
  // INDEX PAGE 
  const featuredContainer = document.getElementById("featured-posts");
  const seasonalContainer = document.getElementById("seasonal-posts");

  fetch("./data/posts.json")
  .then(res => res.json())
  .then(posts => {
    const featured = posts
      .filter(post => post.featured)
      .slice(0, 4);

    const seasonalPosts = posts
      .filter(post => post.tags && post.tags.includes("summer"))
      .slice(-3);

    featured.forEach(post => {
      featuredContainer.innerHTML += `
        <a class="blog-preview" href="${post.link}">
          <img class="bp-img featured-img" src="${post.image}" loading="lazy" alt="${post.alt}">
          <div class="bp-description">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <span class="read-more">Read more →</span>
          </div>
        </a>
      `;
    });

    seasonalPosts.forEach(post => {
      seasonalContainer.innerHTML += `
        <a class="blog-preview" href="${post.link}">
          <img class="bp-img" src="${post.image}" loading="lazy" alt="${post.alt}">
          <div class="bp-description">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <span class="read-more">Read more →</span>
          </div>
        </a>
      `;
    });
  });



// BLOG PAGE
const blogList = document.getElementById("blog-list");

fetch("./data/posts.json")
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postElement = document.createElement("a");
        postElement.classList.add("blog-preview");
        postElement.href = post.link;

        postElement.innerHTML = `
          <img class="bp-img" src="${post.image}" alt="${post.alt}">
          <div class="bp-description">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <span class="read-more-btn">Read more →</span>
          </div>
        `;
        blogList.appendChild(postElement);
    });
  });



  