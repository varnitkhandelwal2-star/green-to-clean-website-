document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navigation Scroll Effect
    const header = document.getElementById('header-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Responsive Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('open');
            // Toggle hamburger animation style
            menuToggle.classList.toggle('active');
            
            // Simple visual transformation of hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Scroll Spy (Active link indicator based on viewport section)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Products Tab Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                // Smooth transition helper
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow to restart animation
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // 5. Contact Enquiry Form Simulation & Validation
    const enquiryForm = document.getElementById('enquiry-form');
    const feedbackMsg = document.getElementById('form-feedback-msg');

    if (enquiryForm && feedbackMsg) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept real submit

            const nameVal = document.getElementById('form-name').value.trim();
            const phoneVal = document.getElementById('form-phone').value.trim();
            const categoryVal = document.getElementById('form-interest').value;
            const messageVal = document.getElementById('form-message').value.trim();

            // Simple validation check
            if (!nameVal || !phoneVal || !categoryVal || !messageVal) {
                showFeedback('Please fill out all required fields.', 'error');
                return;
            }

            // Indian phone number sanity check (e.g. 10 digits)
            const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
            if (cleanPhone.length < 10) {
                showFeedback('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Visual submitting state
            const submitBtn = enquiryForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending enquiry...';

            // Simulate form submission API delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;

                // Success response
                showFeedback(`Thank you, ${nameVal}! Your enquiry for ${categoryVal} has been logged. Mr. Piyush Kumar's team will contact you at ${phoneVal} shortly.`, 'success');
                
                // Construct a WhatsApp fallback prompt link dynamically in logs for offline testing
                console.log(`WhatsApp Redirect link for this client query: https://wa.me/918047815236?text=Hi%20Green%202%20Clean%20Services,%20my%20name%20is%20${encodeURIComponent(nameVal)}.%20I%20am%20enquiring%20about%20${encodeURIComponent(categoryVal)}.%20Details:%20${encodeURIComponent(messageVal)}`);
                
                enquiryForm.reset();
            }, 1200);
        });
    }

    function showFeedback(message, type) {
        feedbackMsg.innerText = message;
        feedbackMsg.className = 'form-feedback'; // reset
        
        if (type === 'success') {
            feedbackMsg.classList.add('success');
        } else if (type === 'error') {
            feedbackMsg.classList.add('error');
        }

        // Auto fadeout error messages
        if (type === 'error') {
            setTimeout(() => {
                feedbackMsg.style.display = 'none';
                setTimeout(() => {
                    feedbackMsg.className = 'form-feedback';
                    feedbackMsg.innerText = '';
                    feedbackMsg.style.display = '';
                }, 500);
            }, 5000);
        }
    }
});
