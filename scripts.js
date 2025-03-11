// Navigation Toggle
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('show');
    }
});

// Current Year
const yearElement = document.getElementById('currentYear');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Last Modified Date (Formatted)
const modifiedElement = document.getElementById('lastModified');
if (modifiedElement) {
    const lastModified = new Date(document.lastModified);
    modifiedElement.textContent = `Last Updated: ${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`;
}

// Course Data (Assuming each course is 3 credits)
const courses = [
    { code: "CSE 110", completed: true, credits: 3 },
    { code: "WDD 130", completed: true, credits: 3 },
    { code: "CSE 111", completed: true, credits: 3 },
    { code: "CSE 210", completed: true, credits: 3 },
    { code: "WDD 131", completed: true, credits: 3 },
    { code: "WDD 231", completed: false, credits: 3 }
];

// Course Filtering Function
function filterCourses(filter) {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';

    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.code.startsWith(filter));

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        courseElement.textContent = `${course.code} (${course.credits} credits)`;
        container.appendChild(courseElement);
    });

    // Update active button
    document.querySelectorAll('.filter-buttons button').forEach(btn => 
        btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    // Update Total Credits
    updateTotalCredits(filteredCourses);
}

// Calculate and Display Total Credits
function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    let creditDisplay = document.getElementById('totalCredits');
    
    if (!creditDisplay) {
        creditDisplay = document.createElement('p');
        creditDisplay.id = 'totalCredits';
        document.querySelector('.certificate').appendChild(creditDisplay);
    }
    
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Attach event listeners to filter buttons
document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.addEventListener('click', function () {
        filterCourses(this.dataset.filter);
    });
});

// Initial Display of All Courses
filterCourses('all');
