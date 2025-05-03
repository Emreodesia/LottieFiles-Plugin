function(instance, properties) {
    $(document).ready(function() {
        let scriptList = [
            'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
            'https://unpkg.com/@dotlottie/player-component@1.0.0/dist/dotlottie-player.js',
            'https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js'
        ];

        scriptList.forEach(function(a) {
            let script = document.createElement('script');
            script.src = a;
            script.async = false;
            $('head').append(script);
        });
    });

    let box = "<div>Please insert your box.</div>";
    const {
        bubble,
        ...rest
    } = properties;
    instance.data = rest;
    let {
        animation_url,
        controls,s
        loop,
        speed,
        autoplay,
        background,
        mode
    } = instance.data;

    function uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    const elementID = `lottie_${uuid()}`;

    if (animation_url !== null) {
        if (mode !== "Page Load") {
            autoplay = false;
        }

        box = $(`<${animation_url.includes(".json") ? "lottie-player" :"dotlottie-player"} id="${elementID}" src="${animation_url}" speed="${speed}"  style="width: 100%; height: 100%;"  ${loop ? "loop" :""} ${controls ? "controls" : ""} ${autoplay ? "autoplay" :""} background="${background}"></${animation_url.includes(".json") ? "lottie-player" :"dotlottie-player"}>`);
    }
    
    instance.canvas.html(box);

    if (mode !== "Page Load") {
        const myInterval = setInterval(() => {
            if (LottieInteractivity !== undefined) {
                console.log(LottieInteractivity);
                clearInterval(myInterval);

                mode = mode.toLowerCase();

                const getActions = () => {
                    if (mode === "scroll") {
                        return [{
                            type: 'seek',
                        }]
                    } else {
                        return [{
                            type: mode,
                            forceFlag: false
                        }]
                    }
                }

                LottieInteractivity.create({
                    player: `#${elementID}`,
                    mode: mode === "scroll" ? mode : "cursor",
                    actions: getActions()
                })
            }
        }, 1000);
    }
}