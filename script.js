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
    const modalGallery = document.querySelector('.modal-gallery');
    const modalProjectLink = document.getElementById('modalProjectLink');

    function openModal(tile) {
        // Extract data from the data-* attributes
        const title = tile.dataset.title || 'Project Details';
        const description = tile.dataset.description || 'No description available.';
        const images = tile.dataset.images ? tile.dataset.images.split(',') : [];
        const url = tile.dataset.url;

        // Populate the modal with the data
        modalTitle.textContent = title;
        modalDescriptionText.textContent = description;

        // Clear previous thumbnails
        modalThumbnails.innerHTML = '';

        if (images.length > 0) {
            modalGallery.style.display = 'block'; // Show the gallery
            // Set the main image to the first one
            modalMainImage.src = images[0];
            modalMainImage.alt = `${title} main image`;

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
        } else {
            // If there are no images, hide the gallery section completely
            modalGallery.style.display = 'none';
        }

        // Handle the "View Project" link
        // Check if URL is not empty and not just a placeholder
        if (url && url !== '#') {
            modalProjectLink.href = url;
            modalProjectLink.style.display = 'inline-flex'; // Use inline-flex to match CSS
        } else {
            modalProjectLink.style.display = 'none';
        }

        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    projectTiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            // If the click target is the link button, do nothing and let the link work.
            if (e.target.closest('.tile-view-btn')) {
                return;
            }
            openModal(tile);
        });
    });

    // Add event listener for thumbnail clicks using event delegation
    modalThumbnails.addEventListener('click', (e) => {
        // Check if a thumbnail image was clicked
        if (e.target.classList.contains('modal-thumbnail-img')) {
            const clickedThumb = e.target;

            // Update the main image source
            modalMainImage.src = clickedThumb.src;

            // Update the active state for the thumbnails
            const allThumbs = modalThumbnails.querySelectorAll('.modal-thumbnail-img');
            allThumbs.forEach(thumb => thumb.classList.remove('active'));
            clickedThumb.classList.add('active');
        }
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
    const formSubject = document.getElementById('formSubject'); // Get the hidden subject field

    // The form now submits directly to Formspree, so the JS submission handler is removed.
    // This listener updates the "Book an Appointment" button functionality.
    bookBtn.addEventListener('click', () => {
        // 1. Update the hidden subject field to indicate an appointment request
        if (formSubject) {
            formSubject.value = "Appointment Request from Portfolio";
        }

        // 2. Smoothly scroll down to the contact form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 3. Focus the first input field to guide the user
        contactForm.querySelector('input[name="name"]').focus();
    });

});
