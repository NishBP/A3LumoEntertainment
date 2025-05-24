// Booking Modal Functionality

// I'll use an IIFE to avoid global scope pollution
(function() {
    // Get modal elements
    const modal = document.getElementById('booking-modal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const bookingForm = document.getElementById('booking-form');
    const successPopup = document.getElementById('success-popup');

    // Open modal when any book button is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', closeBookingModal);

    // Close modal when cancel is clicked
    cancelBtn.addEventListener('click', closeBookingModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });

    // Function to close the modal
    function closeBookingModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // re enable scrolling
        resetForm();
    }

    // Reset form and remove error states
    function resetForm() {
        bookingForm.reset();
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });
    }

    // Form validation and submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Clear previous errors
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });

        let isValid = true;

        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Please enter your name');
            isValid = false;
        }

        // Validate phone (Australian format()
        const phone = document.getElementById('phone');
        const phoneRegex = /^04[0-9]{8}$/; // Must start with 04 and have 10 digits total
        if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            showError(phone, 'Please enter a valid Australian mobile number (must start with 04)');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate event date (must be future date)
        const eventDate = document.getElementById('event-date');
        const selectedDate = new Date(eventDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for comparison
        
        if (eventDate.value === '' || selectedDate <= today) {
            showError(eventDate, 'Please select a future date');
            isValid = false;
        }

        // Validate event type
        const eventType = document.getElementById('event-type');
        if (eventType.value === '') {
            showError(eventType, 'Please select an event type');
            isValid = false;
        }

        // If form is valid, show success
        if (isValid) {
            closeBookingModal();
            showSuccessPopup();
        }
    });

    // Phone number input restrictions - only allow numbers
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        let value = this.value.replace(/[^0-9]/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Format the number as user types (04XX XXX XXX)
        if (value.length > 0) {
            let formatted = value;
            if (formatted.length > 4) {
                formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4);
            }
            if (formatted.length > 8) {
                formatted = formatted.slice(0, 8) + ' ' + formatted.slice(8);
            }
            this.value = formatted;
        } else {
            this.value = value;
        }
    });

    // Prevent non numeric key presses
    phoneInput.addEventListener('keypress', function(e) {
        // Allow backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Disable HTML5 validation to use custom validation
    bookingForm.setAttribute('novalidate', 'novalidate');

    // Show error message for a field
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    // Show success popup
    function showSuccessPopup() {
        successPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close success popup 
    window.closeSuccessPopup = function() {
        successPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Set minimum date to tomorrow for event date input
    const eventDateInput = document.getElementById('event-date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    eventDateInput.setAttribute('min', formattedDate);

})();