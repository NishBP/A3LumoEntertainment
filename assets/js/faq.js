// assets/js/faq.js
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.getElementsByClassName("faq-question"); // Using your existing class name

    for (let i = 0; i < faqQuestions.length; i++) {
        faqQuestions[i].addEventListener("click", function() {
            // Toggle active class for styling the button (e.g., arrow rotation)
            this.classList.toggle("active");

            // Get the next element, which is the .faq-answer div
            const answer = this.nextElementSibling;

            if (answer.style.display === "block") {
                answer.style.display = "none";
                this.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
            } else {
                answer.style.display = "block";
                this.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
            }
        });
    }
});