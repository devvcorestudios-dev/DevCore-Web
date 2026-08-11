// ==========================================
// 🎨 GSAP SCROLL ANIMATIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll(".tier-card");

    cards.forEach((card, index) => {
        if (index < cards.length - 1) {
            gsap.to(card, {
                scale: 0.90,
                rotationX: 8,
                opacity: 0.4,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: cards[index + 1],
                    start: "top 75%",
                    end: "top 30%",
                    scrub: true,
                }
            });
        }
    });
});

// ==========================================
// 🛒 CART MEMORY & CHECKOUT ROUTING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tierCards = document.querySelectorAll('.tier-card');

    tierCards.forEach(card => {
        const selectBtn = card.querySelector('.btn-select');
        
        if (selectBtn) {
            selectBtn.addEventListener('click', (e) => {
                e.preventDefault(); 

                const nameElement = card.querySelector('.card-tier-name');
                const priceElement = card.querySelector('.card-price');
                
                // FIXED: Now splits perfectly on the "-" (e.g., "Tier - Frontend" -> "Frontend")
                let tierName = 'DevCore Tier';
                if (nameElement) {
                    const parts = nameElement.innerText.split('-');
                    tierName = parts.length > 1 ? parts[1].trim() : nameElement.innerText.trim();
                }
                
                let priceText = priceElement ? priceElement.innerText : '0';
                let price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                
                // Handle the Custom/Founder Tier
                if (isNaN(price)) {
                    price = 5000.00; 
                }
                
                const selectedTier = {
                    name: tierName,
                    price: price,
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=180&q=80" 
                };

                localStorage.setItem('devcoreSelectedTier', JSON.stringify(selectedTier));
                window.location.href = 'checkout.html';
            });
        }
    });
});