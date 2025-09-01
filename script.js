// =====================================================
// INTERACTIVE WEB ASSIGNMENT - JAVASCRIPT FILE
// =====================================================
// Author: Student Name
// Purpose: Demonstrate event handling, interactive elements, and form validation
// =====================================================

// =====================================================
// PART 1: THEME TOGGLE (Dark/Light Mode)
// =====================================================
// Purpose: Allow users to switch between light and dark themes
// Events: click event on theme toggle button

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

/**
 * Toggle between light and dark theme
 * Demonstrates: DOM class manipulation, conditional logic
 */
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Add visual feedback animation
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// =====================================================
// PART 2: INTERACTIVE COUNTER GAME
// =====================================================
// Purpose: Create an interactive counter with multiple controls
// Events: click events on buttons, keydown events for keyboard shortcuts

const counterDisplay = document.getElementById('counterDisplay');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');

let counter = 0; // Global counter variable

/**
 * Update counter display with visual animation
 * Demonstrates: DOM content manipulation, conditional styling, CSS transitions
 */
function updateCounter() {
    counterDisplay.textContent = counter;
    
    // Dynamic color based on counter value
    if (counter > 0) {
        counterDisplay.style.color = '#00b894'; // Green for positive
    } else if (counter < 0) {
        counterDisplay.style.color = '#ff7675'; // Red for negative
    } else {
        counterDisplay.style.color = '#fff'; // White for zero
    }
    
    // Scale animation for visual feedback
    counterDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Counter button event listeners
incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

randomBtn.addEventListener('click', () => {
    // Generate random number between -100 and 100
    counter = Math.floor(Math.random() * 201) - 100;
    updateCounter();
});

/**
 * Keyboard event handling for counter controls
 * Demonstrates: keydown events, event.key property, preventing default behavior
 */
document.addEventListener('keydown', (e) => {
    // Only respond to keyboard if not typing in form fields
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        switch(e.key.toLowerCase()) {
            case ' ': // Spacebar
                e.preventDefault(); // Prevent page scroll
                counter++;
                updateCounter();
                break;
            case 'r': // R key
                counter = 0;
                updateCounter();
                break;
        }
    }
});

// =====================================================
// PART 3: COLLAPSIBLE FAQ SECTION
// =====================================================
// Purpose: Create expandable/collapsible content sections
// Events: click events on FAQ questions

const faqQuestions = document.querySelectorAll('.faq-question');

/**
 * Handle FAQ question clicks to show/hide answers
 * Demonstrates: event delegation, class manipulation, data attributes
 */
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqNumber = question.getAttribute('data-faq');
        const answer = document.getElementById(`faq-${faqNumber}`);
        const icon = question.querySelector('.faq-icon');
        
        // Check if this FAQ is currently active
        const isActive = answer.classList.contains('active');
        
        // Close all other FAQs first (accordion behavior)
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
        });
        document.querySelectorAll('.faq-icon').forEach(ic => {
            ic.classList.remove('rotated');
        });
        
        // Toggle current FAQ if it wasn't active
        if (!isActive) {
            answer.classList.add('active');
            icon.classList.add('rotated');
        }
    });
});

// =====================================================
// PART 4: TABBED INTERFACE
// =====================================================
// Purpose: Create a tabbed content interface
// Events: click events on tab buttons

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

/**
 * Handle tab switching functionality
 * Demonstrates: data attributes, class manipulation, content switching
 */
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding pane
        button.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    });
});

// =====================================================
// PART 5: DROPDOWN MENU
// =====================================================
// Purpose: Create a custom dropdown menu with selection functionality
// Events: click events on dropdown elements, document click for closing

const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');
const dropdownResult = document.getElementById('dropdownResult');
const dropdownItems = document.querySelectorAll('.dropdown-item');

/**
 * Toggle dropdown menu visibility
 * Demonstrates: event.stopPropagation(), class manipulation
 */
dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click handler from firing
    dropdownContent.classList.toggle('show');
});

