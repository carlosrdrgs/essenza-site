document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const headerTitle = document.getElementById('header-title');

    const navigateTo = (hash) => {
        const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
        if (!activeLink) return;

        // Pega o título do atributo data-title do link
        const newTitle = activeLink.getAttribute('data-title');
        headerTitle.textContent = newTitle;

        // Troca a classe 'active' nos links da navegação
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');

        // Troca a classe 'active' nas seções de conteúdo
        contentSections.forEach(section => section.classList.remove('active'));
        const activeSection = document.querySelector(hash);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    };

    // Adiciona o evento de clique para os links da navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const targetId = link.getAttribute('href');
            navigateTo(targetId);
        });
    });

    // Função global para ser usada em botões (como o da tela inicial)
    window.navigateTo = navigateTo;
    
    // Define a tela inicial ao carregar a página
    navigateTo('#inicio');
});