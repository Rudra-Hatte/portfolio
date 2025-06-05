// Turn pages when clicked next or prev

const pageTurnBTN = document.querySelectorAll('.nextprev-btn');

pageTurnBTN.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnID = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnID);
        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    };
})

//contact me button when clicked

const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.custom-btn.contact');

contactMeBtn.onclick = () => {
    pages.forEach((page,index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            },500)
        },(index + 1) * 200 + 100)
    })
}

//create reverse index function 

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

//back profile button when clicked

const backProfileBtn = document.querySelector('.back-profile');
backProfileBtn.onclick = () => {
    pages.forEach((_,index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            },500)
        },(index + 1) * 200 + 100)
    })
}

//opening animation 
const coverRight = document.querySelector('.cover.cover-right');
const pagesLeft = document.querySelector('.book-page.page-left');

//opening animation (cover right animation)

setTimeout(() => {
    coverRight.classList.add('turn');

},2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;

},2800)

//opening animation (page left or profile page animation)
setTimeout(() => {
    pagesLeft.style.zIndex = 20;

},3200)



//opening animation (all page right animation)

pages.forEach((_,index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            },500)
        },(index + 1) * 200 + 2100)
    })


const contactForm = document.querySelector('.contact-box form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

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
    fetch("https://formsubmit.co/ 4b140d3a2b4d63467921564bd438867a", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            name: escapedFullName,
            email: escapedEmail,
            message: escapedMessage,
            _captcha: "false"
            // _next: "https://your-site.vercel.app/thankyou.html"
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

const initPageTurning = () => {
  const coverRight = document.querySelector('.cover.cover-right');
  const pagesRight = document.querySelectorAll('.book-page.page-right');
  
  // Pre-render pages to avoid first-time rendering lag
  if (coverRight) {
    coverRight.style.willChange = 'transform';
  }
  
  pagesRight.forEach(page => {
    page.style.willChange = 'transform';
  });
};

// Call this when the page loads
window.addEventListener('load', initPageTurning);

// Add this for touch devices
document.addEventListener('touchstart', () => {}, {passive: true});