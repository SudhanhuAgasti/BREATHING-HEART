
    const nameInput = document.getElementById('nameInput');
    const nameText  = document.getElementById('nameText');

    const sizeRange = document.getElementById('sizeRange');
    const speedRange = document.getElementById('speedRange');
    const intensityRange = document.getElementById('intensityRange');

    const sizeVal = document.getElementById('sizeVal');
    const speedVal = document.getElementById('speedVal');
    const intensityVal = document.getElementById('intensityVal');

    const root = document.documentElement;

    // Update name live
    nameInput.addEventListener('input', () => {
      nameText.textContent = nameInput.value || '♡';
    });

    // Size control
    sizeRange.addEventListener('input', () => {
      const px = Number(sizeRange.value);
      root.style.setProperty('--heart-size', px + 'px');
      sizeVal.textContent = String(px);
    });

    // Speed control (map 60-220 -> 0.6s - 2.2s)
    speedRange.addEventListener('input', () => {
      const s = (Number(speedRange.value) / 100).toFixed(2);
      root.style.setProperty('--beat-speed', s + 's');
      speedVal.textContent = s;
    });

    // Intensity control (map 102-130 -> 1.02x - 1.30x)
    intensityRange.addEventListener('input', () => {
      const scale = (Number(intensityRange.value) / 100).toFixed(2);
      root.style.setProperty('--beat-scale', scale);
      intensityVal.textContent = scale;
    });

    // Style presets
    const styleSelect = document.getElementById('styleSelect');
    styleSelect.addEventListener('change', () => {
      const v = styleSelect.value;
      let grad;
      switch(v){
        case 'rose': grad = 'linear-gradient(135deg, #ff0844 0%, #ff3f81 100%)'; break;
        case 'candy': grad = 'linear-gradient(135deg, #ff6cab 0%, #7366ff 100%)'; break;
        case 'ocean': grad = 'linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)'; break;
        case 'purple': grad = 'linear-gradient(135deg, #a4508b 0%, #5f0a87 100%)'; break;
        default: grad = 'linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%)';
      }
      root.style.setProperty('--heart-gradient', grad);
    });

    // Buttons
    document.getElementById('centerBtn').addEventListener('click', () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });

    document.getElementById('copyBtn').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(nameText.textContent.trim());
        flash('Copied!');
      } catch(e) {
        alert('Copy failed: ' + e.message);
      }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      nameInput.value = 'UR NAME';
      nameText.textContent = 'UR NAME';
      sizeRange.value = 240; sizeRange.dispatchEvent(new Event('input'));
      speedRange.value = 115; speedRange.dispatchEvent(new Event('input'));
      intensityRange.value = 108; intensityRange.dispatchEvent(new Event('input'));
      styleSelect.value = 'sunset'; styleSelect.dispatchEvent(new Event('change'));
    });

    // small toast
    function flash(text){
      const toast = document.createElement('div');
      toast.textContent = text;
      Object.assign(toast.style, {
        position: 'fixed', inset: 'auto 0 24px 0', margin: '0 auto', width: 'fit-content',
        background: 'rgba(255,255,255,.9)', color: '#111', padding: '10px 14px',
        borderRadius: '10px', fontWeight: '700', letterSpacing: '.3px', boxShadow: '0 8px 30px rgba(0,0,0,.35)',
        transition: 'opacity .4s ease, transform .4s ease', opacity: '0', transform: 'translateY(10px)'
      });
      document.body.appendChild(toast);
      requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; });
      setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)'; setTimeout(() => toast.remove(), 400); }, 900);
    }

    // Initialize computed values on load
    sizeRange.dispatchEvent(new Event('input'));
    speedRange.dispatchEvent(new Event('input'));
    intensityRange.dispatchEvent(new Event('input'));
  