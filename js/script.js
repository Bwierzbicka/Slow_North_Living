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


/********************************************************
  
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



  