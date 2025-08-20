document.addEventListener('DOMContentLoaded', () => {

    // --- Project Filtering Functionality ---
    // Using event delegation for efficiency. A single listener on the parent.
    const filterContainer = document.querySelector('.filter-buttons'); // Corrected to match the class in the CSS/HTML
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectSections = document.querySelectorAll('.section-card');

    filterContainer.addEventListener('click', (e) => {
        // Use .closest() to ensure the click is handled even if an inner element (like an icon) is clicked
        const clickedButton = e.target.closest('.filter-btn');
        if (!clickedButton) return; // Exit if the click was not on a button or its child

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        clickedButton.classList.add('active');

        const filterValue = clickedButton.dataset.filter;
        
        projectSections.forEach(section => {
            const category = section.dataset.category;
            const shouldBeHidden = !(filterValue === 'all' || category === filterValue);
            section.classList.toggle('hidden', shouldBeHidden);
        });
    });

    // --- Image Modal Functionality ---
    // Refactored into functions for better organization and reusability.
    const modal = document.getElementById('projectModal');
    const projectTiles = document.querySelectorAll('.project-tile');
    const closeModalBtn = document.querySelector('.close');
    
    // Get elements from the new modal structure
    const modalTitle = document.getElementById('modalTitle');
    const modalDescriptionText = document.getElementById('modalDescriptionText');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalThumbnails = document.getElementById('modalThumbnails');

    function openModal(tile) {
        // Extract data from the data-* attributes
        const title = tile.dataset.title || 'Project Details';
        const description = tile.dataset.description || 'No description available.';
        const images = tile.dataset.images ? tile.dataset.images.split(',') : [];

        // Populate the modal with the data
        modalTitle.textContent = title;
        modalDescriptionText.textContent = description;

        // Clear previous thumbnails
        modalThumbnails.innerHTML = '';

        if (images.length > 0) {
            // Set the main image to the first one
            modalMainImage.src = images[0];

            // Create and add thumbnail images
            images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `${title} thumbnail ${index + 1}`;
                thumb.classList.add('modal-thumbnail-img');
                if (index === 0) {
                    thumb.classList.add('active'); // Mark the first one as active
                }
                modalThumbnails.appendChild(thumb);
            });
        }

        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    projectTiles.forEach(tile => {
        tile.addEventListener('click', () => openModal(tile));
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close the modal with the 'Escape' key for accessibility
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // --- Contact Form Submission & Booking ---
    const contactForm = document.getElementById('contactForm');
    const bookBtn = document.querySelector('.book-btn');

    // Handle form submission (client-side only)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // In a real-world scenario, you would send this data to a server
        // for processing, for example using the Fetch API.
        // A server-side script is required to handle the email sending.
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Example of what would happen on a server
        console.log('Form Submitted!');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);

        // A simple confirmation message to the user
        alert('Thank you for your message! I will get back to you shortly.');

        // Reset the form after submission
        contactForm.reset();
    });

    // Handle "Book an Appointment" button with a mailto link
    bookBtn.addEventListener('click', () => {
        // Construct the mailto link with a pre-filled subject
        const mailtoLink = `mailto:amankwahp@apcgh.com?subject=Appointment%20Request&body=Hello,%20I%20would%20like%20to%20book%20an%20appointment.%20Please%20let%20me%20know%20your%20availability.`;
        // Directly navigating to the mailto link is simpler and cleaner
        window.location.href = mailtoLink;
    });

});
