document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    // Function to display a post
    const displayPost = (postData) => {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <h3>${postData.title}</h3>
            <p>${postData.review}</p>
            <p>Rating: ${postData.rating}/5</p>
        `;
        postsContainer.prepend(post);
    };

    // Load existing posts from localStorage
    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Display posts in reverse chronological order by prepending them
    savedPosts.forEach(displayPost);

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const gameTitle = document.getElementById('game-title').value;
        const gameReview = document.getElementById('game-review').value;
        const gameRating = document.getElementById('game-rating').value;

        const newPost = {
            title: gameTitle,
            review: gameReview,
            rating: gameRating,
        };

        // Add the new post to the array and save to localStorage
        savedPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(savedPosts));

        displayPost(newPost);

        postForm.reset();
    });
});
