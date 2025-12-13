// Smart Tips for Kids - Complete JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Tips for Kids - Initializing...');
    
    try {
        // Initialize all components
        initNavigation();
        initHeroSlider(); // MUST BE CALLED FIRST
        initTestimonialSlider();
        initMemoryGame();
        initContactForm();
        initGallery();
        initScrollAnimations();
        initNewsletterForms();
        setCurrentYear();
        
        // Initialize page-specific filters
        initPageSpecificFilters();
        
        console.log('All components initialized successfully.');
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});

// Navigation
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
}

// Hero Image Slider - AMAZING EFFECTS
function initHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    
    // Amazing high-quality images
    const slides = [
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://www.pixelstalk.net/wp-content/uploads/2016/10/Children-Wallpapers-HD-Free-Download.jpg',
        'https://images8.alphacoders.com/415/thumb-1920-415272.jpg',
        'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://cdn.pixabay.com/photo/2013/03/10/17/57/children-92261_1280.jpg'
    ];
    const slideContainer = heroSlider.querySelector('.slide-container');
    if (!slideContainer) return;
    
    // Clear and create slides
    slideContainer.innerHTML = '';
    
    slides.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${src}')`;
        slideContainer.appendChild(slide);
    });
    
    // Create indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';
    
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    slideContainer.appendChild(indicatorsContainer);
    
    // Slider logic
    let currentSlide = 0;
    const allSlides = slideContainer.querySelectorAll('.slide');
    const indicators = slideContainer.querySelectorAll('.slide-indicator');
    let slideInterval;
    
    function goToSlide(index) {
        allSlides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        allSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        startAutoSlide();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000); // 3 seconds
    }
    
    // Start with effects
    startAutoSlide();
    
    // Pause on hover
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });
    
    // Add parallax effect on scroll
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        slideContainer.style.transform = `translateY(${rate}px)`;
        lastScrollY = scrolled;
    });
}

// Set current year in footer
function setCurrentYear() {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let slideInterval;
    
    if (testimonialSlides.length === 0) return;
    
    function showSlide(index) {
        if (index >= testimonialSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        testimonialSlides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    showSlide(0);
    startAutoSlide();
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }
    
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// NEW: Page-specific filter initialization
function initPageSpecificFilters() {
    // Check if we're on the stories page
    const isStoriesPage = document.querySelector('body.stories-page') || 
                         window.location.pathname.includes('stories') ||
                         document.querySelector('.page-header h1')?.textContent.includes('Stories');
    
    // Check if we're on the activities page
    const isActivitiesPage = document.querySelector('body.activities-page') || 
                           window.location.pathname.includes('activities') ||
                           document.querySelector('.page-header h1')?.textContent.includes('Activities');
    
    // Initialize stories filter if on stories page
    if (isStoriesPage) {
        initStoriesFilter();
    }
    
    // Initialize activities filter if on activities page
    if (isActivitiesPage) {
        initActivitiesFilter();
    }
}

// Stories Filter - FIXED VERSION
function initStoriesFilter() {
    console.log('Initializing stories filter...');
    
    const filterButtons = document.querySelectorAll('.games-filter .filter-btn');
    const storyCards = document.querySelectorAll('.story-card');
    
    if (filterButtons.length === 0 || storyCards.length === 0) {
        console.log('No filter buttons or story cards found');
        return;
    }
    
    console.log('Found', filterButtons.length, 'filter buttons and', storyCards.length, 'story cards');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Filter button clicked:', this.dataset.filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            let visibleCount = 0;
            
            // Filter stories
            storyCards.forEach(card => {
                const categories = card.dataset.category;
                console.log('Card categories:', categories, 'Filter:', filterValue);
                
                // Check if card belongs to selected category
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            console.log('Visible stories after filtering:', visibleCount);
            
            // Show/hide no stories message
            const noStoriesMsg = document.getElementById('noStoriesMessage');
            if (noStoriesMsg) {
                if (visibleCount === 0) {
                    noStoriesMsg.style.display = 'block';
                } else {
                    noStoriesMsg.style.display = 'none';
                }
            }
        });
    });
    
    // Initialize all cards with transitions
    storyCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
    
    console.log('Stories filter initialized successfully');
}

// Activities Filter - FOR ACTIVITIES PAGE ONLY
function initActivitiesFilter() {
    const filterButtons = document.querySelectorAll('.games-filter .filter-btn');
    if (filterButtons.length === 0) return;
    
    console.log('Initializing activities filter...');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Get all sections and their grids
            const allSections = document.querySelectorAll('.page-content > .container > div');
            
            if (filterValue === 'all') {
                // Show everything
                allSections.forEach(section => {
                    section.style.display = '';
                    section.style.opacity = '1';
                });
            } else {
                // Hide all sections first
                allSections.forEach(section => {
                    section.style.display = 'none';
                    section.style.opacity = '0';
                });
                
                // Show filter buttons and target section
                document.querySelector('.games-filter').style.display = '';
                document.querySelector('.games-filter').style.opacity = '1';
                
                // Show the target section
                const targetSection = document.getElementById(filterValue);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    setTimeout(() => {
                        targetSection.style.opacity = '1';
                    }, 10);
                    
                    // Show the activities grid after the section
                    const nextGrid = targetSection.nextElementSibling;
                    if (nextGrid && nextGrid.classList.contains('activities-grid')) {
                        nextGrid.style.display = 'grid';
                        setTimeout(() => {
                            nextGrid.style.opacity = '1';
                        }, 50);
                    }
                }
            }
        });
    });
}

