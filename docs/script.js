document.addEventListener('DOMContentLoaded', () => {
    // Composer elements
    const postButton = document.getElementById('post-button');
    const composerTextarea = document.getElementById('composer-textarea');
    const gameTitleInput = document.getElementById('game-title-input');
    const starRatingContainer = document.getElementById('star-rating');
    const stars = starRatingContainer.querySelectorAll('span');
    const composer = document.getElementById('composer');
    const feed = document.querySelector('.divide-y');

    // Sidebar button
    const writeReviewButton = document.getElementById('write-review-button');

    // Filter tabs
    const filterTabs = document.getElementById('filter-tabs');

    let currentRating = 0;

    // --- Create Review Card Function ---
    const createReviewCard = (title, review, rating) => {
        const article = document.createElement('article');
        article.className = 'p-4 @container hover:bg-white/5 transition-colors duration-200';

        const filledStars = Array(rating).fill('<span class="material-symbols-outlined !text-xl" style="font-variation-settings: \'FILL\' 1">star</span>').join('');
        const emptyStars = Array(5 - rating).fill('<span class="material-symbols-outlined !text-xl">star</span>').join('');

        article.innerHTML = `
            <div class="flex flex-col items-stretch justify-start">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Reviewer's avatar" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBxgnhvs6Dg26y7ddXD3qnskivIEtl1xTOpeRJf80WxIZtZkL5RnL8f7Tp-QtQHqA9mGHKK-OAvCpi9YXzw1zUtqvLLyu3-tjurO83jgovQV5ZdTldQlXo4qPuxiE15YgsrMwCWljGRHP_hmb7Z8uPp1ruC3sN8Gl_S84S1v_tAOQWfZBFxKxTcBE9o0eI5NQ0UF19PCa-hJvmaDq2fvDs3dTLd_jfE57r2jdZJJxc_aQ28fKqbo7w0RqTjZDW87ZlRYy-iKIK9TU");'></div>
                    <div>
                        <p class="text-white text-base font-bold leading-tight">Alex Drake <span class="text-[#ad92c9] font-normal">reviewed</span></p>
                        <p class="text-[#ad92c9] text-sm">Just now</p>
                    </div>
                </div>
                <div class="flex flex-col @[480px]:flex-row @[480px]:items-start gap-4">
                    <div class="w-full @[480px]:w-48 @[480px]:flex-shrink-0 bg-center bg-no-repeat aspect-[3/4] bg-cover rounded" data-alt="Game cover art" style='background-image: url("https://placehold.co/300x400/191022/ad92c9?text=Game+Art");'></div>
                    <div class="flex w-full grow flex-col items-stretch justify-center gap-2">
                        <h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">${title}</h2>
                        <div class="flex items-center text-yellow-400">
                            ${filledStars}${emptyStars}
                            <span class="text-white ml-2 text-sm font-bold">${rating}/5 Stars</span>
                        </div>
                        <p class="text-[#ad92c9] text-base font-normal leading-normal">${review}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-4 py-2">
                <button class="flex items-center justify-center gap-2 px-3 py-2 text-[#ad92c9] hover:text-primary rounded-full hover:bg-primary/10 transition-colors duration-200" data-action="like">
                    <span class="material-symbols-outlined">thumb_up</span>
                    <p class="text-[13px] font-bold leading-normal tracking-[0.015em]">0</p>
                </button>
                <button class="flex items-center justify-center gap-2 px-3 py-2 text-[#ad92c9] hover:text-primary rounded-full hover:bg-primary/10 transition-colors duration-200" data-action="comment">
                    <span class="material-symbols-outlined">chat_bubble</span>
                    <p class="text-[13px] font-bold leading-normal tracking-[0.015em]">0</p>
                </button>
                <button class="flex items-center justify-center gap-2 px-3 py-2 text-[#ad92c9] hover:text-primary rounded-full hover:bg-primary/10 transition-colors duration-200" data-action="share">
                    <span class="material-symbols-outlined">share</span>
                    <p class="text-[13px] font-bold leading-normal tracking-[0.015em]">0</p>
                </button>
            </div>
        `;
        return article;
    };


    // --- Star Rating Logic ---
    const setStarRating = (rating) => {
        stars.forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= rating) {
                star.style.fontVariationSettings = "'FILL' 1";
            } else {
                star.style.fontVariationSettings = "'FILL' 0";
            }
        });
    };

    starRatingContainer.addEventListener('click', (event) => {
        const clickedStar = event.target.closest('span');
        if (clickedStar) {
            currentRating = parseInt(clickedStar.dataset.value);
            setStarRating(currentRating);
        }
    });

    starRatingContainer.addEventListener('mouseover', (event) => {
        const hoveredStar = event.target.closest('span');
        if (hoveredStar) {
            const hoverValue = parseInt(hoveredStar.dataset.value);
            setStarRating(hoverValue);
        }
    });

    starRatingContainer.addEventListener('mouseout', () => {
        setStarRating(currentRating);
    });


    // --- Post Button Logic ---
    postButton.addEventListener('click', () => {
        const gameTitle = gameTitleInput.value.trim();
        const reviewText = composerTextarea.value.trim();

        if (gameTitle && reviewText && currentRating > 0) {
            const newReview = createReviewCard(gameTitle, reviewText, currentRating);
            feed.prepend(newReview);

            // Clear inputs
            gameTitleInput.value = '';
            composerTextarea.value = '';
            currentRating = 0;
            setStarRating(currentRating);

        } else {
            alert('Please fill out the game title, review, and select a rating.');
        }
    });

    // --- "Write a Review" Button Logic ---
    writeReviewButton.addEventListener('click', () => {
        composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        gameTitleInput.focus();
    });

    // --- Filter Tab Logic ---
    filterTabs.addEventListener('click', (event) => {
        const clickedTab = event.target.closest('a');
        if (clickedTab) {
            event.preventDefault();
            const filterType = clickedTab.dataset.filter;
            console.log('Filter changed to:', filterType);

            // Remove active styles from all tabs
            filterTabs.querySelectorAll('a').forEach(tab => {
                tab.classList.remove('border-b-primary', 'text-white');
                tab.classList.add('border-b-transparent', 'text-[#ad92c9]');
            });

            // Add active styles to the clicked tab
            clickedTab.classList.add('border-b-primary', 'text-white');
            clickedTab.classList.remove('border-b-transparent', 'text-[#ad92c9]');
        }
    });

    // --- Action Button Logic (Like, Comment, Share) ---
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            console.log(`Action performed: ${action}`);
        });
    });
});
