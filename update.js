function(instance, properties) {
    // Önce mevcut scriptleri kontrol et
    const checkExistingScripts = () => {
        return {
            lottiePlayer: !!document.querySelector('script[src*="lottie-player"]'),
            dotlottiePlayer: !!document.querySelector('script[src*="dotlottie-player"]'),
            lottieInteractivity: !!document.querySelector('script[src*="lottie-interactivity"]')
        };
    };

    // Script yükleme fonksiyonu
    const loadScript = (url) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    // Ana fonksiyon
    const initializeLottie = async () => {
        try {
            const existingScripts = checkExistingScripts();
            
            // Sadece gerekli scriptleri yükle
            const scripts = [];
            if (!existingScripts.lottiePlayer) {
                scripts.push('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js');
            }
            if (!existingScripts.dotlottiePlayer) {
                scripts.push('https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js');
            }
            if (!existingScripts.lottieInteractivity) {
                scripts.push('https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js');
            }

            // Scriptleri sırayla yükle
            for (const script of scripts) {
                await loadScript(script);
            }

            // Properties'i ayarla
            const {
                bubble,
                ...rest
            } = properties;
            instance.data = rest;
            let {
                animation_url,
                controls,
                loop = true,
                speed = 1,
                autoplay = true,
                background = 'transparent',
                mode = 'Page Load'
            } = instance.data;
			
            // Benzersiz ID oluştur
            const elementID = `lottie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Animasyon elementini oluştur
            if (animation_url) {
                if (mode !== "Page Load") {
                    autoplay = false;
                }

                const playerType = animation_url.includes(".json") ? "lottie-player" : "dotlottie-player";
                const playerElement = `
                    <${playerType} 
                        id="${elementID}" 
                        src="${animation_url}" 
                        speed="${speed}"  
                        style="width: 100%; height: 100%;"  
                        ${loop ? "loop" : ""} 
                        ${controls ? "controls" : ""} 
                        ${autoplay ? "autoplay" : ""} 
                        background="${background}">
                    </${playerType}>
                `;

                instance.canvas.html(playerElement);

                // Etkileşimleri ayarla
                if (mode !== "Page Load") {
                    setTimeout(() => {
                        if (window.LottieInteractivity) {
                            mode = mode.toLowerCase();
                            LottieInteractivity.create({
                                player: `#${elementID}`,
                                mode: mode === "scroll" ? mode : "cursor",
                                actions: mode === "scroll" ? 
                                    [{ type: 'seek' }] : 
                                    [{ type: mode, forceFlag: false }]
                            });
                        }
                    }, 500);
                }
            } else {
                // Eğer animation_url yoksa spinner'ı yükle
                const container = instance.canvas.find('.spinner-container');
                const spinnerType = properties.spinner_type || 'simple';
                const color = properties.color || '#3498db';
                
                // Mevcut spinner'ı temizle
                container.empty();
                
                // Seçilen spinner tipine göre HTML oluştur
                switch(spinnerType) {
                    case 'simple':
                        container.html('<div class="simple-spinner"></div>');
                        container.find('.simple-spinner').css({
                            'border-top-color': color,
                            'border-color': `${color}33`
                        });
                        break;
                        
                    case 'double':
                        container.html('<div class="double-spinner"></div>');
                        container.find('.double-spinner').css({
                            '--spinner-color': color
                        });
                        break;
                        
                    case 'pulse':
                        container.html('<div class="pulse-spinner"></div>');
                        container.find('.pulse-spinner').css({
                            'background-color': color
                        });
                        break;
                }
            }

        } catch (error) {
            console.error('Initialization error:', error);
            instance.canvas.html("<div>Error loading animation or spinner.</div>");
        }
    };

    // Fonksiyonu çalıştır
    initializeLottie();
}






























