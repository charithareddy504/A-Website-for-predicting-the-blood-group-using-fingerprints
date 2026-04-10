document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const startBtn = document.getElementById('start-btn');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    const resultView = document.getElementById('result-view');
    const pipeline = document.getElementById('pipeline');
    const bloodResult = document.getElementById('blood-result');
    const accuracyResult = document.getElementById('accuracy-result');

    // Handle dummy file upload
    dropZone.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
                dropZone.style.display = 'none';
                startBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    };

    // Analysis Logic Simulation
    startBtn.onclick = async () => {
        startBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Processing...';

        const steps = [
            { id: 'step-1', duration: 1500 },
            { id: 'step-2', duration: 2000 },
            { id: 'step-3', duration: 1800 },
            { id: 'step-4', duration: 2500 }
        ];

        for (const step of steps) {
            const stepEl = document.getElementById(step.id);
            if (stepEl) {
                stepEl.classList.add('active');
                await new Promise(r => setTimeout(r, step.duration));
                stepEl.classList.remove('active');
                stepEl.classList.add('complete');
            }
        }

        // Generate Result (Weighted towards common types O+ and A+ as per research)
        const types = [
            { group: 'O+', conf: 94.2 },
            { group: 'A+', conf: 92.8 },
            { group: 'B+', conf: 89.4 },
            { group: 'AB+', conf: 87.1 },
            { group: 'O-', conf: 85.5 },
            { group: 'A-', conf: 84.2 }
        ];

        // Randomly pick O+ or A+ more frequently for demo accuracy
        const index = Math.random() > 0.4 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * types.length);
        const result = types[index];

        // Show result
        pipeline.style.display = 'none';
        resultView.style.display = 'block';
        bloodResult.textContent = result.group;
        accuracyResult.textContent = `Confidence: ${result.conf}%`;
        
        // Final UI feedback
        startBtn.innerHTML = 'Analysis Complete';
        startBtn.style.background = 'var(--success)';
    };
});
