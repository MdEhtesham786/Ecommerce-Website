// const selectFilter = document.querySelector('.filter-dropdown select');
// const testimonialBoxes = document.querySelectorAll('.testimonial-box');
// selectFilter.addEventListener('change', (event) => {
//     const filterValue = event.target.value;
//     console.log(filterValue);
//     testimonialBoxes.forEach((box) => {
//         const rating = box.querySelectorAll('.reviews i.fas.fa-star').length;
//         if (filterValue === 'All' || rating === parseInt(filterValue)) {
//             console.log('visible');
//             box.style.display = 'block';
//         } else {
//             box.style.display = 'none';
//         }
//     });
// });

// // Get the filter dropdown element
// const filterDropdown = document.querySelector('.filter-dropdown select');

// // Get the search input element
// const searchInput = document.querySelector('.search input');

// // Add event listeners to the filter dropdown and search input elements
// filterDropdown.addEventListener('change', filterTestimonials);
// searchInput.addEventListener('input', filterTestimonials);

// // Function to filter the testimonials
// function filterTestimonials() {
//     // Get the filter dropdown value and search input value
//     const filterValue = filterDropdown.value;
//     const searchValue = searchInput.value.trim().toLowerCase();

//     // Get all the testimonial-box elements
//     const testimonials = document.querySelectorAll('.testimonial-box');

//     // Loop through each testimonial-box element and hide/show based on filter and search values
//     testimonials.forEach(function (testimonial) {
//         // Get the reviewer's name and product name from the testimonial-box element
//         const reviewerName = testimonial.querySelector('.name-user strong').textContent.trim().toLowerCase();
//         const productName = testimonial.querySelector('.name-user span').textContent.replace('@', '').trim().toLowerCase();

//         // Check if the reviewer's name contains the search value and the product name matches the filter value
//         if ((reviewerName.includes(searchValue) || productName.includes(searchValue)) && (filterValue === 'All' || parseInt(filterValue) === parseInt(testimonial.querySelector('.reviews .fa-star').length))) {
//             testimonial.style.display = 'block'; // Show the testimonial-box element
//         } else {
//             testimonial.style.display = 'none'; // Hide the testimonial-box element
//         }
//     });
// }
