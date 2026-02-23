// --------------------------------------------------------
// MotoHub - Advanced JavaScript (main.js)
// --------------------------------------------------------

// --- 9. Loader animation before page loads ---
// We create a loader overlay immediately as the script parses
const loader = document.createElement('div');
loader.id = "page-loader";
loader.style.position = "fixed";
loader.style.top = "0";
loader.style.left = "0";
loader.style.width = "100vw";
loader.style.height = "100vh";
loader.style.backgroundColor = "#0a0a0a";
loader.style.zIndex = "9999";
loader.style.display = "flex";
loader.style.justifyContent = "center";
loader.style.alignItems = "center";
loader.style.color = "#d4af37";
loader.style.fontSize = "24px";
loader.style.fontFamily = "'Orbitron', sans-serif";
loader.innerHTML = "<span>MotoHub Loading...</span>";
document.documentElement.appendChild(loader);

// Hide loader smoothly once all page assets (images, css) are completely loaded
window.addEventListener("load", () => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
        if (loader.parentNode) loader.remove();
    }, 600);
});

// --- Theme Initialization (Run as early as possible) ---
const subBikePages = ["commuter.html", "crusier.html", "mileage.html", "offroad.html", "popular.html", "sports.html"];
const isSubBikePage = subBikePages.some(page => window.location.pathname.toLowerCase().endsWith(page));

const applyTheme = (theme) => {
    if (isSubBikePage) {
        document.documentElement.classList.add("theme-light");
        document.body?.classList.add("theme-light");
        return;
    }
    if (theme === "light") {
        document.documentElement.classList.add("theme-light");
        document.body?.classList.add("theme-light");
    } else {
        document.documentElement.classList.remove("theme-light");
        document.body?.classList.remove("theme-light");
    }
};

// Check preference immediately
const savedTheme = localStorage.getItem("motohub_theme") || "dark";
if (isSubBikePage || savedTheme === "light") {
    document.documentElement.classList.add("theme-light");
}

