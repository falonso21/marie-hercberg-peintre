/* ============================================
   Marie Hercberg — Peintre
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const galleryImages = [
        'peintures/IMG_0321.jpg',
        'peintures/IMG_0683.jpg',
        'peintures/IMG_0684.jpg',
        'peintures/IMG_0687.jpg',
        'peintures/IMG_0688.jpg',
        'peintures/IMG_0689.jpg',
        'peintures/IMG_0700.jpg',
        'peintures/IMG_0701.jpg',
        'peintures/IMG_0702.jpg',
        'peintures/IMG_8161.jpg',
        'peintures/IMG_8162.jpg',
        'peintures/IMG_8163.jpg',
        'peintures/IMG_8164.jpg',
        'peintures/IMG_8168.jpg',
        'peintures/IMG_8174.jpg',
        'peintures/IMG_8207.jpg',
        'peintures/IMG_8244.jpg',
        'peintures/IMG_8245.jpg',
        'peintures/IMG_8328.jpg',
        'peintures/IMG_8472.jpg',
        'peintures/IMG_8473.jpg',
        'peintures/IMG_8474.jpg',
        'peintures/IMG_8478.jpg',
        'peintures/IMG_9276.jpg',
        'peintures/IMG_9323.jpg',
        'peintures/IMG_9374.jpg',
        'peintures/IMG_9410.jpg',
        'peintures/IMG_9511.jpg',
        'peintures/IMG_9576.jpg',
        'peintures/IMG_9577.jpg',
        'peintures/IMG_9662.jpg',
        'peintures/IMG_9663.jpg',
        'peintures/IMG_9719.jpg',
        'peintures/IMG_9933.jpg',
        'peintures/IMG_9934.jpg'
    ];

    // ---- Intersection Observer ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ---- Gallery ----
    const gallery = document.getElementById('gallery-grid');
    const emptyMsg = document.getElementById('gallery-empty');

    if (galleryImages.length === 0) {
        emptyMsg.style.display = 'block';
        gallery.style.display = 'none';
    } else {
        emptyMsg.style.display = 'none';

        galleryImages.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Œuvre ${index + 1}`;
            img.loading = 'lazy';
            img.onload = function () {
                this.classList.add('loaded');
            };

            item.appendChild(img);
            gallery.appendChild(item);

            item.addEventListener('click', () => openLightbox(index));
        });
    }

    // ---- Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // ---- Nav scroll ----
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ---- Mobile menu ----
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

});