/**
 * Handle dropdown item selection
 * Demonstrates: data attributes, text content manipulation
 */
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        const text = item.textContent;
        
        // Update button text and hide dropdown
        dropdownBtn.querySelector('span').textContent = text;
        dropdownContent.classList.remove('show');
        
        // Show selection result
        dropdownResult.textContent = `You selected: ${text}! Great choice for web development! 🎉`;
    });
});

/**
 * Close dropdown when clicking outside
 * Demonstrates: document-level event handling, event bubbling
 */
document.addEventListener('click', () => {
    dropdownContent.classList.remove('show');
});

// =====================================================
// PART 6: ADVANCED FORM VALIDATION
// =====================================================
// Purpose: Implement comprehensive form validation with custom rules
// Events: input events for real-time validation, submit event for form submission

const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

/**
 * Validation rules object
 * Contains regular expressions and error messages for each field
 */
const validationRules = {
    fullName: {
        pattern: /^[a-zA-Z\s]{2,50}$/,
        message: 'Name must be 2-50 characters and contain only letters and spaces'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
};

/**
 * Display error message for a specific field
 * @param {string} fieldId - The ID of the form field
 * @param {string} message - The error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const input = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add visual error styling to input
    input.style.borderColor = '#ff7675';
    input.style.boxShadow = '0 0 10px rgba(255, 118, 117, 0.3)';
}

/**
 * Clear error message for a specific field
 * @param {string} fieldId - The ID of the form field
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const input = document.getElementById(fieldId);
    
    errorElement.classList.remove('show');
    
    // Reset input styling
    input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    input.style.boxShadow = 'none';
}

/**
 * Validate individual form field using predefined rules
 * @param {string} fieldId - The ID of the field to validate
 * @param {string} value - The value to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateField(fieldId, value) {
    const rule = validationRules[fieldId];
    
    if (!rule) return true; // No validation rule defined
    
    // Check if field is empty (required fields)
    if (!value.trim()) {
        const fieldName = fieldId.replace(/([A-Z])/g, ' $1').toLowerCase();
        showError(fieldId, `${fieldName} is required`);
        return false;
    }
    
    // Check against pattern
    if (!rule.pattern.test(value)) {
        showError(fieldId, rule.message);
        return false;
    }
    
    clearError(fieldId);
    return true;
}

/**
 * Validate password confirmation field
 * @returns {boolean} - True if passwords match, false otherwise
 */
function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!confirmPassword.trim()) {
        showError('confirmPassword', 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    }
    
    clearError('confirmPassword');
    return true;
}

/**
 * Validate age field (optional but with constraints)
 * @returns {boolean} - True if valid or empty, false if invalid
 */
function validateAge() {
    const age = document.getElementById('age').value;
    
    if (age && (age < 13 || age > 120)) {
        showError('age', 'Age must be between 13 and 120');
        return false;
    }
    
    clearError('age');
    return true;
}

/**
 * Validate bio field (optional with max length)
 * @returns {boolean} - True if valid, false if too long
 */
function validateBio() {
    const bio = document.getElementById('bio').value;
    
    if (bio.length > 500) {
        showError('bio', 'Bio must be less than 500 characters');
        return false;
    }
    
    clearError('bio');
    return true;
}

// =====================================================
// REAL-TIME VALIDATION EVENT LISTENERS
// =====================================================
// Purpose: Validate fields as user types for immediate feedback

// Real-time validation for text inputs
document.getElementById('fullName').addEventListener('input', (e) => {
    validateField('fullName', e.target.value);
});

document.getElementById('email').addEventListener('input', (e) => {
    validateField('email', e.target.value);
});

document.getElementById('password').addEventListener('input', (e) => {
    validateField('password', e.target.value);
    
    // Also revalidate confirm password if it has a value
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword) {
        validateConfirmPassword();
    }
});

document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
document.getElementById('age').addEventListener('input', validateAge);
document.getElementById('bio').addEventListener('input', validateBio);

