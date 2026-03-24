  /*************************************************************** 
      fetch()         → gives response object
      response.json() → converts it to real data (JS object)
      posts           → now usable array 
  ****************************************************************/
  


  // Creating post blog preview CARD - used on index and blog page //

  function createPostCard(post) {
    const postCard = document.createElement("a");
    postCard.classList.add("blog-preview");
    postCard.href = post.link;
    postCard.innerHTML = `
      <img class="bp-img" src="${post.image}" alt="${post.alt}">
      <div class="bp-description">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <span class="read-more-btn">Read more →</span>
      </div>
      `;
    return postCard;
  }
  
/********************************************************
  
                        INDEX PAGE
                        
********************************************************/ 

/**********  FEATURED POSTS  **********/

  const featuredContainer = document.getElementById("featured-posts");

  fetch("./data/posts.json")
  .then(res => res.json())
  .then(posts => {

    const featured = posts
      .filter(post => post.featured)
      .slice(0, 4);

    featured.forEach(post => {
      featuredContainer.appendChild(createPostCard(post));
    });
  });

/**********  SEASONAL CARE **********/

  const seasonalContainer = document.getElementById("seasonal-posts");

  fetch("./data/posts.json")
  .then(res => res.json())
  .then(posts => {

    const seasonal = posts
      .filter(post => post.tags?.includes("summer"));

    seasonal.forEach(post => {
      seasonalContainer.appendChild(createPostCard(post));
    });
  });

/*******************************************************
  
                        BLOG PAGE

********************************************************/ 

  const blogList = document.getElementById("blog-list");

  fetch("./data/posts.json")
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        blogList.appendChild(createPostCard(post));
      });
    });

/*******************************************************
  
                        BLOG POST - RELATED ARTICLES

********************************************************/ 

  const relatedArticles = document.getElementById("related-posts");

  fetch("../data/posts.json")
    .then(response => response.json())
    .then(posts => {
    
      // Find current post
      const currentPath = window.location.pathname;
      const currentPost = posts.find(post => {
        return currentPath.includes(post.link.replace("./", ""));
      })

      // Find related posts 
      const relatedPosts = posts.filter(post => {
        // exclude current post
        if (post.link === currentPost.link) 
          return false;
        // check tag match
        //.some() is an array method that checks if at least one element passes a test
        //array.some(element => condition) - returns true/false
          return post.tags.some(tag => currentPost.tags.includes(tag));
      });

      relatedPosts.slice(0, 4).forEach(post => {
          const relatedPost = document.createElement("a");
          relatedPost.classList.add("rp-link");
          relatedPost.href = "."+ post.link;
          relatedPost.innerHTML = `
                <img src=".${post.image}" alt="${post.alt}">
                <span>${post.title}</span>
            `;

      relatedArticles.appendChild(relatedPost);
      });

    })
          