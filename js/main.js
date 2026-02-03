/**
 * Portfolio Website - Main JavaScript
 * Design Philosophy: Minimalist Modern
 * - Smooth animations and interactions
 * - Performance optimized
 * - Accessibility focused
 */

// ============================================
// DOCUMENT READY
// ============================================

$(document).ready(function() {
    // تهيئة AOS الأنميشن
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // تحديث السنة في الفوتر
    $('#year').text(new Date().getFullYear());

    // تأثير السكرول في القائمة
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('navbar-scrolled');
        } else {
            $('#mainNav').removeClass('navbar-scrolled');
        }
    });

    // السكرول الناعم للروابط
    $('.nav-link').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });
    initializeAOS();
    initializeNavigation();
    initializeScrollToTop();
    initializeContactForm();
    initializeSmoothScroll();
    setCurrentYear();
    initializeCounters(); // <--- أضيفي هذا السطر هنا
   
});

// ============================================
// AOS INITIALIZATION
// ============================================

function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile'
    });
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const navbar = $('#navbar');
    const navLinks = $('.nav-link');

    // Add shadow on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // Active link on scroll
    $(window).on('scroll', function() {
        let scrollPosition = $(window).scrollTop();

        navLinks.each(function() {
            let sectionId = $(this).attr('href');
            let section = $(sectionId);

            if (section.length) {
                let sectionTop = section.offset().top - 100;
                let sectionBottom = sectionTop + section.outerHeight();

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

    // Close mobile menu on link click
    navLinks.on('click', function() {
        const navbarCollapse = $('.navbar-collapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.collapse('hide');
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initializeScrollToTop() {
    const scrollBtn = $('#scrollToTopBtn');

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            scrollBtn.addClass('show');
        } else {
            scrollBtn.removeClass('show');
        }
    });

    scrollBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    $('.smooth-scroll').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        const target = $(href);

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initializeContactForm() {
    const contactForm = $('#contactForm');

    contactForm.on('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        // Validate form
        if (!validateForm(formData)) {
            showAlert('يرجى ملء جميع الحقول بشكل صحيح', 'danger');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.find('button[type="submit"]');
        const originalText = submitBtn.html();

        submitBtn.prop('disabled', true).html(
            '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...'
        );

        // Simulate API call
        setTimeout(function() {
            submitBtn.prop('disabled', false).html(originalText);
            contactForm[0].reset();
            showAlert('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');
        }, 1500);
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(data) {
    if (!data.name || data.name.trim() === '') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        return false;
    }

    if (!data.message || data.message.trim() === '') {
        return false;
    }

    return true;
}

// ============================================
// ALERTS
// ============================================

function showAlert(message, type = 'info') {
    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    $('body').append(alertHTML);

    // Auto dismiss after 5 seconds
    setTimeout(function() {
        $(`#${alertId}`).fadeOut(function() {
            $(this).remove();
        });
    }, 5000);
}

// ============================================
// UTILITIES
// ============================================

function setCurrentYear() {
    $('#year').text(new Date().getFullYear());
}

// ============================================
// CV DOWNLOAD
// ============================================

$(document).on('click', '#cvBtn', function(e) {
    e.preventDefault();
    // Create a simple PDF download simulation
    showAlert('سيتم تحميل السيرة الذاتية قريباً', 'info');
});

// ============================================
// PARALLAX EFFECT
// ============================================

$(window).on('scroll', function() {
    const scrollTop = $(this).scrollTop();
    $('.hero-bg').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

$(document).on('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = $('.navbar-collapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.collapse('hide');
        }
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
});

// ============================================
// CUSTOM SCROLL BEHAVIOR
// ============================================

// Add custom scroll behavior for better UX
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateScrollIndicators();
            ticking = false;
        });
        ticking = true;
    }
});

function updateScrollIndicators() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update navbar based on scroll
    if (scrollTop > 50) {
        $('#navbar').addClass('scrolled');
    } else {
        $('#navbar').removeClass('scrolled');
    }
}

// ============================================
// ANIMATION ON ELEMENT VISIBILITY
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// MOBILE MENU OPTIMIZATION
// ============================================

// Prevent body scroll when mobile menu is open
$('.navbar-toggler').on('click', function() {
    $('body').toggleClass('menu-open');
});

// ============================================
// TOUCH OPTIMIZATION
// ============================================

// Add touch-friendly tap feedback
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, false);
    
    $('button, a').on('touchstart', function() {
        $(this).addClass('touch-active');
    }).on('touchend', function() {
        $(this).removeClass('touch-active');
    });
}

// ============================================
// INITIALIZATION COMPLETE
// ============================================

console.log('Portfolio website initialized successfully');
// وظيفة العداد المتحرك
// const counters = document.querySelectorAll('.counter');
// const speed = 200; // سرعة العد

// const startCounters = () => {
//     counters.forEach(counter => {
//         const updateCount = () => {
//             const target = +counter.getAttribute('data-target');
//             const count = +counter.innerText;
//             const inc = target / speed;

//             if (count < target) {
//                 counter.innerText = Math.ceil(count + inc);
//                 setTimeout(updateCount, 20);
//             } else {
//                 counter.innerText = target;
//             }
//         };
//         updateCount();
//     });
// };

// // تفعيل العداد عند السكرول لسكشن About
// let counterStarted = false;
// $(window).scroll(function() {
//     const sectionTop = $('#about').offset().top - 400;
//     if ($(window).scrollTop() > sectionTop && !counterStarted) {
//         startCounters();
//         counterStarted = true;
//     }
// });
/////////////////////////////////////////

// ============================================
// PROJECT GALLERY (MODAL)
// ============================================

function openProjectGallery(title, description, imagesArray) {
    const carouselInner = document.getElementById('carouselItems');
    const titleElem = document.getElementById('projTitle');
    const descElem = document.getElementById('projDesc');

    // مسح الصور القديمة من المودال
    carouselInner.innerHTML = '';

    // إضافة الصور الجديدة
    imagesArray.forEach((imgSrc, index) => {
        const activeClass = index === 0 ? 'active' : '';
        carouselInner.innerHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${imgSrc}" class="d-block w-100" style="height: 450px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/800x450?text=Image+Not+Found'">
            </div>
        `;
    });

    // تعيين النصوص
    titleElem.innerText = title;
    descElem.innerText = description;

    // إظهار المودال
    var myModal = new bootstrap.Modal(document.getElementById('projectModal'));
    myModal.show();
}

// ============================================
// STATS COUNTER
// ============================================
function initializeCounters() {
    const counters = document.querySelectorAll('#about .counter');
    const speed = 150;
    let isRunning = false;

    const startAllCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');

            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAllCounters();
                isRunning = true;
            } else {
                isRunning = false; // يسمح بإعادة التشغيل عند الرجوع
            }
        });
    }, {
        threshold: 0.3
    });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}