/**
 * Form submission handler
 * Demonstrates: preventDefault(), comprehensive validation, success feedback
 */
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Get all form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate all fields
    const fullNameValid = validateField('fullName', fullName);
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);
    const confirmPasswordValid = validateConfirmPassword();
    const ageValid = validateAge();
    const bioValid = validateBio();
    
    // Check if all validations passed
    if (fullNameValid && emailValid && passwordValid && confirmPasswordValid && ageValid && bioValid) {
        // Hide any existing success message
        successMessage.classList.remove('show');
        
        // Show success message with delay for better UX
        setTimeout(() => {
            successMessage.classList.add('show');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
                
                // Clear any remaining error states
                document.querySelectorAll('.error-message').forEach(error => {
                    error.classList.remove('show');
                });
                document.querySelectorAll('input, textarea, select').forEach(input => {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    input.style.boxShadow = 'none';
                });
            }, 3000);
        }, 100);
    } else {
        // Scroll to first error for better user experience
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// =====================================================
// ADDITIONAL INTERACTIVE FEATURES
// =====================================================

/**
 * Add hover effects to all sections
 * Demonstrates: mouseenter and mouseleave events, CSS property manipulation
 */
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Add click animation to all buttons
 * Demonstrates: CSS property manipulation, setTimeout for animations
 */
const allButtons = document.querySelectorAll('.btn, .tab-btn, .dropdown-btn');
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================================
// Purpose: Make interactive elements keyboard accessible

/**
 * Add keyboard navigation for dropdown
 * Demonstrates: keydown events, accessibility considerations
 */
dropdownBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdownContent.classList.toggle('show');
    }
});

/**
 * Add keyboard navigation for FAQ items
 * Demonstrates: tabindex manipulation, keyboard accessibility
 */
faqQuestions.forEach(question => {
    question.setAttribute('tabindex', '0'); // Make focusable
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click(); // Trigger click event
        }
    });
});

// =====================================================
// EASTER EGG: KONAMI CODE
// =====================================================
// Purpose: Hidden feature for fun user discovery
// Events: keydown events with sequence detection

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

/**
 * Detect Konami Code input sequence
 * Demonstrates: array manipulation, sequence detection, fun interactions
 */
document.addEventListener('keydown', (e) => {
    // Only track when not typing in form fields
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        konamiCode.push(e.code);
        
        // Keep only the last 10 keys
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        // Check if sequence matches Konami code
        if (konamiCode.length === 10 && konamiCode.every((key, index) => key === konamiSequence[index])) {
            // Easter egg triggered!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎉 Konami Code activated! You found the easter egg!');
            }, 2000);
            konamiCode = []; // Reset sequence
        }
    }
});

// =====================================================
// INITIALIZATION AND SETUP
// =====================================================
// Purpose: Set up initial state and preferences

/**
 * Initialize page based on user's system preferences
 * Demonstrates: media queries in JavaScript, conditional initialization
 */
function initializePage() {
    // Set initial theme based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
    
    // Add dynamic CSS for rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Entrance animation for sections
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Log helpful information to console
    console.log('🎉 Interactive Web Assignment loaded successfully!');
    console.log('💡 Try these features:');
    console.log('   - Click the moon/sun icon to toggle theme');
    console.log('   - Use spacebar to increment counter, R to reset');
    console.log('   - Try the Konami code: ↑↑↓↓←→←→BA');
    console.log('   - Fill out the form to see validation in action');
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initializePage);

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Utility function to add visual feedback to any element
 * @param {HTMLElement} element - Element to animate
 * @param {string} animation - CSS animation to apply
 */
function addFeedback(element, animation = 'pulse') {
    element.style.animation = `${animation} 0.3s ease`;
    setTimeout(() => {
        element.style.animation = '';
    }, 300);
}

/**
 * Utility function to format form data for submission
 * @param {FormData} formData - Form data to format
 * @returns {Object} - Formatted object with form values
 */
function formatFormData(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// =====================================================
// END OF JAVASCRIPT FILE
// =====================================================
// This file demonstrates:
// ✅ Event handling (click, input, keydown, submit, mouseenter, mouseleave)
// ✅ DOM manipulation (class manipulation, content updates, style changes)
// ✅ Interactive elements (counter, FAQ, tabs, dropdown, theme toggle)
// ✅ Form validation (regex patterns, real-time validation, error handling)
// ✅ Accessibility features (keyboard navigation, focus management)
// ✅ Advanced JavaScript concepts (event delegation, data attributes, animations)
// =====================================================