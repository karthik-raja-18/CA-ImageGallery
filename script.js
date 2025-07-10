document.addEventListener('DOMContentLoaded', function() {

    const galleryData = [
        { src: 'https://picsum.photos/seed/nature1/600/400.jpg', category: 'nature', caption: 'Beautiful Mountain Landscape' },
        { src: 'https://picsum.photos/seed/arch1/600/400.jpg', category: 'architecture', caption: 'Modern Building Design' },
        { src: 'https://picsum.photos/seed/animal1/600/400.jpg', category: 'animals', caption: 'Wild Lion in Safari' },
        { src: 'https://picsum.photos/seed/person1/600/400.jpg', category: 'people', caption: 'Portrait Photography' },
        { src: 'https://picsum.photos/seed/nature2/600/400.jpg', category: 'nature', caption: 'Ocean Sunset View' },
        { src: 'https://picsum.photos/seed/arch2/600/400.jpg', category: 'architecture', caption: 'Historic Cathedral' },
        { src: 'https://picsum.photos/seed/animal2/600/400.jpg', category: 'animals', caption: 'Colorful Parrot' },
        { src: 'https://picsum.photos/seed/person2/600/400.jpg', category: 'people', caption: 'Street Photography' },
        { src: 'https://picsum.photos/seed/nature3/600/400.jpg', category: 'nature', caption: 'Forest Pathway' },
        { src: 'https://picsum.photos/seed/arch3/600/400.jpg', category: 'architecture', caption: 'Urban Skyline' },
        { src: 'https://picsum.photos/seed/animal3/600/400.jpg', category: 'animals', caption: 'Cute Puppy' },
        { src: 'https://picsum.photos/seed/person3/600/400.jpg', category: 'people', caption: 'Family Portrait' }
    ];

    const gallery = document.querySelector('.gallery');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const closeBtn = document.querySelector('.close-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let currentFilter = 'all';
    let currentEffect = 'none';

    function generateGallery() {
        gallery.innerHTML = '';
        
        galleryData.forEach((item, index) => {
            if (currentFilter === 'all' || item.category === currentFilter) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.index = index;
                
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.caption;
                img.className = currentEffect;
                
                const category = document.createElement('div');
                category.className = 'category';
                category.textContent = item.category;
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(category);
                gallery.appendChild(galleryItem);
                
                galleryItem.addEventListener('click', () => openLightbox(index));
            }
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightbox() {
        const item = galleryData[currentIndex];
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption;
        lightboxCaption.textContent = item.caption;
        lightboxImg.className = currentEffect;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    }

    function applyFilter(filter) {
        currentFilter = filter;
        currentEffect = filter === 'none' ? 'none' : filter;
        
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        generateGallery();
    }

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
 
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            applyFilter(btn.dataset.filter);
        });
    });

    generateGallery();
});