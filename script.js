document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const headerTitle = document.getElementById('header-title');
    const appContent = document.getElementById('app-content');
    
    let currentIndex = 0;

    // Função principal de navegação
    function navigateTo(newIndex) {
        if (newIndex < 0 || newIndex >= contentSections.length) {
            return;
        }

        const newTitle = document.querySelector(`.nav-link[data-index='${newIndex}']`).getAttribute('data-title');
        headerTitle.textContent = newTitle;
        
        contentSections.forEach((section, index) => {
            section.classList.remove('active', 'prev', 'next');
            if (index === newIndex) {
                section.classList.add('active');
            } else if (index < newIndex) {
                section.classList.add('prev');
            } else {
                section.classList.add('next');
            }
        });
        
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.nav-link[data-index='${newIndex}']`).classList.add('active');
        
        currentIndex = newIndex;
    }

    // Adiciona evento de clique para os ícones da navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const newIndex = parseInt(link.getAttribute('data-index'));
            navigateTo(newIndex);
        });
    });

    // Lógica para detectar o SWIPE
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    appContent.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    appContent.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance < -minSwipeDistance) {
            navigateTo(currentIndex + 1);
        } else if (swipeDistance > minSwipeDistance) {
            navigateTo(currentIndex - 1);
        }
    }
    
    // Função para simular a geração do projeto por IA
    window.simularGeracaoIA = function() {
        const quizForm = document.querySelector('.quiz-form');
        const statusItems = document.querySelectorAll('.status-item');
        const resultadoIA = document.getElementById('resultado-ia');
    
        if (!quizForm || !statusItems.length || !resultadoIA) return;

        alert('Projeto enviado para análise! Estamos gerando sua primeira versão com IA...');
        
        quizForm.style.display = 'none';

        const activeStatus = statusItems[1]; // "Preparando seu pré-projeto"
        if (activeStatus) activeStatus.classList.add('active');
        
        setTimeout(() => {
            if (activeStatus) {
                activeStatus.classList.remove('active');
                activeStatus.classList.add('completed');
            }
            const nextStatus = statusItems[2]; // "Pronto para Análise"
            if (nextStatus) nextStatus.classList.add('active');
            
            resultadoIA.style.display = 'block';
            resultadoIA.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2500);
    }

    // Função global para ser usada no botão da tela inicial
    window.navigateTo = navigateTo;
    
    // Inicia na primeira tela
    navigateTo(0);
});
