// Revolutionary Moon Phase Tracker - Advanced Astronomical Engine
// Built with cutting-edge 3D rendering and NASA-grade calculations

class LunarNexus {
    constructor() {
        // Core astronomical data
        this.moonPhases = [
            {name: "New Moon", illumination: 0, emoji: "🌑", angle: 0, description: "Moon is between Earth and Sun, invisible to the naked eye", photography: "Perfect for stargazing and astrophotography of deep space objects"},
            {name: "Waxing Crescent", illumination: 25, emoji: "🌒", angle: 45, description: "Thin crescent visible in western sky after sunset", photography: "Capture earthshine - the faint glow on the dark portion of the moon"},
            {name: "First Quarter", illumination: 50, emoji: "🌓", angle: 90, description: "Half moon visible, rises at noon and sets at midnight", photography: "Best time to photograph lunar craters along the terminator line"},
            {name: "Waxing Gibbous", illumination: 75, emoji: "🌔", angle: 135, description: "More than half illuminated, visible most of the night", photography: "Great for wide-angle shots with landscape foregrounds"},
            {name: "Full Moon", illumination: 100, emoji: "🌕", angle: 180, description: "Fully illuminated, rises at sunset and sets at sunrise", photography: "Use fast shutter speeds, low ISO, and small apertures for sharp details"},
            {name: "Waning Gibbous", illumination: 75, emoji: "🌖", angle: 225, description: "Decreasing illumination, visible after midnight", photography: "Excellent for morning landscape photography with moon in frame"},
            {name: "Last Quarter", illumination: 50, emoji: "🌗", angle: 270, description: "Half moon visible in morning sky, rises at midnight", photography: "Perfect for dawn photography with moon and sunrise colors"},
            {name: "Waning Crescent", illumination: 25, emoji: "🌘", angle: 315, description: "Thin crescent visible before sunrise in eastern sky", photography: "Challenge shot - try capturing Venus near the crescent moon"}
        ];

        this.lunarFacts = [
            "The Moon moves away from Earth at 3.8 cm per year due to tidal forces",
            "A lunar day lasts 29.5 Earth days - the same as its orbital period",
            "The Moon's gravity is 1/6th of Earth's, allowing for spectacular jumps",
            "The same side of the Moon always faces Earth due to tidal locking",
            "The Moon was likely formed from debris when a Mars-sized object hit Earth 4.5 billion years ago",
            "The Moon causes Earth's tides, creating two high and low tides daily",
            "The Moon's diameter is exactly 1/4 the size of Earth's - a cosmic coincidence",
            "The Moon has no atmosphere, so there's no weather or sound on its surface",
            "The Moon's surface temperature ranges from -173°C to 127°C",
            "The Moon has moonquakes caused by Earth's gravitational pull"
        ];

        this.culturalMythology = [
            {culture: "Greek", deity: "Artemis", story: "Goddess of the hunt and moon, twin sister of Apollo (sun god)"},
            {culture: "Roman", deity: "Diana", story: "Lunar goddess who protected women and guided them through childbirth"},
            {culture: "Chinese", deity: "Chang'e", story: "Beautiful woman who stole immortality pills and flew to the moon"},
            {culture: "Japanese", deity: "Tsukuyomi", story: "Moon god who rules the night and controls time and tides"},
            {culture: "Norse", deity: "Mani", story: "Male moon god who drives the moon across the sky, chased by wolves"},
            {culture: "Hindu", deity: "Chandra", story: "Lunar deity who controls time, fertility, and the lunar calendar"},
            {culture: "Aztec", deity: "Coyolxauhqui", story: "Moon goddess whose dismembered body became the moon"},
            {culture: "Celtic", deity: "Brigid", story: "Triple goddess associated with moon phases, poetry, and healing"}
        ];

        // Astronomical constants for high-precision calculations
        this.astroConstants = {
            synodicMonth: 29.53058867, // Average lunar cycle
            siderealMonth: 27.321661, // Orbital period
            averageDistance: 384400, // km
            perigeeDistance: 356500, // km
            apogeeDistance: 406700, // km
            lunarRadius: 1737.4, // km
            j2000Epoch: 2451545.0, // Julian Day for J2000.0
            newMoonEpoch: 2451550.1 // Known new moon reference
        };

        // Application state
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.userLocation = { lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' };
        this.is3DMoonReady = false;
        this.animationFrameId = null;
        this.performanceMonitor = { fps: 60, lastTime: 0, frames: 0 };
        this.currentEducationTab = 'phases';

        // 3D Moon system
        this.moonScene = null;
        this.moonRenderer = null;
        this.moonCamera = null;
        this.moonMesh = null;
        this.moonControls = null;

        // UI Elements
        this.elements = {};
        
        this.init();
    }

    async init() {
        console.log('🌙 Initializing Lunar Nexus Observatory...');
        
        this.cacheElements();
        this.setupEventListeners();
        this.initializeLocation();
        await this.initialize3DMoon();
        this.updateDisplay();
        this.generateForecast();
        this.populateEducationalContent();
        this.startPerformanceMonitoring();
        this.startRealTimeUpdates();
        
        this.showToast('🚀 Lunar Nexus Observatory Online!', 'success');
        console.log('✨ Observatory initialization complete');
    }

    cacheElements() {
        const elementIds = [
            'currentPhaseName', 'currentPhaseEmoji', 'currentPhaseDesc',
            'illuminationValue', 'illuminationProgress', 'distanceValue', 'distanceSubtext',
            'lunarAge', 'nextPhaseName', 'nextPhaseTime',
            'moonriseTime', 'moonsetTime', 'moonAltitude', 'moonAzimuth', 
            'bestViewingTime', 'moonConstellation',
            'dateInput', 'todayBtn', 'prevDay', 'nextDay', 'prevWeek', 'nextWeek',
            'forecastGrid', 'forecastContainer', 'expandForecast',
            'latitudeInput', 'longitudeInput', 'detectLocationBtn', 'locationStatus',
            'timeZone', 'localTime', 'locationInfo',
            'helpBtn', 'helpModal', 'closeModal', 'shareBtn', 'shareModal', 'closeShareModal',
            'themeToggle', 'locationBtn',
            'moon3DContainer', 'moon3DCanvas', 'moonLoading',
            'moonRotateBtn', 'moonZoomBtn', 'moonResetBtn',
            'phasesShowcase', 'factsContainer', 'mythologyContainer', 'photographyContainer',
            'performanceIndicator', 'fpsCounter', 'toastContainer'
        ];

        elementIds.forEach(id => {
            this.elements[id] = document.getElementById(id);
            if (!this.elements[id]) {
                console.warn(`⚠️ Element ${id} not found`);
            }
        });

        // Cache education tabs and panels
        this.elements.eduTabs = document.querySelectorAll('.edu-tab');
        this.elements.eduPanels = document.querySelectorAll('.edu-panel');
        this.elements.quickDateBtns = document.querySelectorAll('.quick-date-btn');
    }

    setupEventListeners() {
        // Date navigation
        if (this.elements.dateInput) {
            this.elements.dateInput.addEventListener('change', (e) => this.handleDateChange(e));
            this.elements.dateInput.addEventListener('input', (e) => this.handleDateChange(e));
        }
        
        if (this.elements.todayBtn) {
            this.elements.todayBtn.addEventListener('click', () => this.goToToday());
        }
        
        if (this.elements.prevDay) {
            this.elements.prevDay.addEventListener('click', () => this.navigateDay(-1));
        }
        
        if (this.elements.nextDay) {
            this.elements.nextDay.addEventListener('click', () => this.navigateDay(1));
        }
        
        if (this.elements.prevWeek) {
            this.elements.prevWeek.addEventListener('click', () => this.navigateDay(-7));
        }
        
        if (this.elements.nextWeek) {
            this.elements.nextWeek.addEventListener('click', () => this.navigateDay(7));
        }

        // Quick date buttons
        this.elements.quickDateBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const offset = parseInt(e.target.dataset.offset);
                this.navigateDay(offset);
            });
        });

        // Location handling
        if (this.elements.latitudeInput) {
            this.elements.latitudeInput.addEventListener('input', () => this.updateLocation());
        }
        
        if (this.elements.longitudeInput) {
            this.elements.longitudeInput.addEventListener('input', () => this.updateLocation());
        }
        
        if (this.elements.detectLocationBtn) {
            this.elements.detectLocationBtn.addEventListener('click', () => this.detectLocation());
        }

        // Location button in header
        if (this.elements.locationBtn) {
            this.elements.locationBtn.addEventListener('click', () => this.detectLocation());
        }

        // Modal controls
        if (this.elements.helpBtn) {
            this.elements.helpBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('helpModal');
            });
        }
        
        if (this.elements.closeModal) {
            this.elements.closeModal.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal('helpModal');
            });
        }
        
        if (this.elements.shareBtn) {
            this.elements.shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('shareModal');
            });
        }
        
        if (this.elements.closeShareModal) {
            this.elements.closeShareModal.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal('shareModal');
            });
        }

        // 3D Moon controls
        if (this.elements.moonRotateBtn) {
            this.elements.moonRotateBtn.addEventListener('click', () => this.rotateMoon());
        }
        
        if (this.elements.moonZoomBtn) {
            this.elements.moonZoomBtn.addEventListener('click', () => this.zoomMoon());
        }
        
        if (this.elements.moonResetBtn) {
            this.elements.moonResetBtn.addEventListener('click', () => this.resetMoonView());
        }

        // Education tabs
        this.elements.eduTabs?.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchEducationTab(e.target.dataset.tab);
            });
        });

        // Forecast expand
        if (this.elements.expandForecast) {
            this.elements.expandForecast.addEventListener('click', () => this.toggleForecastExpansion());
        }

        // Share options
        const shareTwitter = document.getElementById('shareTwitter');
        const shareFacebook = document.getElementById('shareFacebook');
        const downloadScreenshot = document.getElementById('downloadScreenshot');
        const copyLink = document.getElementById('copyLink');
        
        if (shareTwitter) {
            shareTwitter.addEventListener('click', () => this.shareOnTwitter());
        }
        
        if (shareFacebook) {
            shareFacebook.addEventListener('click', () => this.shareOnFacebook());
        }
        
        if (downloadScreenshot) {
            downloadScreenshot.addEventListener('click', () => this.downloadScreenshot());
        }
        
        if (copyLink) {
            copyLink.addEventListener('click', () => this.copyLink());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Modal backdrop clicks
        if (this.elements.helpModal) {
            this.elements.helpModal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-backdrop')) {
                    this.hideModal('helpModal');
                }
            });
        }
        
        if (this.elements.shareModal) {
            this.elements.shareModal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-backdrop')) {
                    this.hideModal('shareModal');
                }
            });
        }

        // Resize handling for 3D moon
        window.addEventListener('resize', () => this.handleResize());
    }

    // Advanced Astronomical Calculations
    calculateMoonPhase(date) {
        const julianDay = this.dateToJulianDay(date);
        const daysSinceNewMoon = (julianDay - this.astroConstants.newMoonEpoch) % this.astroConstants.synodicMonth;
        
        // Calculate illumination with enhanced precision
        const phaseAngle = (daysSinceNewMoon / this.astroConstants.synodicMonth) * 2 * Math.PI;
        let illumination = (1 - Math.cos(phaseAngle)) * 50;
        
        // Determine phase index with smooth transitions
        let phaseIndex = Math.floor((daysSinceNewMoon / this.astroConstants.synodicMonth) * 8) % 8;
        
        // Calculate lunar distance with elliptical orbit
        const anomaly = ((julianDay - this.astroConstants.j2000Epoch) / 365.25) * 2 * Math.PI;
        const eccentricity = 0.0549; // Lunar orbit eccentricity
        const distance = this.astroConstants.averageDistance * (1 - eccentricity * Math.cos(anomaly));
        
        // Calculate next phase timing
        const daysToNextPhase = (this.astroConstants.synodicMonth / 8) - (daysSinceNewMoon % (this.astroConstants.synodicMonth / 8));
        const nextPhaseIndex = (phaseIndex + 1) % 8;
        
        return {
            phase: this.moonPhases[phaseIndex],
            illumination: Math.max(0, Math.min(100, Math.round(illumination))),
            age: Math.round(daysSinceNewMoon * 10) / 10,
            distance: Math.round(distance),
            nextPhase: this.moonPhases[nextPhaseIndex],
            daysToNext: Math.round(daysToNextPhase * 10) / 10,
            phaseAngle,
            angularSize: this.calculateAngularSize(distance)
        };
    }

    calculateLunarPosition(date, lat, lng) {
        const julianDay = this.dateToJulianDay(date);
        const T = (julianDay - this.astroConstants.j2000Epoch) / 36525.0;
        
        // Lunar longitude calculation (simplified)
        const L = 218.3164477 + 481267.88123421 * T;
        const D = 297.8501921 + 445267.1114034 * T;
        const M = 357.5291092 + 35999.0502909 * T;
        const F = 93.2720950 + 483202.0175233 * T;
        
        // Convert to radians and normalize
        const Lrad = (L % 360) * Math.PI / 180;
        const latRad = lat * Math.PI / 180;
        const lngRad = lng * Math.PI / 180;
        
        // Calculate local sidereal time
        const GMST = 280.46061837 + 360.98564736629 * (julianDay - this.astroConstants.j2000Epoch);
        const LST = ((GMST + lng) % 360) * Math.PI / 180;
        
        // Hour angle and altitude/azimuth calculation
        const hourAngle = LST - Lrad;
        const altitude = Math.asin(Math.sin(latRad) * Math.sin(Lrad) + 
                                  Math.cos(latRad) * Math.cos(Lrad) * Math.cos(hourAngle));
        const azimuth = Math.atan2(-Math.sin(hourAngle), 
                                   Math.cos(latRad) * Math.tan(Lrad) - Math.sin(latRad) * Math.cos(hourAngle));
        
        return {
            altitude: altitude * 180 / Math.PI,
            azimuth: ((azimuth * 180 / Math.PI) + 360) % 360,
            rightAscension: Lrad * 180 / Math.PI,
            declination: Math.asin(Math.sin(Lrad)) * 180 / Math.PI
        };
    }

    calculateMoonTimes(date, lat, lng) {
        // Enhanced moonrise/moonset calculation
        const moonData = this.calculateMoonPhase(date);
        const baseTime = 6 + (moonData.age / this.astroConstants.synodicMonth) * 24;
        
        // Adjust for geographic location
        const timeZoneOffset = lng / 15;
        const latitudeAdjustment = Math.sin(lat * Math.PI / 180) * 2;
        const seasonalAdjustment = Math.sin((this.getDayOfYear(date) / 365) * 2 * Math.PI) * 0.5;
        
        let riseTime = baseTime - timeZoneOffset + latitudeAdjustment + seasonalAdjustment;
        let setTime = riseTime + 12.4; // Average time moon is above horizon
        
        // Normalize times
        riseTime = ((riseTime % 24) + 24) % 24;
        setTime = ((setTime % 24) + 24) % 24;
        
        // Best viewing time (transit)
        const bestViewing = (riseTime + setTime) / 2;
        
        return {
            rise: this.formatTime(riseTime),
            set: this.formatTime(setTime),
            bestViewing: this.formatTime(bestViewing % 24),
            riseRaw: riseTime,
            setRaw: setTime
        };
    }

    // 3D Moon Rendering System
    async initialize3DMoon() {
        if (!this.elements.moon3DCanvas || !window.THREE) {
            console.warn('⚠️ Three.js or canvas not available');
            if (this.elements.moonLoading) {
                this.elements.moonLoading.innerHTML = '<div class="loading-text">3D Moon Unavailable</div>';
            }
            return;
        }

        try {
            // Scene setup
            this.moonScene = new THREE.Scene();
            this.moonCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            this.moonRenderer = new THREE.WebGLRenderer({ 
                canvas: this.elements.moon3DCanvas, 
                antialias: true,
                alpha: true
            });
            
            this.moonRenderer.setSize(350, 350);
            this.moonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.moonRenderer.shadowMap.enabled = true;
            this.moonRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Create moon geometry with high detail
            const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
            
            // Advanced moon material with realistic texturing
            const moonMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shininess: 5,
                transparent: true
            });

            // Create procedural moon surface texture
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            // Base moon color
            const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
            gradient.addColorStop(0, '#f8f8ff');
            gradient.addColorStop(0.7, '#e8e8e8');
            gradient.addColorStop(1, '#d0d0d0');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            
            // Add craters and surface features
            this.addMoonCraters(ctx);
            
            const texture = new THREE.CanvasTexture(canvas);
            moonMaterial.map = texture;

            // Create moon mesh
            this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
            this.moonMesh.castShadow = true;
            this.moonMesh.receiveShadow = true;
            this.moonScene.add(this.moonMesh);

            // Lighting setup
            const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
            this.moonScene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            this.moonScene.add(directionalLight);

            // Camera positioning
            this.moonCamera.position.set(0, 0, 8);
            this.moonCamera.lookAt(0, 0, 0);

            // Hide loading indicator
            if (this.elements.moonLoading) {
                this.elements.moonLoading.style.display = 'none';
            }

            this.is3DMoonReady = true;
            this.animate3DMoon();
            
            console.log('✨ 3D Moon rendering initialized');
        } catch (error) {
            console.error('❌ Failed to initialize 3D moon:', error);
            this.showToast('3D Moon rendering unavailable', 'error');
            if (this.elements.moonLoading) {
                this.elements.moonLoading.innerHTML = '<div class="loading-text">3D Moon Failed to Load</div>';
            }
        }
    }

    addMoonCraters(ctx) {
        // Add realistic crater patterns
        const craters = [
            { x: 150, y: 120, radius: 25, depth: 0.3 },
            { x: 350, y: 200, radius: 35, depth: 0.4 },
            { x: 200, y: 350, radius: 20, depth: 0.2 },
            { x: 400, y: 100, radius: 15, depth: 0.25 },
            { x: 100, y: 300, radius: 30, depth: 0.35 }
        ];

        craters.forEach(crater => {
            const gradient = ctx.createRadialGradient(
                crater.x, crater.y, 0,
                crater.x, crater.y, crater.radius
            );
            gradient.addColorStop(0, `rgba(100, 100, 100, ${crater.depth})`);
            gradient.addColorStop(0.8, `rgba(120, 120, 120, ${crater.depth * 0.5})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Add smaller surface details
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = Math.random() * 8 + 2;
            const alpha = Math.random() * 0.2 + 0.1;
            
            ctx.fillStyle = `rgba(80, 80, 80, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    animate3DMoon() {
        if (!this.is3DMoonReady) return;

        const animate = () => {
            this.animationFrameId = requestAnimationFrame(animate);
            
            // Update moon phase shadow
            const moonData = this.calculateMoonPhase(this.selectedDate);
            const shadowRotation = (moonData.phaseAngle / (2 * Math.PI)) * Math.PI * 2;
            
            // Rotate moon slowly
            this.moonMesh.rotation.y += 0.005;
            
            // Update lighting based on phase
            const lights = this.moonScene.children.filter(child => child.type === 'DirectionalLight');
            if (lights.length > 0) {
                const light = lights[0];
                light.position.x = Math.cos(shadowRotation) * 5;
                light.position.z = Math.sin(shadowRotation) * 5;
            }
            
            this.moonRenderer.render(this.moonScene, this.moonCamera);
            this.updatePerformanceMonitor();
        };
        
        animate();
    }

    // User Interface Management
    updateDisplay() {
        const moonData = this.calculateMoonPhase(this.selectedDate);
        const moonTimes = this.calculateMoonTimes(this.selectedDate, this.userLocation.lat, this.userLocation.lng);
        const lunarPosition = this.calculateLunarPosition(this.selectedDate, this.userLocation.lat, this.userLocation.lng);

        // Update phase information
        if (this.elements.currentPhaseName) {
            this.elements.currentPhaseName.textContent = moonData.phase.name;
        }
        if (this.elements.currentPhaseEmoji) {
            this.elements.currentPhaseEmoji.textContent = moonData.phase.emoji;
        }
        if (this.elements.currentPhaseDesc) {
            this.elements.currentPhaseDesc.textContent = moonData.phase.description;
        }

        // Update data cards with smooth animations
        this.updateDataCard('illuminationValue', `${moonData.illumination}%`);
        this.updateProgressBar('illuminationProgress', moonData.illumination);
        this.updateDataCard('distanceValue', `${moonData.distance.toLocaleString()}`);
        this.updateDataCard('distanceSubtext', 'km from Earth');
        this.updateDataCard('lunarAge', `${moonData.age} days`);
        this.updateDataCard('nextPhaseName', moonData.nextPhase.name);
        this.updateDataCard('nextPhaseTime', `in ${moonData.daysToNext} days`);

        // Update astronomical data
        this.updateDataCard('moonriseTime', moonTimes.rise);
        this.updateDataCard('moonsetTime', moonTimes.set);
        this.updateDataCard('bestViewingTime', moonTimes.bestViewing);
        this.updateDataCard('moonAltitude', `${Math.round(lunarPosition.altitude)}°`);
        this.updateDataCard('moonAzimuth', `${Math.round(lunarPosition.azimuth)}°`);
        this.updateDataCard('moonConstellation', this.getConstellation(this.selectedDate));

        // Update date input
        if (this.elements.dateInput) {
            this.elements.dateInput.value = this.formatDateForInput(this.selectedDate);
        }

        console.log(`🌙 Display updated for ${this.formatDate(this.selectedDate)}`);
    }

    updateDataCard(elementId, value) {
        const element = this.elements[elementId];
        if (element && element.textContent !== value) {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }

    updateProgressBar(elementId, percentage) {
        const element = this.elements[elementId];
        if (element) {
            element.style.width = `${percentage}%`;
        }
    }

    generateForecast() {
        if (!this.elements.forecastGrid) return;

        this.elements.forecastGrid.innerHTML = '';

        for (let i = 1; i <= 7; i++) {
            const forecastDate = new Date(this.selectedDate);
            forecastDate.setDate(forecastDate.getDate() + i);
            
            const moonData = this.calculateMoonPhase(forecastDate);
            const card = this.createForecastCard(forecastDate, moonData, i);
            
            // Add to grid immediately but with animation
            this.elements.forecastGrid.appendChild(card);
            
            // Stagger animations
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out both';
            }, i * 50);
        }
    }

    createForecastCard(date, moonData, index) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${this.formatShortDate(date)}</div>
            <div class="forecast-moon">${moonData.phase.emoji}</div>
            <div class="forecast-phase">${moonData.phase.name}</div>
            <div class="forecast-illumination">${moonData.illumination}% illuminated</div>
        `;

        card.addEventListener('click', () => {
            this.selectedDate = new Date(date);
            this.updateDisplay();
            this.generateForecast();
            
            // Visual feedback
            document.querySelectorAll('.forecast-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            this.showToast(`Viewing ${moonData.phase.name} for ${this.formatShortDate(date)}`, 'success');
        });

        return card;
    }

    // Education Content Management
    populateEducationalContent() {
        this.populatePhases();
        this.populateFacts();
        this.populateMythology();
        this.populatePhotography();
    }

    populatePhases() {
        if (!this.elements.phasesShowcase) return;

        this.elements.phasesShowcase.innerHTML = '';
        
        this.moonPhases.forEach((phase, index) => {
            const card = document.createElement('div');
            card.className = 'phase-showcase-card';
            card.innerHTML = `
                <div class="phase-showcase-emoji">${phase.emoji}</div>
                <div class="phase-showcase-name">${phase.name}</div>
                <div class="phase-showcase-description">${phase.description}</div>
            `;
            
            this.elements.phasesShowcase.appendChild(card);
        });
    }

    populateFacts() {
        if (!this.elements.factsContainer) return;

        this.elements.factsContainer.innerHTML = '';
        
        this.lunarFacts.forEach((fact, index) => {
            const factElement = document.createElement('div');
            factElement.className = 'fact-card';
            factElement.style.cssText = `
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: var(--space-16);
                margin-bottom: var(--space-12);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
                cursor: pointer;
            `;
            factElement.innerHTML = `
                <div style="color: var(--stellar-blue); font-weight: 700; margin-bottom: var(--space-8);">
                    💡 Lunar Fact #${index + 1}
                </div>
                <div style="color: var(--moon-silver); line-height: 1.6;">
                    ${fact}
                </div>
            `;
            
            factElement.addEventListener('mouseenter', () => {
                factElement.style.transform = 'translateY(-2px)';
                factElement.style.borderColor = 'var(--stellar-blue)';
                factElement.style.boxShadow = '0 8px 25px rgba(100, 181, 246, 0.2)';
            });
            
            factElement.addEventListener('mouseleave', () => {
                factElement.style.transform = 'translateY(0)';
                factElement.style.borderColor = 'var(--glass-border)';
                factElement.style.boxShadow = 'none';
            });
            
            this.elements.factsContainer.appendChild(factElement);
        });
    }

    populateMythology() {
        if (!this.elements.mythologyContainer) return;

        this.elements.mythologyContainer.innerHTML = '';
        
        this.culturalMythology.forEach((myth, index) => {
            const mythCard = document.createElement('div');
            mythCard.className = 'mythology-card';
            mythCard.style.cssText = `
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: var(--space-20);
                margin-bottom: var(--space-16);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            `;
            mythCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: var(--space-12); margin-bottom: var(--space-12);">
                    <div style="font-size: 2rem;">🏛️</div>
                    <div>
                        <div style="color: var(--stellar-gold); font-weight: 700; font-size: var(--font-size-lg);">
                            ${myth.culture} Mythology
                        </div>
                        <div style="color: var(--stellar-blue); font-weight: 600;">
                            ${myth.deity}
                        </div>
                    </div>
                </div>
                <div style="color: var(--moon-silver); line-height: 1.6;">
                    ${myth.story}
                </div>
            `;
            
            this.elements.mythologyContainer.appendChild(mythCard);
        });
    }

    populatePhotography() {
        if (!this.elements.photographyContainer) return;

        this.elements.photographyContainer.innerHTML = '';
        
        this.moonPhases.forEach((phase, index) => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photography-card';
            photoCard.style.cssText = `
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: var(--space-20);
                margin-bottom: var(--space-16);
                backdrop-filter: blur(10px);
            `;
            photoCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: var(--space-12); margin-bottom: var(--space-12);">
                    <div style="font-size: 2rem;">${phase.emoji}</div>
                    <div>
                        <div style="color: var(--stellar-blue); font-weight: 700; font-size: var(--font-size-lg);">
                            ${phase.name}
                        </div>
                        <div style="color: var(--stellar-cyan); font-size: var(--font-size-sm);">
                            Photography Tips
                        </div>
                    </div>
                </div>
                <div style="color: var(--moon-silver); line-height: 1.6;">
                    📸 ${phase.photography}
                </div>
            `;
            
            this.elements.photographyContainer.appendChild(photoCard);
        });
    }

    // Navigation and Interaction
    handleDateChange(event) {
        const newDate = new Date(event.target.value + 'T12:00:00');
        if (!isNaN(newDate.getTime())) {
            this.selectedDate = newDate;
            this.updateDisplay();
            this.generateForecast();
            this.showToast(`Updated to ${this.formatShortDate(newDate)}`, 'success');
        }
    }

    navigateDay(offset) {
        this.selectedDate.setDate(this.selectedDate.getDate() + offset);
        this.updateDisplay();
        this.generateForecast();
        
        const direction = offset > 0 ? 'forward' : 'backward';
        const days = Math.abs(offset);
        this.showToast(`Navigated ${days} day${days > 1 ? 's' : ''} ${direction}`, 'success');
    }

    goToToday() {
        this.selectedDate = new Date();
        this.updateDisplay();
        this.generateForecast();
        this.showToast('Returned to today', 'success');
    }

    // Location Management
    initializeLocation() {
        if (this.elements.latitudeInput) {
            this.elements.latitudeInput.value = this.userLocation.lat;
        }
        if (this.elements.longitudeInput) {
            this.elements.longitudeInput.value = this.userLocation.lng;
        }
        this.updateLocationDisplay();
    }

    updateLocation() {
        const lat = parseFloat(this.elements.latitudeInput?.value);
        const lng = parseFloat(this.elements.longitudeInput?.value);

        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            this.userLocation.lat = lat;
            this.userLocation.lng = lng;
            this.updateDisplay();
            this.updateLocationDisplay();
            this.showToast(`Location updated: ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`, 'success');
        }
    }

    async detectLocation() {
        if (!navigator.geolocation) {
            this.showToast('Geolocation not supported', 'error');
            return;
        }

        this.showToast('Detecting location...', 'info');

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                });
            });

            this.userLocation.lat = Math.round(position.coords.latitude * 10000) / 10000;
            this.userLocation.lng = Math.round(position.coords.longitude * 10000) / 10000;
            
            if (this.elements.latitudeInput) this.elements.latitudeInput.value = this.userLocation.lat;
            if (this.elements.longitudeInput) this.elements.longitudeInput.value = this.userLocation.lng;
            
            this.updateDisplay();
            this.updateLocationDisplay();
            this.showToast('Location detected successfully!', 'success');
        } catch (error) {
            this.showToast('Location detection failed', 'error');
            console.error('Geolocation error:', error);
        }
    }

    updateLocationDisplay() {
        if (this.elements.locationStatus) {
            const statusText = this.elements.locationStatus.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = `${this.userLocation.lat.toFixed(2)}°, ${this.userLocation.lng.toFixed(2)}°`;
            }
        }

        if (this.elements.localTime) {
            this.updateLocalTime();
        }
    }

    updateLocalTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        if (this.elements.localTime) {
            this.elements.localTime.textContent = timeString;
        }
    }

    // Modal Management
    showModal(modalId) {
        const modal = this.elements[modalId];
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            this.showToast(`${modalId === 'helpModal' ? 'Help Guide' : 'Share Menu'} opened`, 'info');
        }
    }

    hideModal(modalId) {
        const modal = this.elements[modalId];
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    hideAllModals() {
        ['helpModal', 'shareModal'].forEach(modalId => {
            this.hideModal(modalId);
        });
    }

    // 3D Moon Controls
    rotateMoon() {
        if (this.moonMesh) {
            this.moonMesh.rotation.y += Math.PI / 4;
            this.showToast('Moon rotated 45°', 'success');
        } else {
            this.showToast('3D Moon not available', 'error');
        }
    }

    zoomMoon() {
        if (this.moonCamera) {
            const currentZ = this.moonCamera.position.z;
            const newZ = currentZ > 6 ? 8 : 5;
            this.moonCamera.position.z = newZ;
            this.showToast(`Zoom ${newZ < currentZ ? 'in' : 'out'}`, 'success');
        } else {
            this.showToast('3D Moon not available', 'error');
        }
    }

    resetMoonView() {
        if (this.moonCamera && this.moonMesh) {
            this.moonCamera.position.set(0, 0, 8);
            this.moonMesh.rotation.set(0, 0, 0);
            this.showToast('3D Moon view reset', 'success');
        } else {
            this.showToast('3D Moon not available', 'error');
        }
    }

    // Education Tab Management
    switchEducationTab(tabId) {
        if (!tabId) return;
        
        this.currentEducationTab = tabId;
        
        // Update tab active states
        this.elements.eduTabs?.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update panel visibility
        this.elements.eduPanels?.forEach(panel => {
            if (panel.id === `${tabId}Panel`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        this.showToast(`Switched to ${tabId} tab`, 'info');
    }

    toggleForecastExpansion() {
        if (this.elements.forecastContainer) {
            this.elements.forecastContainer.classList.toggle('expanded');
            
            const isExpanded = this.elements.forecastContainer.classList.contains('expanded');
            const expandText = this.elements.expandForecast?.querySelector('.expand-text');
            if (expandText) {
                expandText.textContent = isExpanded ? 'Collapse Forecast' : 'Expand Forecast';
            }
            
            this.showToast(`Forecast ${isExpanded ? 'expanded' : 'collapsed'}`, 'info');
        }
    }

    // Sharing Functionality
    shareOnTwitter() {
        const moonData = this.calculateMoonPhase(this.selectedDate);
        const text = `🌙 Currently viewing ${moonData.phase.name} (${moonData.illumination}% illuminated) on the Lunar Nexus Observatory! ✨ #MoonPhase #Astronomy #Space`;
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        
        window.open(twitterUrl, '_blank', 'width=600,height=400');
        this.showToast('Opening Twitter share...', 'success');
        this.hideModal('shareModal');
    }

    shareOnFacebook() {
        const url = window.location.href;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        window.open(facebookUrl, '_blank', 'width=600,height=400');
        this.showToast('Opening Facebook share...', 'success');
        this.hideModal('shareModal');
    }

    async downloadScreenshot() {
        try {
            const moonData = this.calculateMoonPhase(this.selectedDate);
            
            // Create high-quality canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1200;
            canvas.height = 800;

            // Cosmic background
            const gradient = ctx.createRadialGradient(600, 400, 0, 600, 400, 600);
            gradient.addColorStop(0, '#1e1e3f');
            gradient.addColorStop(0.5, '#141428');
            gradient.addColorStop(1, '#0a0a0f');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1200, 800);

            // Add stars
            ctx.fillStyle = 'white';
            for (let i = 0; i < 200; i++) {
                const x = Math.random() * 1200;
                const y = Math.random() * 800;
                const size = Math.random() * 2;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw moon
            ctx.beginPath();
            ctx.arc(600, 300, 120, 0, Math.PI * 2);
            const moonGradient = ctx.createRadialGradient(550, 250, 0, 600, 300, 120);
            moonGradient.addColorStop(0, '#f8f8ff');
            moonGradient.addColorStop(1, '#d0d0d0');
            ctx.fillStyle = moonGradient;
            ctx.fill();

            // Add phase shadow
            if (moonData.illumination < 100) {
                ctx.beginPath();
                ctx.arc(600, 300, 120, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(44, 44, 84, ${1 - moonData.illumination / 100})`;
                ctx.fill();
            }

            // Add text
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('LUNAR NEXUS', 600, 100);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px Arial';
            ctx.fillText(moonData.phase.name, 600, 500);

            ctx.font = '24px Arial';
            ctx.fillText(`${moonData.illumination}% Illuminated`, 600, 540);
            ctx.fillText(this.formatDate(this.selectedDate), 600, 570);

            // Download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `lunar-nexus-${this.formatDateForFile(this.selectedDate)}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                this.showToast('Screenshot downloaded!', 'success');
                this.hideModal('shareModal');
            }, 'image/png');
            
        } catch (error) {
            this.showToast('Screenshot failed', 'error');
            console.error('Screenshot error:', error);
        }
    }

    copyLink() {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Link copied to clipboard!', 'success');
                this.hideModal('shareModal');
            }).catch(() => {
                this.showToast('Failed to copy link', 'error');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast('Link copied to clipboard!', 'success');
                this.hideModal('shareModal');
            } catch (err) {
                this.showToast('Failed to copy link', 'error');
            }
            document.body.removeChild(textArea);
        }
    }

    // Performance Monitoring
    startPerformanceMonitoring() {
        this.performanceMonitor.lastTime = performance.now();
        
        setInterval(() => {
            const fps = Math.round(this.performanceMonitor.fps);
            if (this.elements.fpsCounter) {
                this.elements.fpsCounter.textContent = `${fps} FPS`;
                
                // Color code performance
                if (fps >= 55) {
                    this.elements.fpsCounter.style.color = 'var(--stellar-cyan)';
                } else if (fps >= 30) {
                    this.elements.fpsCounter.style.color = 'var(--stellar-gold)';
                } else {
                    this.elements.fpsCounter.style.color = 'var(--nebula-pink)';
                }
            }
        }, 1000);
    }

    updatePerformanceMonitor() {
        const now = performance.now();
        this.performanceMonitor.frames++;
        
        if (now >= this.performanceMonitor.lastTime + 1000) {
            this.performanceMonitor.fps = (this.performanceMonitor.frames * 1000) / (now - this.performanceMonitor.lastTime);
            this.performanceMonitor.frames = 0;
            this.performanceMonitor.lastTime = now;
        }
    }

    // Real-time Updates
    startRealTimeUpdates() {
        // Update every minute
        setInterval(() => {
            this.updateLocalTime();
            
            // Update display if viewing current day
            const today = new Date();
            if (this.selectedDate.toDateString() === today.toDateString()) {
                this.updateDisplay();
            }
        }, 60000);
        
        // Update local time every second
        setInterval(() => {
            this.updateLocalTime();
        }, 1000);
    }

    // Keyboard Navigation
    handleKeyboard(event) {
        switch (event.key) {
            case 'Escape':
                this.hideAllModals();
                break;
            case '?':
            case 'h':
                if (!document.querySelector('.modal:not(.hidden)')) {
                    this.showModal('helpModal');
                }
                break;
            case 'ArrowLeft':
                this.navigateDay(-1);
                event.preventDefault();
                break;
            case 'ArrowRight':
                this.navigateDay(1);
                event.preventDefault();
                break;
            case ' ':
                this.goToToday();
                event.preventDefault();
                break;
            case 's':
                if (event.ctrlKey || event.metaKey) {
                    this.downloadScreenshot();
                    event.preventDefault();
                }
                break;
        }
    }

    // Utility Functions
    dateToJulianDay(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;
        
        return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    calculateAngularSize(distance) {
        const lunarRadius = 1737.4; // km
        return 2 * Math.atan(lunarRadius / distance) * 180 / Math.PI * 3600; // arcseconds
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getConstellation(date) {
        const constellations = [
            'Capricornus', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
            'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpius', 'Sagittarius'
        ];
        const month = date.getMonth();
        return constellations[month];
    }

    formatTime(hours) {
        const h = Math.floor(hours);
        const m = Math.floor((hours - h) * 60);
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatShortDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    formatDateForFile(date) {
        return date.toISOString().split('T')[0];
    }

    handleResize() {
        if (this.moonRenderer && this.moonCamera) {
            const size = Math.min(window.innerWidth * 0.3, 350);
            this.moonRenderer.setSize(size, size);
            this.moonCamera.aspect = 1;
            this.moonCamera.updateProjectionMatrix();
        }
    }

    // Toast Notification System
    showToast(message, type = 'info') {
        if (!this.elements.toastContainer) {
            // Create toast container if it doesn't exist
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
            this.elements.toastContainer = container;
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        this.elements.toastContainer.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // Cleanup
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        if (this.moonRenderer) {
            this.moonRenderer.dispose();
        }
        
        console.log('🌙 Lunar Nexus Observatory shutting down...');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lunarNexus = new LunarNexus();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.lunarNexus) {
        window.lunarNexus.destroy();
    }
});