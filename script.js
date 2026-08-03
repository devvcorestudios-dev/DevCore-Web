// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. HERO SECTION ANIMATION (Runs immediately on load)
const heroTimeline = gsap.timeline();

heroTimeline.from(".hero-headline", {
    y: 50, // Starts 50px lower
    opacity: 0, // Starts invisible
    duration: 1, // Takes 1 second
    ease: "power3.out", // Smooth deceleration
    delay: 0.2 // Slight pause before starting
})
.from(".hero-subtext", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6") // The "-=0.6" makes it start slightly before the headline finishes
.from(".hero-buttons .btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2, // Animates the buttons one after the other
    ease: "power2.out"
}, "-=0.4");

// 2. SERVICE CARDS ANIMATION (Runs when user scrolls to them)
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".expertise-section",
        start: "top 80%", // Animation starts when section hits 80% of viewport height
        toggleActions: "play none none reverse" 
    },
    y: 100, // Cards slide up from 100px down
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // The 1-2-3 domino effect
    ease: "power3.out"
});