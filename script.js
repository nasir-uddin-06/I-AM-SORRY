document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const successOverlay = document.getElementById('success-overlay');
    const heartsContainer = document.getElementById('hearts-container');

    // Create floating hearts background
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 12 + 's'; // 12-15s
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 15000); // Clean up after animation
    }

    // Spawn hearts periodically
    setInterval(createHeart, 500);

    // Initial heart spawn
    for(let i = 0; i < 15; i++) {
        setTimeout(createHeart, Math.random() * 3000);
    }

    // Handle "No" button interaction (Mouse over / Touch)
    function moveButton() {
        // Get container dimensions
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        
        // Get button dimensions
        const btnRect = btnNo.getBoundingClientRect();
        
        // Calculate new random position within visible area/container
        // We'll use fixed position or transform to move it relative to initial safely
        // But simplest for "evasion" is often absolute position within a relative container
        // OR just swapping text if movement is too tricky on mobile
        
        // Let's use simple translation
        const x = (Math.random() - 0.5) * 150; // Move +/- 75px
        const y = (Math.random() - 0.5) * 150;
        
        btnNo.style.transform = `translate(${x}px, ${y}px)`;
        
        // Optional: Swap text sometimes
        const avoidanceTexts = ["Are you sure?", "Please?", "Don't click me!", "Missed me!", "Think again!"];
        btnNo.innerText = avoidanceTexts[Math.floor(Math.random() * avoidanceTexts.length)];
    }

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on touch devices
        moveButton();
    });
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Handle "Yes" button click
    btnYes.addEventListener('click', () => {
        // Launch confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        // Show overlay after short delay
        setTimeout(() => {
            successOverlay.classList.remove('hidden');
            // More confetti!
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff4d6d', '#ff8fa3']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff4d6d', '#ff8fa3']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }, 500);
    });
});
