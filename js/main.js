// ==================== 导航栏交互 ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// 切换移动端菜单
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== 滚动效果 ====================
// 导航栏滚动时添加阴影
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== 返回顶部按钮 ====================
const backToTopButton = document.getElementById('backToTop');

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// 点击返回顶部
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== 滚动动画 ====================
// 观察元素进入视口时添加动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片元素
const cards = document.querySelectorAll('.feature-card, .tip-card, .warning-card, .testimonial-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 减去导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 表单提交 ====================
const ctaForm = document.querySelector('.cta-form');

ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = ctaForm.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email) {
        // 这里可以添加实际的邮件订阅逻辑
        // 目前只是显示一个提示
        alert(`感谢订阅！我们会将最新的约会建议发送到 ${email}`);
        emailInput.value = '';
    }
});

// ==================== 动态渐变背景效果 ====================
// 为hero区域添加鼠标移动效果
const hero = document.querySelector('.hero');
const heroOverlay = document.querySelector('.hero-overlay');

if (hero && heroOverlay) {
    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        heroOverlay.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(247, 114, 128, 0.4) 0%, transparent 50%),
            radial-gradient(circle at ${100-x}% ${100-y}%, rgba(102, 126, 234, 0.4) 0%, transparent 50%)
        `;
    });
}

// ==================== 计数动画 ====================
// 为成功案例添加星级动画
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    const stars = card.querySelectorAll('.testimonial-rating i');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stars.forEach((star, starIndex) => {
                    setTimeout(() => {
                        star.style.opacity = '0';
                        star.style.transform = 'scale(0)';
                        star.style.display = 'inline-block';
                        star.style.transition = 'all 0.3s ease';
                        
                        setTimeout(() => {
                            star.style.opacity = '1';
                            star.style.transform = 'scale(1)';
                        }, 50);
                    }, starIndex * 100);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    cardObserver.observe(card);
});

// ==================== 特色图标旋转效果 ====================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    const icon = card.querySelector('.feature-icon');
    
    card.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0deg)';
    });
});

// ==================== 加载动画 ====================
window.addEventListener('load', () => {
    // 页面加载完成后，为hero内容添加动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ==================== 按钮波纹效果 ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加波纹效果的CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== 提示卡片翻转效果 ====================
const tipCards = document.querySelectorAll('.tip-card');

tipCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const tipImage = this.querySelector('.tip-overlay');
        if (tipImage) {
            tipImage.style.transform = 'scale(1.1) rotate(5deg)';
            tipImage.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const tipImage = this.querySelector('.tip-overlay');
        if (tipImage) {
            tipImage.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ==================== 警告卡片脉冲效果 ====================
const warningCards = document.querySelectorAll('.warning-card');

const warningObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'pulse 0.5s ease';
            }, index * 100);
            warningObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

warningCards.forEach(card => {
    warningObserver.observe(card);
});

// 添加脉冲动画
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ==================== 控制台信息 ====================
console.log('%c欢迎来到 Dating Guide! 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%c这是一个关于跨文化约会的指南网站', 'color: #667eea; font-size: 14px;');
console.log('%c如有任何问题，请联系我们！', 'color: #f67280; font-size: 14px;');
