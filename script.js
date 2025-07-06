// script.js - Elegance Glow Website Interactions

document.addEventListener('DOMContentLoaded', () => {

    // Function to display custom alert messages (instead of browser alert())
    // Moved this function outside of any specific form/button block
    function alertMessage(message, type) {
        let messageBox = document.getElementById('customAlertBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'customAlertBox';
            document.body.appendChild(messageBox);

            const messageStyle = document.createElement('style');
            messageStyle.innerHTML = `
                #customAlertBox {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 15px 30px;
                    border-radius: 5px;
                    font-weight: 500;
                    color: white;
                    text-align: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    min-width: 250px;
                }
                #customAlertBox.success {
                    background-color: #4CAF50; /* Green */
                }
                #customAlertBox.error {
                    background-color: #f44336; /* Red */
                }
                #customAlertBox.show {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            `;
            document.head.appendChild(messageStyle);
        }

        messageBox.textContent = message;
        messageBox.className = ''; // Reset classes
        messageBox.classList.add(type); // Add type class (success/error)
        messageBox.classList.add('show'); // Show the message

        // Automatically hide after 3 seconds
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }


    // 1. Smooth Scrolling for Navigation Links
    // Select all anchor links that might be internal (starting with #)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default anchor link behavior
            event.preventDefault();

            // Get the target section's ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // If the target section exists, scroll smoothly to it
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Enable smooth scrolling
                    block: 'start'       // Align the top of the element with the top of the viewport
                });
            }
        });
    });

    // 2. Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTopBtn';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Style for the button (you might want to add this to your style.css as well)
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
        #backToTopBtn {
            display: none; /* Hidden by default */
            position: fixed; /* Fixed position */
            bottom: 30px; /* Place at the bottom */
            right: 30px; /* Place at the right */
            z-index: 99; /* Ensure it's on top of other content */
            border: none; /* Remove borders */
            outline: none; /* Remove outline */
            background-color: var(--accent-gold); /* Gold background */
            color: white; /* White text */
            cursor: pointer; /* Add a mouse pointer on hover */
            padding: 15px 20px; /* Some padding */
            border-radius: 50%; /* Rounded shape */
            font-size: 18px; /* Increase font size */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
            transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
        }

        #backToTopBtn:hover {
            background-color: var(--dark-grey-text); /* Darker on hover */
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(buttonStyle);

    // When the user scrolls down 200px from the top, show the button
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0'; // Use opacity for fade out
            // Hide after transition for screen readers
            setTimeout(() => {
                if (backToTopButton.style.opacity === '0') {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

    // 3. Basic Contact Form Validation (on contact.html)
    const contactForm = document.querySelector('.contact-form-container form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            // Simple validation: check if fields are not empty
            if (!nameInput.value.trim()) {
                isValid = false;
                alertMessage('Please enter your name.', 'error');
                nameInput.focus();
                event.preventDefault();
                return;
            }
            if (!emailInput.value.trim()) {
                isValid = false;
                alertMessage('Please enter your email address.', 'error');
                emailInput.focus();
                event.preventDefault();
                return;
            }
            // Basic email format validation
            if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                isValid = false;
                alertMessage('Please enter a valid email address.', 'error');
                emailInput.focus();
                event.preventDefault();
                return;
            }
            if (!messageInput.value.trim()) {
                isValid = false;
                alertMessage('Please enter your message.', 'error');
                messageInput.focus();
                event.preventDefault();
                return;
            }

            if (isValid) {
                // Prevent actual form submission for this example,
                // in a real app, you'd send data to a server here.
                event.preventDefault();
                alertMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset(); // Clear the form
            }
        });
    }

    // 4. "Add to Cart" Feedback (on products.html)
    const addToCartButtons = document.querySelectorAll('.product-item .btn-small');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior (e.g., navigating to #)

                const productItem = this.closest('.product-item');
                const productName = productItem.querySelector('h3').textContent;

                // Display a temporary message near the button or at the top
                alertMessage(`${productName} added to cart!`, 'success');

                // In a real e-commerce scenario, you would add actual cart logic here:
                // - Send data to a server
                // - Update a cart icon/count
                // - Store in localStorage
            });
        });
    }

});

