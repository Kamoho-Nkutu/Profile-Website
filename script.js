// Main Application Module
const PortfolioApp = (() => {
    // DOM Elements
    const elements = {
        toggleBtn: document.querySelector(".togglebtn"),
        navLinks: document.querySelector(".navlinks"),
        navItems: document.querySelectorAll(".navlinks li"),
        filterBtns: document.querySelectorAll(".filter-btn"),
        portfolioItems: document.querySelectorAll(".portfolio-item"),
        contactForm: document.querySelector(".contact-form form"),
        typedElement: document.querySelector(".input")
    };

    // Initialize the application
    const init = () => {
        setupEventListeners();
        initializeTypedJS();
    };

    // Set up all event listeners
    const setupEventListeners = () => {
        // Mobile navigation toggle
        if (elements.toggleBtn) {
            elements.toggleBtn.addEventListener("click", toggleMobileMenu);
        }

        // Close mobile menu when clicking on a link
        elements.navItems.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Portfolio filtering
        if (elements.filterBtns.length > 0) {
            elements.filterBtns.forEach(btn => {
                btn.addEventListener("click", () => filterPortfolio(btn));
            });
        }

        // Contact form submission
        if (elements.contactForm) {
            elements.contactForm.addEventListener("submit", handleFormSubmit);
        }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        elements.toggleBtn.classList.toggle("click");
        elements.navLinks.classList.toggle("open");
    };

    // Close mobile menu
    const closeMobileMenu = () => {
        if (elements.navLinks.classList.contains("open")) {
            elements.toggleBtn.classList.remove("click");
            elements.navLinks.classList.remove("open");
        }
    };

    // Filter portfolio items
    const filterPortfolio = (btn) => {
        // Update active button
        elements.filterBtns.forEach(btn => btn.classList.remove("active"));
        btn.classList.add("active");
        
        // Filter items
        const filter = btn.dataset.filter;
        
        elements.portfolioItems.forEach(item => {
            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "block";
                // Add animation when showing items
                item.style.animation = "fadeIn 0.5s ease forwards";
            } else {
                item.style.display = "none";
            }
        });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: e.target.querySelector("[name='name']").value.trim(),
            email: e.target.querySelector("[name='email']").value.trim(),
            subject: e.target.querySelector("[name='subject']").value.trim(),
            message: e.target.querySelector("[name='message']").value.trim()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Submit form (in a real app, this would be an API call)
        submitForm(formData)
            .then(() => {
                showSuccessMessage();
                e.target.reset();
            })
            .catch(error => {
                showErrorMessage(error);
            });
    };

    // Form validation
    const validateForm = (formData) => {
        if (!formData.name) {
            alert("Please enter your name");
            return false;
        }
        
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Please enter a valid email address");
            return false;
        }
        
        if (!formData.message) {
            alert("Please enter your message");
            return false;
        }
        
        return true;
    };

    // Simulate form submission
    const submitForm = (formData) => {
        return new Promise((resolve) => {
            console.log("Form submitted:", formData);
            // Simulate network delay
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    // Show success message
    const showSuccessMessage = () => {
        // You could replace this with a more elegant notification system
        alert("Thank you for your message! I'll get back to you soon.");
    };

    // Show error message
    const showErrorMessage = (error) => {
        console.error("Form submission error:", error);
        alert("There was an error sending your message. Please try again later.");
    };

    // Initialize Typed.js animation
    const initializeTypedJS = () => {
        if (!elements.typedElement) return;
        
        try {
            const typed = new Typed(elements.typedElement, {
                strings: [
                    "Frontend Developer", 
                    "Web Designer", 
                    "UI/UX Designer", 
                    "HTML/CSS Developer", 
                    "Full Stack Developer"
                ],
                typeSpeed: 70,
                backSpeed: 55,
                loop: true,
                cursorChar: "|",
                shuffle: false,
                backDelay: 1500
            });
        } catch (error) {
            console.error("Error initializing Typed.js:", error);
        }
    };

    // Public API
    return {
        init
    };
})();

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", PortfolioApp.init);

// Add CSS animation for portfolio items
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .portfolio-item {
        animation: fadeIn 0.5s ease forwards;
    }
`;
document.head.appendChild(style);

// Load projects from localStorage or API
const loadProjects = () => {
    const projectsContainer = document.querySelector(".portfolio-container");
    if (!projectsContainer) return;
    
    // Show loading state
    projectsContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        // Try to load from localStorage (set by admin dashboard)
        const projects = JSON.parse(localStorage.getItem("portfolioProjects")) || [];
        
        if (projects.length > 0) {
            renderProjects(projects);
        } else {
            // Load default projects if none are found
            loadDefaultProjects();
        }
    } catch (error) {
        console.error("Error loading projects:", error);
        loadDefaultProjects();
    }
};

// Render projects to the DOM
const renderProjects = (projects) => {
    const container = document.querySelector(".portfolio-container");
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="portfolio-item" data-category="${project.category || "web"}">
            <img src="${project.image || "image/default-project.jpg"}" alt="${project.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${project.title}</h3>
                <p>${project.technologies || "Project details"}</p>
                <a href="${project.url || "#"}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-link"></i>
                </a>
            </div>
        </div>
    `).join("");
    
    // Reinitialize event listeners for new items
    PortfolioApp.init();
};

// Load default projects
const loadDefaultProjects = () => {
    const container = document.querySelector(".portfolio-container");
    if (!container) return;
    
    container.innerHTML = `
        <!-- Default projects would be rendered here -->
    `;
};

// Load projects when page loads
document.addEventListener("DOMContentLoaded", loadProjects);