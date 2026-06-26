/* ============================================
   Marie Hercberg — Peintre
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const galleryImages = [
        { src: 'peintures/IMG_0321.jpg', title: 'Rêveries',             technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_0683.jpg', title: 'L’Attente',          technique: 'Fusain, crayon' },
        { src: 'peintures/IMG_0684.jpg', title: 'L’Ange…',         technique: 'Fusain, crayon' },
        { src: 'peintures/IMG_0687.jpg', title: 'La Femme Afghane',     technique: 'Huile, pigments' },
        { src: 'peintures/IMG_0688.jpg', title: 'Lumière',             technique: 'Huile, pigments' },
        { src: 'peintures/IMG_0689.jpg', title: 'Cosmos étoiles',      technique: 'Huile, feuille d’or' },
        { src: 'peintures/IMG_0700.jpg', title: 'L’inaccessible étoile', technique: 'Huile' },
        { src: 'peintures/IMG_0702.jpg', title: 'Sans Titre',          technique: 'Huile, pigments' },
        { src: 'peintures/IMG_8161.jpg', title: 'Poussière d’étoile', technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_8162.jpg', title: 'Rêveries',             technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_8163.jpg', title: 'Reflet',              technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_8164.jpg', title: 'Poussières d’étoiles', technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_8168.jpg', title: 'La Vague',            technique: 'Huile' },
        { src: 'peintures/IMG_8245.jpg', title: 'Le Vol',             technique: 'Huile' },
        { src: 'peintures/IMG_8472.jpg', title: 'Pensées de Femme',    technique: 'Huile, pigments' },
        { src: 'peintures/IMG_8473.jpg', title: 'L’oiseau',          technique: 'Huile' },
        { src: 'peintures/IMG_8474.jpg', title: 'Tempête de Sable',    technique: 'Huile, pigments' },
        { src: 'peintures/IMG_9276.jpg', title: 'Larmes, L’arme…',  technique: 'Huile, pigments' },
        { src: 'peintures/IMG_9374.jpg', title: 'Amour d’Ange',       technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_9410.jpg', title: 'Cosmos II',           technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_9511.jpg', title: 'Mouvement Virolant',  technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_9576.jpg', title: 'Danseuse de Flamenco', technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_9662.jpg', title: 'Cosmos',              technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/IMG_9663.jpg', title: 'Reflet',              technique: 'Huile, pigments, feuille d’or' },
        { src: 'peintures/ladieu.jpg',          title: 'L’Adieu',        technique: 'Huile' },
        { src: 'peintures/douces-pensees.jpg',  title: 'Douces Pensées', technique: 'Huile, pigments' }
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

        galleryImages.forEach((oeuvre, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = oeuvre.src;
            img.alt = `Marie Hercberg — ${oeuvre.title}`;
            img.loading = 'lazy';
            img.onload = function () {
                this.classList.add('loaded');
            };

            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.innerHTML =
                `<span class="gallery-caption-title">${oeuvre.title}</span>` +
                `<span class="gallery-caption-technique">${oeuvre.technique}</span>`;

            item.appendChild(img);
            item.appendChild(caption);
            gallery.appendChild(item);

            item.addEventListener('click', () => openLightbox(index));
        });
    }

    // ---- Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTechnique = document.getElementById('lightbox-technique');
    let currentIndex = 0;

    function showLightbox(index) {
        const oeuvre = galleryImages[index];
        lightboxImg.src = oeuvre.src;
        lightboxImg.alt = `Marie Hercberg — ${oeuvre.title}`;
        lightboxTitle.textContent = oeuvre.title;
        lightboxTechnique.textContent = oeuvre.technique;
    }

    function openLightbox(index) {
        currentIndex = index;
        showLightbox(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
        showLightbox(currentIndex);
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
