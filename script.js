// Navigation Toggle
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Current Year and Last Modified Date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 
    'Last Update: ' + document.lastModified;

// Course Data and Filter Function
const courses = [
    { code: "CSE 110", completed: true },
    { code: "WDD 130", completed: true },
    { code: "CSE 111", completed: true },
    { code: "CSE 210", completed: true },
    { code: "WDD 131", completed: true },
    { code: "WDD 231", completed: false }
];

function filterCourses(filter) {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';

    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.code.startsWith(filter));

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        courseElement.textContent = `${course.code}`;
        container.appendChild(courseElement);
    });

    document.querySelectorAll('.filter-buttons button').forEach(btn => 
        btn.classList.remove('active'));
    document.querySelector(`button[onclick="filterCourses('${filter}')"]`).classList.add('active');
}

// Initial Display of All Courses
filterCourses('all');
