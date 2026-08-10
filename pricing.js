//<!-- GSAP & ScrollTrigger Stacking Animation Script-->

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

        document.addEventListener('DOMContentLoaded', () => {
    // Select all the tier cards on the pricing page
    const tierCards = document.querySelectorAll('.tier-card');

    tierCards.forEach(card => {
        const selectBtn = card.querySelector('.btn-select');
        
        if (selectBtn) {
            selectBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the button from just linking to #contact

                // Extract the specific details from the clicked card
                const nameElement = card.querySelector('.card-tier-name');
                const priceElement = card.querySelector('.card-price');
                
                // Clean up the text (e.g., "Tier II · Advanced Infrastructure" -> "Advanced Infrastructure")
                const tierName = nameElement ? nameElement.innerText.split('·')[1].trim() : 'DevCore Tier';
                
                // Extract just the numbers from "$149 / mo"
                let priceText = priceElement ? priceElement.innerText : '0';
                let price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                
                // Handle the Custom/Founder Tier (where price is text instead of a number)
                if (isNaN(price)) {
                    price = 5000.00; // Set a base default for custom tiers
                }
                
                // Build the cart object
                const selectedTier = {
                    name: tierName,
                    price: price,
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=180&q=80" // High-tech abstract placeholder image
                };

                // Save to browser vault and redirect to the checkout pipeline
                localStorage.setItem('devcoreSelectedTier', JSON.stringify(selectedTier));
                window.location.href = 'checkout.html';
            });
        }
    });
});