// We use DOMContentLoaded so DOM elements are available for interaction
document.addEventListener("DOMContentLoaded", () => {

    // --- 15. Display Alert or Toast Messages for User Actions ---
    // A reusable function to show modern, non-blocking toast notifications
    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = type === "success" ? "#4CAF50" : "#F44336";
        toast.style.color = "white";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
        toast.style.zIndex = "10000";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s, bottom 0.3s";

        document.body.appendChild(toast);

        // Trigger slide up and fade in
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.bottom = "40px";
        }, 10);

        // Slide down and fade out after 3 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.bottom = "20px";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Responsive Nav Menu ---
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");

    if (menuBtn && navigation) {
        menuBtn.addEventListener("click", () => {
            navigation.classList.toggle("active");
        });
    }

    // --- 11. Highlight active navigation link automatically ---
    const currentLocation = window.location.pathname.split('/').pop().toLowerCase();
    const navLinks = document.querySelectorAll(".navigation a");

    navLinks.forEach(link => {
        link.classList.remove("active");
        const linkPath = link.getAttribute("href").split('/').pop().toLowerCase();
        // If link's path matches the current filename, or root matches index.html
        if (linkPath === currentLocation || (currentLocation === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });

    // --- Page Load Smooth Fade-in ---
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.8s ease-in";
    setTimeout(() => document.body.style.opacity = "1", 100);

    // --- Scroll to Top Button ---
    let topBtn = document.getElementById("topBtn") || document.createElement("button");
    if (!document.getElementById("topBtn")) {
        topBtn.id = "topBtn";
        topBtn.innerHTML = "↑";
        topBtn.style.position = "fixed";
        topBtn.style.bottom = "20px";
        topBtn.style.right = "20px";
        topBtn.style.padding = "10px 15px";
        topBtn.style.backgroundColor = "#d4af37";
        topBtn.style.color = "black";
        topBtn.style.border = "none";
        topBtn.style.borderRadius = "50%";
        topBtn.style.cursor = "pointer";
        topBtn.style.display = "none";
        topBtn.style.zIndex = "1000";
        topBtn.style.fontSize = "20px";
        topBtn.style.boxShadow = "0 0 10px rgba(212, 175, 55, 0.5)";
        document.body.appendChild(topBtn);
    } else {
        topBtn.style.display = "none";
    }

    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- 12. Dark Mode Toggle (Disabled for sub bike model pages) ---
    if (isSubBikePage) {
        document.body.classList.add("theme-light");
        return; // Skip creating the button
    }

    const darkModeBtn = document.createElement("button");
    darkModeBtn.style.position = "fixed";
    darkModeBtn.style.bottom = "80px";
    darkModeBtn.style.right = "20px";
    darkModeBtn.style.padding = "10px";
    darkModeBtn.style.backgroundColor = "#333";
    darkModeBtn.style.color = "white";
    darkModeBtn.style.border = "none";
    darkModeBtn.style.borderRadius = "50%";
    darkModeBtn.style.cursor = "pointer";
    darkModeBtn.style.zIndex = "1000";
    darkModeBtn.style.fontSize = "20px";
    darkModeBtn.title = "Toggle Light/Dark Theme";
    document.body.appendChild(darkModeBtn);

    // Check localStorage. If user picked light mode previously, apply it
    if (localStorage.getItem("motohub_theme") === "light") {
        document.body.classList.add("theme-light");
        darkModeBtn.innerHTML = "🌙";
    } else {
        document.body.classList.remove("theme-light");
        darkModeBtn.innerHTML = "☀️";
    }

    darkModeBtn.addEventListener("click", () => {
        if (document.body.classList.contains("theme-light")) {
            document.body.classList.remove("theme-light");
            document.documentElement.classList.remove("theme-light");
            darkModeBtn.innerHTML = "☀️";
            localStorage.setItem("motohub_theme", "dark");
            showToast("Dark mode enabled", "success");
        } else {
            document.body.classList.add("theme-light");
            document.documentElement.classList.add("theme-light");
            darkModeBtn.innerHTML = "🌙";
            localStorage.setItem("motohub_theme", "light");
            showToast("Light mode enabled", "success");
        }
    });

    // --- 1. & 14. Bike Category Filtering & Dynamic Search ---
    const searchSection = document.querySelector(".search-section");
    const searchInput = document.querySelector(".search-section input");
    const searchBtn = document.querySelector(".search-section button");
    const bikeCards = document.querySelectorAll(".boxpage3, .bike-card, .featured"); // Includes features/categories
    const filterButtons = document.querySelectorAll(".filter-btn");

    function executeSearch() {
        if (!searchInput) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        let matchCount = 0;

        bikeCards.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            // Show card if it contains the search text, else hide it
            if (cardText.includes(searchTerm)) {
                card.style.display = "block";
                matchCount++;
            } else {
                card.style.display = "none";
            }
        });

        // If the user actually typed something, scroll to results or show a toast
        if (searchTerm !== "") {
            if (matchCount > 0) {
                showToast(`Found ${matchCount} result(s) for "${searchTerm}"`, "success");
                // Scroll smoothly to the category/featured section
                const bikesSection = document.querySelector(".pG3") || document.querySelector(".featured");
                if (bikesSection) bikesSection.scrollIntoView({ behavior: "smooth" });
            } else {
                showToast(`No bikes found matching "${searchTerm}"`, "error");
            }
        } else {
            // If empty search, reset all cards
            bikeCards.forEach(card => card.style.display = "block");
        }
    }

    // Dynamic Search functionality as user types
    if (searchInput && bikeCards.length > 0) {
        searchInput.addEventListener("input", () => {
            // We do a "silent" real-time search to visually filter, no toasts
            const searchTerm = searchInput.value.toLowerCase().trim();
            bikeCards.forEach(card => {
                const cardText = card.innerText.toLowerCase();
                card.style.display = cardText.includes(searchTerm) ? "block" : "none";
            });
        });
    }

    // Emphasized Search functionality using the actual "Search" button
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", executeSearch);

        // Also trigger search when hitting "Enter" in the input field
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                executeSearch();
            }
        });
    }

    // --- Price Filtering Logic ---
    const priceFilter = document.getElementById("priceFilter");
    const spotlightContainer = document.getElementById("spotlightContainer"); // Explicitly hook into the parent container for DOM re-ordering

    if (priceFilter && bikeCards.length > 0) {
        priceFilter.addEventListener("change", (e) => {
            const range = e.target.value;

            let minPrice = 0;
            let maxPrice = Infinity;

            if (range !== "all") {
                const parts = range.split("-");
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    minPrice = parseInt(parts[0]);
                    maxPrice = parseInt(parts[1]);
                } else if (range === 'lowhi') {
                    // Sort logic
                    let sortedCards = Array.from(bikeCards).filter(c => c.parentElement === spotlightContainer).sort((a, b) => {
                        let priceA = parseInt(a.getAttribute("data-price")) || 0;
                        let priceB = parseInt(b.getAttribute("data-price")) || 0;
                        return priceA - priceB;
                    });
                    sortedCards.forEach(card => spotlightContainer.appendChild(card));
                    showToast("Sorted by Price: Low to High", "success");
                    return;
                } else if (range === 'hilow') {
                    // Sort logic
                    let sortedCards = Array.from(bikeCards).filter(c => c.parentElement === spotlightContainer).sort((a, b) => {
                        let priceA = parseInt(a.getAttribute("data-price")) || 0;
                        let priceB = parseInt(b.getAttribute("data-price")) || 0;
                        return priceB - priceA;
                    });
                    sortedCards.forEach(card => spotlightContainer.appendChild(card));
                    showToast("Sorted by Price: High to Low", "success");
                    return;
                }
            }

            let visibleCount = 0;
            bikeCards.forEach(card => {
                const priceAttr = card.getAttribute("data-price");
                if (priceAttr) {
                    const price = parseInt(priceAttr);
                    if (price >= minPrice && price <= maxPrice) {
                        card.style.display = "block";
                        visibleCount++;
                    } else {
                        card.style.display = "none";
                    }
                }
            });

            const dropdownText = priceFilter.options[priceFilter.selectedIndex].text;
            if (range !== "all") {
                if (visibleCount > 0) {
                    showToast(`Found ${visibleCount} bike(s) for ${dropdownText}.`, "success");
                } else {
                    showToast(`No bikes found for ${dropdownText}.`, "error");
                }
            } else {
                showToast("Showing all bikes.", "success");
            }
        });
    }

    // Category Filter logic (using data-category="type" in HTML)
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const category = e.target.getAttribute("data-category");
                bikeCards.forEach(card => {
                    const cardCategory = card.getAttribute("data-category");
                    if (category === "all" || cardCategory === category) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // --- 2. Sorting Bikes by Price and Engine Capacity (CC) ---
    // Requires <select id="sortBikes"> and cards to have data-price="x" and data-cc="x"
    const sortDropdown = document.getElementById("sortBikes");
    const bikesContainer = document.querySelector(".page3, .bikes-container"); // Container of cards

    if (sortDropdown && bikesContainer && bikeCards.length > 0) {
        sortDropdown.addEventListener("change", (e) => {
            const sortType = e.target.value;
            let cardsArray = Array.from(bikeCards);

            // Reorder array based on mathematical comparison of data attributes
            cardsArray.sort((a, b) => {
                const priceA = parseInt(a.getAttribute("data-price") || 0);
                const priceB = parseInt(b.getAttribute("data-price") || 0);
                const ccA = parseInt(a.getAttribute("data-cc") || 0);
                const ccB = parseInt(b.getAttribute("data-cc") || 0);

                if (sortType === "price-low") return priceA - priceB;
                if (sortType === "price-high") return priceB - priceA;
                if (sortType === "cc-high") return ccB - ccA;
                return 0; // Default or no sort
            });

            // Re-append the cards back into the container in the newly sorted order
            cardsArray.forEach(card => bikesContainer.appendChild(card));
        });
    }

    // --- 3. Click Bike Card to Redirect ---
    // Make entire cards clickable to go to specific bike details
    if (bikeCards.length > 0) {
        bikeCards.forEach(card => {
            card.style.cursor = "pointer";
            card.addEventListener("click", (e) => {
                // Prevent routing if user just clicked a "wishlist" heart icon instead
                if (e.target.classList.contains("wishlist-btn") || e.target.closest(".wishlist-btn")) return;

                // Seek an inner anchor tag's HREF, OR read a 'data-url' attribute directly on the card
                const innerLink = card.querySelector("a") ? card.querySelector("a").href : null;
                const linkAttr = card.getAttribute("data-url");
                const url = innerLink || linkAttr;

                if (url) {
                    window.location.href = url;
                }
            });
        });
    }

    // --- 10. Smooth Animations for Buttons and Cards ---
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        button.style.transition = "transform 0.1s ease, filter 0.2s ease";
        button.addEventListener("mousedown", () => button.style.transform = "scale(0.92)");
        button.addEventListener("mouseup", () => button.style.transform = "scale(1)");
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
            button.style.filter = "brightness(1)";
        });
        button.addEventListener("mouseenter", () => button.style.filter = "brightness(1.1)");
    });

    // --- 4. Store Registered Users in localStorage ---
    const registerForm = document.querySelector(".register-page form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fullName = registerForm.querySelector("input[placeholder='Full Name']").value.trim();
            const email = registerForm.querySelector("input[placeholder='Email Address']").value.trim();
            const username = registerForm.querySelector("input[placeholder='Username']").value.trim();
            const password = registerForm.querySelector("input[placeholder='Password']").value;
            const confirmPassword = registerForm.querySelector("input[placeholder='Confirm Password']").value;

            if (password !== confirmPassword) {
                showToast("Passwords do not match!", "error");
                return;
            }
            if (password.length < 8) {
                showToast("Password must be at least 8 characters.", "error");
                return;
            }

            // Grab existing users from memory, or start an empty array
            const users = JSON.parse(localStorage.getItem("motohub_users")) || [];

            // Check if user already exists
            if (users.find(u => u.username === username)) {
                showToast("Username already exists! Choose another.", "error");
                return;
            }

            // Push new user and save
            users.push({ fullName, email, username, password });
            localStorage.setItem("motohub_users", JSON.stringify(users));

            showToast("Registration successful! Redirecting to login...", "success");
            setTimeout(() => {
                window.location.href = "./login.html"; // Route user to login after success
            }, 2000);
        });
    }

    // --- 5. Validate login & 6. Implement "Remember Me" ---
    const loginForm = document.querySelector(".login-page form");
    if (loginForm) {
        const usernameInput = loginForm.querySelector("input[placeholder='Username']");
        const passwordInput = loginForm.querySelector("input[placeholder='Password']");
        const rememberCheck = loginForm.querySelector("input[type='checkbox']");

        // Check if a username was "remembered" previously and inject it
        const savedUser = localStorage.getItem("motohub_remember");
        if (savedUser && usernameInput) {
            usernameInput.value = savedUser;
            if (rememberCheck) rememberCheck.checked = true;
        }

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Retrieve registered users
            const users = JSON.parse(localStorage.getItem("motohub_users")) || [];
            // Attempt to find a matching username and password combo
            const userExists = users.find(u => u.username === username && u.password === password);

            if (userExists) {
                // Determine if we should remember the username for next time
                if (rememberCheck && rememberCheck.checked) {
                    localStorage.setItem("motohub_remember", username);
                } else {
                    localStorage.removeItem("motohub_remember");
                }

                showToast(`Welcome back, ${userExists.fullName || username}!`, "success");
                setTimeout(() => window.location.href = "./index.html", 1500);
            } else {
                showToast("Invalid username or password.", "error");
            }
        });
    }

    // --- 7. Contact Form Validation ---
    // Targets any form that has action mentioning "contact" or class "contact-form"
    const contactForm = document.querySelector(".contact-form, form[action*='contact']");
    if (contactForm && !contactForm.closest(".register-page") && !contactForm.closest(".login-page")) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll("input, textarea");
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute("required") && input.value.trim() === "") isValid = false;
            });

            if (!isValid) {
                showToast("Please fill in all required fields.", "error");
            } else {
                showToast("Message sent completely! We will reply soon.", "success");
                contactForm.reset(); // clear fields on success
            }
        });
    }

    // --- 8. Wishlist / Favorite Bikes feature using localStorage ---
    // To trigger this, attach a class `.wishlist-btn` to an element inside a bike card
    // and assign a unique identifier `data-bike-id="bike_1"`
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");
    let wishlist = JSON.parse(localStorage.getItem("motohub_wishlist")) || [];

    if (wishlistButtons.length > 0) {
        wishlistButtons.forEach(btn => {
            const bikeId = btn.getAttribute("data-bike-id");

            // Highlight initial state if it's already favorited
            if (wishlist.includes(bikeId)) {
                btn.style.color = "red";
            }

            btn.addEventListener("click", (e) => {
                e.stopPropagation(); // Stop click from redirecting into the actual details page

                if (wishlist.includes(bikeId)) {
                    wishlist = wishlist.filter(id => id !== bikeId); // Remove from list
                    btn.style.color = "";
                    showToast("Removed from Wishlist", "error"); // Red toast 
                } else {
                    wishlist.push(bikeId); // Add to list
                    btn.style.color = "red";
                    showToast("Added to Wishlist!", "success"); // Green toast
                }
                // Update persistent storage
                localStorage.setItem("motohub_wishlist", JSON.stringify(wishlist));
            });
        });
    }

    // --- 13. Newsletter Subscription Data Storage ---
    const newsletterSection = document.querySelector(".newsletter");
    if (newsletterSection) {
        const emailInput = newsletterSection.querySelector("input[type='email']");
        const subscribeBtn = newsletterSection.querySelector("button");

        if (emailInput && subscribeBtn) {
            // Refresh button to clear any old duplicated event listeners 
            let cleanBtn = subscribeBtn.cloneNode(true);
            subscribeBtn.parentNode.replaceChild(cleanBtn, subscribeBtn);

            cleanBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailValue === "") {
                    showToast("Please enter your email address to subscribe.", "error");
                } else if (!emailRegex.test(emailValue)) {
                    showToast("Please enter a valid email address.", "error");
                } else {
                    const subscribers = JSON.parse(localStorage.getItem("motohub_subscribers")) || [];

                    if (!subscribers.includes(emailValue)) {
                        subscribers.push(emailValue); // Store email list
                        localStorage.setItem("motohub_subscribers", JSON.stringify(subscribers));
                        showToast("Thank you for subscribing!", "success");
                    } else {
                        showToast("You are already subscribed!", "success");
                    }
                    emailInput.value = "";
                }
            });
        }
    }

    // --- View Details Smooth Scroll ---
    const viewBtn = document.getElementById("viewDetailsBtn");
    const detailsSection = document.getElementById("bikeDetails");
    if (viewBtn && detailsSection) {
        detailsSection.style.display = "none";
        viewBtn.addEventListener("click", () => {
            detailsSection.style.display = "block";
            detailsSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // --- Animated Statistics Counter ---
    const statsSection = document.getElementById("statsSection");
    const counters = document.querySelectorAll(".stat-counter");
    let hasCounted = false;

    if (statsSection && counters.length > 0) {
        // Intersection Observer triggers when user scrolls the Stats Section into view
        const statObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true; // only count once
                counters.forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    const increment = target / 100; // Adjust speed by changing divisor

                    const updateCount = () => {
                        const current = +counter.innerText;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + increment);
                            setTimeout(updateCount, 15);
                        } else {
                            counter.innerText = target + (target > 1000 ? "k+" : "+");
                            if (target === 10000) counter.innerText = "10k+";
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 });
        statObserver.observe(statsSection);
    }

    // --- Book a Test Drive Modal ---
    const bookTestDriveBtn = document.getElementById("bookTestDriveBtn");
    const testDriveModal = document.getElementById("testDriveModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const testDriveForm = document.getElementById("testDriveForm");

    if (bookTestDriveBtn && testDriveModal) {
        bookTestDriveBtn.addEventListener("click", () => {
            testDriveModal.style.display = "flex";
            // Disable body scrolling while modal is open
            document.body.style.overflow = "hidden";
            // Pre-fill model if possible
            const select = testDriveForm.querySelector("select");
            if (select) select.value = "KTM RC 390";
        });

        closeModalBtn.addEventListener("click", () => {
            testDriveModal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        // Close when clicking outside the box
        window.addEventListener("click", (e) => {
            if (e.target === testDriveModal) {
                testDriveModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        testDriveForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const date = testDriveForm.querySelector('input[type="date"]').value;
            const model = testDriveForm.querySelector('select').value;

            // Artificial delay to look like server processing
            const submitBtn = testDriveForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Booking...";
            submitBtn.style.backgroundColor = "#ff7b00";

            setTimeout(() => {
                showToast(`Awesome! Test drive for ${model} on ${date} is booked.`, "success");
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = "";
                testDriveForm.reset();
                testDriveModal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1500);
        });
    }

    // --- Upgrade Contact Form with "Sending" effect ---
    const upgradedContactForm = document.querySelector(".contact-form, form[action*='contact']");
    if (upgradedContactForm && !upgradedContactForm.closest(".register-page") && !upgradedContactForm.closest(".login-page") && !upgradedContactForm.closest("#testDriveModal")) {
        // We carefully override the old form submit logic we wrote earlier 
        // by cloning the button to ditch old events!
        const btn = upgradedContactForm.querySelector("button[type='submit']");
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            upgradedContactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const inputs = upgradedContactForm.querySelectorAll("input, textarea");
                let isValid = true;
                inputs.forEach(input => {
                    if (input.hasAttribute("required") && input.value.trim() === "") isValid = false;
                });

                if (!isValid) {
                    showToast("Please fill in all required fields.", "error");
                } else {
                    // Execute cool sending animation!
                    newBtn.innerText = "Sending Message...";
                    newBtn.style.backgroundColor = "gray";
                    newBtn.style.pointerEvents = "none";

                    setTimeout(() => {
                        showToast("Message sent completely! We will reply soon.", "success");
                        upgradedContactForm.reset();
                        newBtn.innerText = "Send Message";
                        newBtn.style.backgroundColor = "#d4af37";
                        newBtn.style.pointerEvents = "auto";
                    }, 2000);
                }
            });
        }
    }

    // --- Book a Service Modal (services.html) ---
    const serviceCards = document.querySelectorAll(".services .card");
    const serviceModal = document.getElementById("serviceModal");
    const closeServiceModalBtn = document.getElementById("closeServiceModalBtn");
    const serviceForm = document.getElementById("serviceForm");
    const selectedServiceName = document.getElementById("selectedServiceName");

    if (serviceCards.length > 0 && serviceModal) {
        serviceCards.forEach(card => {
            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                // Gets the name of the service from the <p> tag inside the card
                const title = card.querySelector("p").innerText;
                if (selectedServiceName) selectedServiceName.innerText = title;

                serviceModal.style.display = "flex";
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            });
        });

        if (closeServiceModalBtn) {
            closeServiceModalBtn.addEventListener("click", () => {
                serviceModal.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === serviceModal) {
                serviceModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        if (serviceForm) {
            serviceForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const btn = serviceForm.querySelector("button[type='submit']");

                // Fancy confirm animation
                const originalText = btn.innerText;
                btn.innerText = "Booking Service...";
                btn.style.backgroundColor = "#ff7b00";

                setTimeout(() => {
                    const chosenService = selectedServiceName.innerText;
                    showToast(`Success! Your appointment for ${chosenService} is booked.`, "success");
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "";
                    serviceForm.reset();
                    serviceModal.style.display = "none";
                    document.body.style.overflow = "auto";
                }, 1500);
            });
        }
    }

}); // End of DOMContentLoaded
