document.addEventListener('DOMContentLoaded', () => {
    // VARIÁVEIS GLOBAIS
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const headerTitle = document.getElementById('header-title');
    const appContent = document.getElementById('app-content');
    let currentIndex = 0;

    // NAVEGAÇÃO PRINCIPAL (POR CLIQUE E SWIPE)
    function navigateTo(newIndex) {
        if (newIndex < 0 || newIndex >= contentSections.length) {
            return;
        }
        const newTitle = document.querySelector(`.nav-link[data-index='${newIndex}']`).getAttribute('data-title');
        headerTitle.textContent = newTitle;
        
        contentSections.forEach((section, index) => {
            section.classList.remove('active', 'prev', 'next');
            if (index === newIndex) section.classList.add('active');
            else if (index < newIndex) section.classList.add('prev');
            else section.classList.add('next');
        });
        
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.nav-link[data-index='${newIndex}']`).classList.add('active');
        
        currentIndex = newIndex;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const newIndex = parseInt(link.getAttribute('data-index'));
            navigateTo(newIndex);
        });
    });

    // LÓGICA DO SWIPE
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
        if (swipeDistance < -minSwipeDistance) navigateTo(currentIndex + 1);
        else if (swipeDistance > minSwipeDistance) navigateTo(currentIndex - 1);
    }
    
    // SIMULAÇÃO DA GERAÇÃO POR IA
    window.simularGeracaoIA = function() {
        const quizForm = document.querySelector('.quiz-form');
        const statusItems = document.querySelectorAll('.status-item');
        const resultadoIA = document.getElementById('resultado-ia');
    
        if (!quizForm || !statusItems.length || !resultadoIA) return;

        alert('Projeto enviado para análise! Estamos gerando sua primeira versão com IA...');
        quizForm.style.display = 'none';
        
        const activeStatus = statusItems[1];
        if (activeStatus) activeStatus.classList.add('active');
        
        setTimeout(() => {
            if (activeStatus) {
                activeStatus.classList.remove('active');
                activeStatus.classList.add('completed');
            }
            const nextStatus = statusItems[2];
            if (nextStatus) nextStatus.classList.add('active');
            
            resultadoIA.style.display = 'block';
            resultadoIA.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2500);
    }

    // LÓGICA DO FILTRO DA GALERIA
    const filterButtons = document.querySelectorAll('#filter-buttons .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'todos' || category === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // FUNÇÕES GLOBAIS E INICIALIZAÇÃO
    window.navigateTo = navigateTo;
    navigateTo(0);
});