// Initialize memory game
function initMemoryGame() {
    const memoryGame = document.getElementById('memoryGame');
    if (memoryGame) {
        initializeMemoryGame();
    }
}

// Memory Game Functionality - FIXED
function initializeMemoryGame() {
    const cards = [
        { id: 1, emoji: '🐶', name: 'Dog' },
        { id: 2, emoji: '🐱', name: 'Cat' },
        { id: 3, emoji: '🐭', name: 'Mouse' },
        { id: 4, emoji: '🐹', name: 'Hamster' },
        { id: 5, emoji: '🐰', name: 'Rabbit' },
        { id: 6, emoji: '🦊', name: 'Fox' },
        { id: 7, emoji: '🐻', name: 'Bear' },
        { id: 8, emoji: '🐼', name: 'Panda' }
    ];
    
    const gameCards = [...cards, ...cards];
    gameCards.sort(() => Math.random() - 0.5);
    
    const gameContainer = document.querySelector('.memory-game-grid');
    const movesElement = document.querySelector('.memory-moves');
    const timerElement = document.querySelector('.memory-timer');
    
    if (!gameContainer) return;
    
    gameContainer.innerHTML = '';
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    let moves = 0;
    let seconds = 0;
    let timer;
    
    startTimer();
    
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        
        cardElement.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${card.emoji}</div>
        `;
        
        cardElement.style.animationDelay = `${index * 0.05}s`;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameContainer.appendChild(cardElement);
    });
    
    if (movesElement) {
        movesElement.textContent = moves;
    }
    
    function flipCard(card) {
        if (lockBoard || card === firstCard || card.classList.contains('matched')) {
            return;
        }
        
        card.classList.add('flipped');
        moves++;
        
        if (movesElement) {
            movesElement.textContent = moves;
        }
        
        if (!firstCard) {
            firstCard = card;
            return;
        }
        
        secondCard = card;
        lockBoard = true;
        
        checkForMatch();
    }
    
    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            
            if (matchedPairs === cards.length) {
                clearInterval(timer);
                setTimeout(() => {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    const timeString = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
                    alert(`🎉 Congratulations! You matched all ${matchedPairs} pairs in ${moves} moves and ${timeString}! 🎉`);
                    const restartBtn = document.querySelector('.restart-game');
                    if (restartBtn) restartBtn.style.display = 'inline-block';
                }, 500);
            }
        } else {
            unflipCards();
        }
    }
    
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.classList.add('flipped');
        secondCard.classList.add('flipped');
        
        resetBoard();
    }
    
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
    
    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            if (timerElement) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    const restartBtn = document.querySelector('.restart-game');
    if (restartBtn) {
        restartBtn.style.display = 'none';
        restartBtn.addEventListener('click', () => {
            clearInterval(timer);
            initializeMemoryGame();
            restartBtn.style.display = 'none';
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let isValid = true;
            
            document.querySelectorAll('.error').forEach(error => error.remove());
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error-border');
            });
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
}

function showError(input, message) {
    input.classList.add('error-border');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#ffcc00';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    input.parentNode.appendChild(error);
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .activity-card, .story-card, .game-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <div class="modal-caption">${imgAlt}</div>
                    </div>
                `;
                
                const modalStyles = `
                    .gallery-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                        animation: fadeIn 0.3s ease;
                    }
                    .modal-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .modal-content img {
                        max-width: 100%;
                        max-height: 80vh;
                        border-radius: 10px;
                    }
                    .modal-close {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 30px;
                        cursor: pointer;
                    }
                    .modal-caption {
                        color: white;
                        text-align: center;
                        margin-top: 10px;
                        font-size: 18px;
                    }
                `;
                
                const styleSheet = document.createElement('style');
                styleSheet.textContent = modalStyles;
                document.head.appendChild(styleSheet);
                
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.classList.contains('modal-close')) {
                        document.body.removeChild(modal);
                        document.head.removeChild(styleSheet);
                    }
                });
                
                document.addEventListener('keydown', function closeModal(e) {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                        document.head.removeChild(styleSheet);
                        document.removeEventListener('keydown', closeModal);
                    }
                });
            });
        });
    }
}

// Newsletter Forms
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('form[id*="newsletter"]');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });
}