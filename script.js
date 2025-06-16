// Smooth Book Animation and Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    const pageTurnBTN = document.querySelectorAll('.nextprev-btn');
    const pages = document.querySelectorAll('.book-page.page-right');
    const contactMeBtn = document.querySelector('.custom-btn.contact');
    const backProfileBtn = document.querySelector('.back-profile');
    const coverRight = document.querySelector('.cover.cover-right');
    const pagesLeft = document.querySelector('.book-page.page-left');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav .nav-btn');
    const isMobile = window.innerWidth <= 700;

    // Mobile-specific setup
    if (isMobile) {
        setupMobileNavigation();
    } else {
        setupDesktopAnimation();
    }
    
    // Set up page turn buttons for desktop
    pageTurnBTN.forEach((el, index) => {
        el.onclick = () => {
            const pageTurnID = el.getAttribute('data-page');
            const pageTurn = document.getElementById(pageTurnID);
            if (pageTurn.classList.contains('turn')) {
                pageTurn.classList.remove('turn');
                setTimeout(() => {
                    pageTurn.style.zIndex = 20 - index;
                }, 400);
            } else {
                pageTurn.classList.add('turn');
                setTimeout(() => {
                    pageTurn.style.zIndex = 20 + index;
                }, 400);
            }
        };
    });

    // Contact Me Button Click Handler
    if (contactMeBtn) {
        contactMeBtn.onclick = function(e) {
            if (isMobile) {
                // In mobile, directly navigate to contact page
                e.preventDefault();
                showMobilePage(6); // Contact page index
            } else {
                // Desktop animation behavior
                pages.forEach((page, index) => {
                    setTimeout(() => {
                        page.classList.add('turn');
                        setTimeout(() => {
                            page.style.zIndex = 20 + index;
                        }, 350)
                    }, (index + 1) * 140 + 60)
                });
            }
        }
    }

    // For reverse page index tracking
    let totalPages = pages.length;
    let pageNumber = 0;

    function reverseIndex() {
        pageNumber--;
        if (pageNumber < 0) {
            pageNumber = totalPages - 1;
        }
    }

    // Back Profile Button Handler
    if (backProfileBtn) {
        backProfileBtn.onclick = function(e) {
            if (isMobile) {
                // In mobile, directly navigate to profile page
                e.preventDefault();
                showMobilePage(0); // Profile page index
            } else {
                // Desktop animation behavior
                pages.forEach((_, index) => {
                    setTimeout(() => {
                        reverseIndex();
                        pages[pageNumber].classList.remove('turn');
                        setTimeout(() => {
                            reverseIndex();
                            pages[pageNumber].style.zIndex = 10 + index;
                        }, 350)
                    }, (index + 1) * 140 + 60)
                });
            }
        }
    }

    // Desktop animation setup
    function setupDesktopAnimation() {
        // Opening animation (cover right animation)
        setTimeout(() => {
            if (coverRight) coverRight.classList.add('turn');
        }, 1900);

        setTimeout(() => {
            if (coverRight) coverRight.style.zIndex = -1;
        }, 2400);

        // Opening animation (page left or profile page animation)
        setTimeout(() => {
            if (pagesLeft) pagesLeft.style.zIndex = 20;
        }, 2700);

        // Opening animation (all page right animation)
        pages.forEach((_, index) => {
            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].classList.remove('turn');
                setTimeout(() => {
                    reverseIndex();
                    pages[pageNumber].style.zIndex = 10 + index;
                }, 350)
            }, (index + 1) * 120 + 1800)
        });
    }

    // Mobile navigation setup
    function setupMobileNavigation() {
        // Set the first nav button as active initially
        mobileNavButtons[0].classList.add('active');
        
        // Hide all pages except profile
        document.querySelectorAll('.book-page').forEach((page, index) => {
            if (index !== 0) { // Keep profile page visible
                page.style.display = 'none';
            }
        });

        // Add click handlers to mobile navigation buttons
        mobileNavButtons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                showMobilePage(index);
            });
        });
    }

    // Function to show a specific page on mobile
    function showMobilePage(pageIndex) {
        // Update active button
        mobileNavButtons.forEach((btn, i) => {
            if (i === pageIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Hide all pages
        document.querySelectorAll('.book-page').forEach(page => {
            page.style.display = 'none';
        });
        
        // Show the selected page
        if (pageIndex === 0) {
            // Profile page
            document.querySelector('.book-page.page-left').style.display = 'block';
        } else if (pageIndex % 2 === 1) {
            // Odd pages (1,3,5) - show front side
            const pageNum = Math.ceil(pageIndex/2);
            const page = document.querySelector(`#turn-${pageNum}`);
            if (page) {
                page.style.display = 'block';
                page.querySelector('.page-front').style.display = 'block';
                page.querySelector('.page-back').style.display = 'none';
            }
        } else {
            // Even pages (2,4,6) - show back side
            const pageNum = pageIndex/2;
            const page = document.querySelector(`#turn-${pageNum}`);
            if (page) {
                page.style.display = 'block';
                page.querySelector('.page-front').style.display = 'none';
                page.querySelector('.page-back').style.display = 'block';
            }
        }
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-box form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.querySelector('.contact-box .field[placeholder="Full Name"]').value;
            const email = document.querySelector('.contact-box .field[placeholder="Email Address"]').value;
            const message = document.querySelector('.contact-box .field[placeholder="Your Message"]').value;

            // Basic HTML escaping
            function escapeHTML(str) {
                let div = document.createElement('div');
                div.textContent = str;
                return div.innerHTML;
            }

            const escapedFullName = escapeHTML(fullName);
            const escapedEmail = escapeHTML(email);
            const escapedMessage = escapeHTML(message);

            // Send data to FormSubmit
            fetch("https://formsubmit.co/4b140d3a2b4d63467921564bd438867a", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    name: escapedFullName,
                    email: escapedEmail,
                    message: escapedMessage,
                    _captcha: "false"
                })
            })
                .then(response => {
                    if (response.ok) {
                        alert("Message sent successfully!");
                        contactForm.reset();
                    } else {
                        alert("Failed to send message. Please try again later.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Something went wrong. Please try again.");
                });
        });
    }

    // Page turning performance hints
    const pagesRight = document.querySelectorAll('.book-page.page-right');
    if (coverRight) coverRight.style.willChange = 'transform';
    pagesRight.forEach(page => {
        page.style.willChange = 'transform';
    });

    // Window resize handler to refresh page if switching between mobile/desktop
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const wasMobile = lastWidth <= 700;
        const isMobileNow = newWidth <= 700;
        
        // If crossing the mobile/desktop threshold, reload the page
        if ((wasMobile && !isMobileNow) || (!wasMobile && isMobileNow)) {
            window.location.reload();
        }
        
        lastWidth = newWidth;
    });
});

// Mobile touch support
document.addEventListener('touchstart', () => {}, { passive: true });