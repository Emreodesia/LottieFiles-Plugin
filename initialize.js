function(instance, context) {
    // Benzersiz ID oluştur
    const spinnerId = 'spinner-' + Math.random().toString(36).substr(2, 9);
    instance.data.spinnerId = spinnerId;
    
    // Container oluştur
    instance.canvas.html(`
        <div id="${spinnerId}" class="spinner-container"></div>
    `);

    // Temel CSS ekle
    const style = document.createElement('style');
    style.textContent = `
        .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }

        /* Simple Spinner */
        .simple-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* Double Spinner */
        .double-spinner {
            width: 40px;
            height: 40px;
            position: relative;
        }
        .double-spinner:before, .double-spinner:after {
            content: '';
            position: absolute;
            border: 4px solid transparent;
            border-top-color: #3498db;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            animation: spin 1s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
        }
        .double-spinner:after {
            animation-delay: 0.5s;
        }

        /* Pulse Spinner */
        .pulse-spinner {
            width: 40px;
            height: 40px;
            background-color: #3498db;
            border-radius: 50%;
            animation: pulse 1.2s ease-in-out infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
            0% { transform: scale(0.6); opacity: 0.6; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.6); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}