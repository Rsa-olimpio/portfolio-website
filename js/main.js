/**
 * main.js - Portfolio Website
 * Funcionalidades: Menu mobile, validação de formulário, filtro portfólio, FAQ accordion, 
 * back to top, typewriter effect, animação de skills, loading spinner e mais
 */


// 1. MENU MOBILE

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ============================================
// 2. BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 3. TYPEWRITER EFFECT
// ============================================
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();
}

// ============================================
// 4. ANIMAÇÃO DAS SKILL BARS (quando visível)
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

// ============================================
// 5. FILTRO DO PORTFÓLIO
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Adicionar keyframes dinamicamente
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// 6. FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// ============================================
// 7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ============================================
/*const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Mostrar loading
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio (delay de 1.5s)
            setTimeout(() => {
                showSuccessModal();
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                clearErrors();
            }, 1500);
        }
    });
}
*/
function validateForm() {
    let isValid = true;
    
    // Nome
    const nome = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError');
    if (nome.value.trim().length < 3) {
        nomeError.textContent = 'Nome deve ter pelo menos 3 caracteres';
        nome.classList.add('error');
        isValid = false;
    } else {
        nomeError.textContent = '';
        nome.classList.remove('error');
    }
    
    // Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Digite um e-mail válido';
        email.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.remove('error');
    }
    
    // Telefone
    const telefone = document.getElementById('telefone');
    const telefoneError = document.getElementById('telefoneError');
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/;
    if (telefone.value.trim() && !phoneRegex.test(telefone.value.trim())) {
        telefoneError.textContent = 'Digite um telefone válido (ex: 11999999999)';
        telefone.classList.add('error');
        isValid = false;
    } else {
        telefoneError.textContent = '';
        telefone.classList.remove('error');
    }
    
    // Assunto
    const assunto = document.getElementById('assunto');
    const assuntoError = document.getElementById('assuntoError');
    if (assunto.value.trim().length < 5) {
        assuntoError.textContent = 'Assunto deve ter pelo menos 5 caracteres';
        assunto.classList.add('error');
        isValid = false;
    } else {
        assuntoError.textContent = '';
        assunto.classList.remove('error');
    }
    
    // Mensagem
    const mensagem = document.getElementById('mensagem');
    const mensagemError = document.getElementById('mensagemError');
    if (mensagem.value.trim().length < 20) {
        mensagemError.textContent = 'Mensagem deve ter pelo menos 20 caracteres';
        mensagem.classList.add('error');
        isValid = false;
    } else {
        mensagemError.textContent = '';
        mensagem.classList.remove('error');
    }
    
    return isValid;
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        
        const closeBtn = document.getElementById('closeModal');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
        
        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

// ============================================
// 8. MÁSCARA DE TELEFONE
// ============================================
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length === 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length === 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        }
        
        e.target.value = value;
    });
}

// ============================================
// 9. VALIDAÇÃO EM TEMPO REAL
// ============================================
const formInputs = ['nome', 'email', 'telefone', 'assunto', 'mensagem'];
formInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('blur', () => {
            validateForm();
        });
    }
});

// ============================================
// 10. NAVBAR ATIVAÇÃO POR SCROLL (destacar seção ativa)
// ============================================
function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (sections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current || (current === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
}
setActiveNavOnScroll();

// ============================================
// 11. ANIMAÇÃO AO SCROLL (reveal)
// ============================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-card, .service-full-card, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
revealOnScroll();

// ============================================
// 12. EFECTO DE HOVER NOS CARDS (info extra via JS)
// ============================================
const portfolioCardsHover = document.querySelectorAll('.portfolio-card');
portfolioCardsHover.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const hoverInfo = card.querySelector('.card-hover-info');
        if (hoverInfo) {
            hoverInfo.style.opacity = '1';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const hoverInfo = card.querySelector('.card-hover-info');
        if (hoverInfo) {
            hoverInfo.style.opacity = '0';
        }
    });
});

console.log('✅ Website carregado com sucesso! Todos os efeitos interativos estão ativos.');
