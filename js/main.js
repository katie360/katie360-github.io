// Blog posts data - in production you might fetch this from a JSON file
const blogPosts = [
    {
        id: 'post1',
        title: "API Quality Series(Part 1): End-to-End API Testing",
        excerpt: "As organizations rely more on APIs, ensuring their reliability, security, and performance is crucial. This series explores end-to-end API testing to help maintain high standards.",
        date: "April 02, 2025",
        author: "Kate Ratemo",
        readTime: "5 min read",
        tags: ["API Development", "Software Testing", "Intermediate "],
        image: "posts/post1/what-is-end-to-end-testing.webp",
        markdownFile: "posts/post1/2025-04-01-End-to-End API Testing.md"
    },
    {
        id: 'post2',
        title: "Why Your API Might Be Slowing Down the Frontend (and How to Fix It)",
        excerpt: "This post covers best practices for creating efficient APIs that improve collaboration and user experience.",
        date: "April 04, 2025",
        author: "Kate Ratemo",
        readTime: "8 min read",
        tags: ["Backend Optimization", "Frontend Performance", "API Best Practices "],
        image: "posts/post2/API-Integration.png",
        markdownFile: "posts/post2/2025-04-04 -Why Your API Might Be Slowing Down the Frontend (and How to Fix It).md"
    }
];
// Portfolio items
const portfolioItems = [
    {
        id: 1,
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform with product listings, cart functionality, and secure checkout.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "images/ecommerce.jpg",
        liveUrl: "#",
        codeUrl: "#"
    }
];
// Function to load and render markdown content
function loadMarkdownContent() {
    const postId = window.location.pathname
        .split('/')
        .pop()
        .replace('.html', '');

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        window.location.href = '../404.html';
        return;
    }

    // Set post metadata
    document.title = `${post.title} | My Blog`;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-author').textContent = `By ${post.author}`;
    document.getElementById('read-time').textContent = post.readTime;

    // Set post tags
    const tagsContainer = document.getElementById('post-tags');
    tagsContainer.innerHTML = post.tags.map(tag =>
        `<span class="tag">${tag}</span>`
    ).join('');

    // Fetch and render markdown content
    fetch(post.markdownFile)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Post not found');
            }
            return response.text();
        })
        .then(markdown => {
            document.getElementById('post-content').innerHTML = marked.parse(markdown);
            // Apply syntax highlighting
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        })
        .catch(error => {
            console.error('Error loading post:', error);
            document.getElementById('post-content').innerHTML = `
                <div class="error">
                    <p>Sorry, there was an error loading this post.</p>
                    <a href="../index.html" class="btn btn-primary">Return to Home</a>
                </div>
            `;
        });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    if (document.querySelector('.blog-post-content')) {
        loadMarkdownContent();
    }


    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Render blog posts on homepage
    if (document.getElementById('blog-posts-container')) {
        renderBlogPosts();
    }

    // Render portfolio items on portfolio page
    if (document.getElementById('portfolio-container')) {
        renderPortfolioItems();
    }

    // Render categories in footer
    if (document.getElementById('categories-list')) {
        renderCategories();
    }

    // Setup navigation
    setupNavigation();

    // Setup dark mode toggle
    setupDarkModeToggle();

    // Setup newsletter form
    setupNewsletterForm();

    // Load and render markdown content for blog posts
    if (document.querySelector('.blog-post-content')) {
        loadMarkdownContent();
    }
});

// Render blog posts on the homepage
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card fade-in';
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-card-img">
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>${post.date}</span>
                    <span>${post.author}</span>
                    <span>${post.readTime}</span>
                </div>
                <div class="blog-card-tags">
                    ${post.tags.map(tag => `<span class="tag" data-tag="${tag.toLowerCase()}">${tag}</span>`).join('')}
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="blog/${post.id}.html" class="read-more">Read more <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(postElement);
    });
}

// Load and render markdown content for individual blog posts
function loadMarkdownContent() {
    const postId = window.location.pathname.split('/').pop().replace('.html', '');
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        window.location.href = '/404.html';
        return;
    }

    // Set post metadata
    document.title = `${post.title} | My Blog`;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-author').textContent = `By ${post.author}`;
    document.getElementById('read-time').textContent = post.readTime;

    // Set post tags
    const tagsContainer = document.getElementById('post-tags');
    tagsContainer.innerHTML = post.tags.map(tag =>
        `<span class="tag" data-tag="${tag.toLowerCase()}">${tag}</span>`
    ).join('');

    // Fetch and render markdown content
    fetch(post.markdownFile)
        .then(response => response.text())
        .then(markdown => {
            document.getElementById('post-content').innerHTML = marked.parse(markdown);
            // Apply syntax highlighting if needed
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        })
        .catch(error => {
            console.error('Error loading markdown file:', error);
            document.getElementById('post-content').innerHTML =
                '<p>Sorry, there was an error loading this post.</p>';
        });
}

/* Rest of your JavaScript functions from previous implementation */
/* setupNavigation, setupDarkModeToggle, etc. */