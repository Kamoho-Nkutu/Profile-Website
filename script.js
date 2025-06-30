// Navigation Toggle
const togglebtn = document.querySelector(".togglebtn");
const nav = document.querySelector(".navlinks");
const links = document.querySelectorAll(".navlinks li");

togglebtn.addEventListener("click", function(){
    this.classList.toggle("click");
    nav.classList.toggle("open");
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener("click", () => {
        if(nav.classList.contains("open")) {
            togglebtn.classList.remove("click");
            nav.classList.remove("open");
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");
        
        const filter = btn.getAttribute("data-filter");
        
        portfolioItems.forEach(item => {
            if(filter === "all" || item.getAttribute("data-category") === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Form Submission
const contactForm = document.querySelector(".contact-form form");

if(contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector("[name='name']").value;
        const email = this.querySelector("[name='email']").value;
        const subject = this.querySelector("[name='subject']").value;
        const message = this.querySelector("[name='message']").value;
        
        // Here you would typically send the form data to a server
        console.log({name, email, subject, message});
        
        // Show success message
        alert("Thank you for your message! I'll get back to you soon.");
        this.reset();
    });
}

// Initialize Typed.js on homepage only
if(document.querySelector(".input")) {
    const typed = new Typed(".input", {
        strings: ["Frontend Developer", "Web Designer", "UI/UX Designer", "HTML/CSS Developer", "Full Stack Developer"],
        typeSpeed: 70,
        backSpeed: 55,
        loop: true
    });
}