document.getElementById("animate_confetti").addEventListener("click", () => {
    let params = {
        particleCount: 500,
        spread: 90,
        startVelocity: 70,
        origin: { x: 0, y: 0.5 },
        angle: 45
    };

    // Joga confetes da esquerda pra direita
    confetti(params);

    // Joga confetes da direita para a esquerda
    params.origin.x = 1;
    params.angle = 135;
    confetti(params);

    // Altera a cor de fundo
    document.body.style.backgroundColor = "#FFD700";

    // Oculta a <main>
    document.getElementById("mainContent").style.display = "none";

    // Exibe a <div> oculta
    document.getElementById("hiddenDiv").classList.remove("hidden");
});
