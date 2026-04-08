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

/**********  SEASONAL CARE - CAROUSEL FOR "SUMMER" **********/

  const seasonalContainer = document.getElementById("seasonal-posts");

  fetch("./data/posts.json")
  .then(res => res.json())
  .then(posts => {

    const seasonal = posts.filter(post => post.tags?.includes("summer"));
    seasonal.forEach(post => {
      seasonalContainer.appendChild(createPostCard(post));
    });

    // Carousel functionality
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const indicatorsContainer = document.getElementById("carousel-indicators");
    
    let currentIndex = 0;
    const totalItems = seasonal.length;
    
    // Create indicator dots
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(dot);
    }

    function updateCarousel() {
      const targetCard = seasonalContainer.children[currentIndex];
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      updateIndicators();
    }
    
    function updateIndicators() {
      const dots = indicatorsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === currentIndex) {
          dots[i].classList.add("active");
        } else {
          dots[i].classList.remove("active");
        }
      }
    }
    
    btnNext.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Update indicators when user scrolls manually
    let scrollTimeout;
    seasonalContainer.addEventListener("scroll", () => {
      // Debounce the scroll event for better performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateIndicatorsOnScroll();
      }, 10);
    });

    function updateIndicatorsOnScroll() {
      const container = seasonalContainer;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      const cards = Array.from(container.children);

    // Find the card whose center is closest to carousel center
      let closestIndex = currentIndex;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = i;
        }
      });

      if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < totalItems) {
        currentIndex = closestIndex;
        updateIndicators();
      }
    }
  });

/**********  PRIVACY BANNER **********/

 const banner = document.getElementById('privacy-banner');
 const btn = document.getElementById('accept-btn');

 if (banner && btn) {
    // Check if user already accepted
    if (!localStorage.getItem('privacyAccepted')) {
      banner.style.display = 'flex';
    }

    btn.addEventListener('click', () => {
      localStorage.setItem('privacyAccepted', 'true');
      banner.style.display = 'none';
    });
 }

/*******************************************************
  
                        BLOG PAGE

********************************************************/ 

  const blogList = document.getElementById("blog-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");

  if (blogList && prevPageBtn && nextPageBtn && pageInfo) {
    let currentPage = 1;
    const postsPerPage = 12;
    let allPosts = [];

    fetch("./data/posts.json")
      .then(response => response.json())
      .then(posts => {
        allPosts = posts;
        displayPosts(currentPage);
        updatePaginationControls();
      });

    function displayPosts(page) {
      blogList.innerHTML = ""; // Clear current posts
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const postsToShow = allPosts.slice(startIndex, endIndex);

      postsToShow.forEach(post => {
        blogList.appendChild(createPostCard(post));
      });
    }

    function updatePaginationControls() {
      const totalPages = Math.ceil(allPosts.length / postsPerPage);
      
      // Update page info
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      
      // Enable/disable buttons
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === totalPages;
    }

    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
        updatePaginationControls();
      }
    });

    nextPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(allPosts.length / postsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayPosts(currentPage);
        updatePaginationControls();
      }
    });
  }
/*******************************************************
  
                BLOG POST - AFFILIATE PRODUCTS

********************************************************/ 

const accButtons = document.querySelectorAll(".accordion-button");

accButtons.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open");

    document.querySelectorAll(".accordion-button").forEach(btn => {
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("open"));

    if (!isOpen) {
      button.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      content.classList.add("open");
    }
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
          