const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector(".form input");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = document.querySelector(".qrcode img");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Génération en cours...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        qrInput.style.display = 'none';
        generateBtn.innerText = "Télécharger l'image";
    });

    qrImg.addEventListener("error", () => {
        console.error("Erreur lors du chargement de l'image du QR Code.");
        generateBtn.innerText = "Erreur de génération";
    });
});

generateBtn.addEventListener("click", () => {
    if (generateBtn.innerText === "Télécharger l'image") {
        fetch(qrImg.src)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error("Erreur lors du téléchargement de l'image du QR Code :", error);
            });
    }
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        qrInput.style.display = 'flex';
        preValue = "";
    }
});
