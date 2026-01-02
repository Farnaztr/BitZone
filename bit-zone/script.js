document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});
const assessmentData = {
    questions: [
        {
            id: 1,
            question: "چه نوع پروژه‌هایی بیشتر شما را هیجان‌زده می‌کند؟",
            options: [
                { text: "ساخت رابط کاربری زیبا و تعاملی", score: { frontend: 3, backend: 1, ai: 0 } },
                { text: "کار با داده‌ها و الگوریتم‌های پیچیده", score: { frontend: 0, backend: 2, ai: 3 } },
                { text: "ساخت سیستم‌های بزرگ و مدیریت سرور", score: { frontend: 1, backend: 3, ai: 1 } },
                { text: "کار بر روی هوش مصنوعی و پیش‌بینی", score: { frontend: 0, backend: 1, ai: 3 } }
            ]
        },
        {
            id: 2,
            question: "در حل مشکلات، چه رویکردی دارید؟",
            options: [
                { text: "خلاقیت بصری و طراحی راه‌حل", score: { frontend: 3, backend: 1, ai: 1 } },
                { text: "تحلیل منطقی و الگوریتمی", score: { frontend: 1, backend: 2, ai: 3 } },
                { text: "ساختاردهی و سازماندهی سیستم", score: { frontend: 1, backend: 3, ai: 1 } },
                { text: "کاوش داده و پیدا کردن الگو", score: { frontend: 0, backend: 1, ai: 3 } }
            ]
        },
        {
            id: 3,
            question: "چه ابزارهایی برای شما جذاب‌تر هستند؟",
            options: [
                { text: "ابزارهای طراحی و انیمیشن", score: { frontend: 3, backend: 0, ai: 0 } },
                { text: "بانک‌های اطلاعاتی و API", score: { frontend: 1, backend: 3, ai: 1 } },
                { text: "کتابخانه‌های ریاضی و آماری", score: { frontend: 0, backend: 1, ai: 3 } },
                { text: "فریمورک‌های توسعه وب", score: { frontend: 2, backend: 2, ai: 0 } }
            ]
        },
        {
            id: 4,
            question: "دوست دارید در چه محیطی کار کنید؟",
            options: [
                { text: "استارتاپ با تمرکز بر کاربر", score: { frontend: 3, backend: 2, ai: 1 } },
                { text: "شرکت‌های بزرگ فناوری", score: { frontend: 2, backend: 2, ai: 2 } },
                { text: "مراکز تحقیقاتی", score: { frontend: 0, backend: 1, ai: 3 } },
                { text: "شرکت‌های خدمات نرم‌افزاری", score: { frontend: 1, backend: 3, ai: 1 } }
            ]
        },
        {
            id: 5,
            question: "هدف نهایی شما از برنامه‌نویسی چیست؟",
            options: [
                { text: "ساخت محصولاتی که میلیون‌ها کاربر ببینند", score: { frontend: 3, backend: 2, ai: 1 } },
                { text: "حل مسائل پیچیده کسب‌وکار", score: { frontend: 1, backend: 3, ai: 2 } },
                { text: "تحقیق و توسعه فناوری‌های جدید", score: { frontend: 0, backend: 1, ai: 3 } },
                { text: "کارآفرینی و ساخت استارتاپ", score: { frontend: 2, backend: 2, ai: 2 } }
            ]
        }
    ],
};
const resultMap = {
    frontend: {
        title: "توسعه‌دهنده فرانت‌اند",
        percent: "80%",
        duration: "6 ماه",
        description: "شما استعداد طبیعی در طراحی و ساخت تجربه‌های کاربری دارید.",
        message: "شما یک طراح خلاق و فنی هستید!",
        reason: "تمرکز شما روی UI، UX و تعامل کاربر است."
    },
    backend: {
        title: "توسعه‌دهنده بک‌اند",
        percent: "75%",
        duration: "8 ماه",
        description: "شما به منطق، ساختار و سیستم‌های پایدار علاقه دارید.",
        message: "شما یک معمار الگوریتم هستید!",
        reason: "توانایی بالا در حل مسائل پیچیده و مدیریت داده."
    },
    ai: {
        title: "هوش مصنوعی و دیتا",
        percent: "70%",
        duration: "10 ماه",
        description: "شما عاشق تحلیل داده و کشف الگوها هستید.",
        message: "شما یک کاوشگر داده هستید!",
        reason: "تمرکز روی یادگیری ماشین و تحلیل داده."
    }
};

function openAssessmentModal() {
    const modal = document.getElementById('assessmentModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
        currentQuestion = 0;
        selectedOptions = [];
        showQuestion();
    }
}
function openContactModal(event) {
    if (event) event.preventDefault();
    
    const modal = document.querySelector('.contact-overlay');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error("مودال پیدا نشد!");
    }
}

function closeContactModal() {
    const modal = document.querySelector('.contact-overlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showQuestion() {
    const q = assessmentData.questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    if (!container) return;

    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const percent = ((currentQuestion + 1) / assessmentData.questions.length) * 100;
    
    if(progressFill) progressFill.style.width = percent + '%';
    if(progressText) progressText.textContent = `سوال ${currentQuestion + 1} از ${assessmentData.questions.length}`;

    container.innerHTML = `
        <h3 class="question-title" style="color:#fff; margin:20px 0;">${q.question}</h3>
        <div class="options-grid">
            ${q.options.map((opt, i) => `
                <div class="option-card ${selectedOptions[currentQuestion] === i ? 'selected' : ''}" onclick="selectOption(${i})">
                    <span class="option-text">${opt.text}</span>
                </div>
            `).join('')}
        </div>
    `;

    
    const prevBtn = document.getElementById('prevBtn');
    if(prevBtn) prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    
    
    const nextBtn = document.getElementById('nextBtn');
    if(nextBtn) nextBtn.textContent = currentQuestion === assessmentData.questions.length - 1 ? "مشاهده نتیجه" : "سوال بعدی";
}


function handleResultAction(targetId) {
    closeResultModal();
    setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

function closeResultModal() {
    document.getElementById('resultModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
let currentQuestion = 0; 
let userScores = { frontend: 0, backend: 0, ai: 0 };
let selectedOptions = [];

 

function selectOption(index) {
    selectedOptions[currentQuestion] = index;
    const options = document.querySelectorAll('.option-card');
    options.forEach((opt, i) => {
        opt.classList.toggle('selected', i === index);
    });
}

function nextQuestion() {
    
    if (selectedOptions[currentQuestion] === undefined) {
        alert("لطفاً یک گزینه را انتخاب کنید!");
        return;
    }

    
    if (currentQuestion < assessmentData.questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } 
    
    else {
        calculateResults();
    }
}

function calculateResults() {
    
    userScores = { frontend: 0, backend: 0, ai: 0 };

    selectedOptions.forEach((optionIndex, qIndex) => {
        const scores = assessmentData.questions[qIndex].options[optionIndex].score;
        userScores.frontend += scores.frontend;
        userScores.backend += scores.backend;
        userScores.ai += scores.ai;
    });

    
    let resultKey = 'frontend';
    let maxScore = -1;
function closeAssessmentModal() {
    const modal = document.getElementById('assessmentModal');
    if (modal) {
        modal.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}
    for (const key in userScores) {
        if (userScores[key] > maxScore) {
            maxScore = userScores[key];
            resultKey = key;
        } 
        
        else if (userScores[key] === maxScore) {
            
            const lastChoice = assessmentData.questions[4].options[selectedOptions[4]].score;
            if(lastChoice[key] > lastChoice[resultKey]) resultKey = key;
        }
    }

    closeAssessmentModal();
    showFinalResult(resultKey);
}
function handleResultAction(targetId) {
    closeResultModal();
    setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}
function filterVideos(resultKey) {
    document.querySelectorAll('.video-card').forEach(card => {
        const tag = card.querySelector('.video-tag')?.innerText.toLowerCase() || "";
        
        let isMatch = false;
        if (resultKey === 'frontend' && tag.includes('frontend')) isMatch = true;
        if (resultKey === 'backend' && tag.includes('backend')) isMatch = true;
        if (resultKey === 'ai' && tag.includes('ai')) isMatch = true;

        
        if (isMatch) {
            card.classList.remove('video-hidden');
        } else {
            card.classList.add('video-hidden');
        }
    });
}

function showFinalResult(resultKey) {
    const result = resultMap[resultKey];
    
    
    const assessModal = document.getElementById('assessmentModal');
    const resModal = document.getElementById('resultModal');
    
    if(assessModal) assessModal.style.display = 'none';
    if(resModal) resModal.style.display = 'flex';
    
    document.body.style.overflow = 'hidden';

    
    document.getElementById('result-title').innerText = result.title;
    document.getElementById('result-percent').innerText = result.percent;
    document.getElementById('result-duration').innerText = result.duration;
    document.getElementById('result-description').innerText = result.description;

    document.getElementById('analysis-container').innerHTML = `
        <div class="analysis-card" style="margin-top:15px; padding:10px; background:rgba(139,92,246,0.1); border-radius:8px;">
            <h3 style="color:#fff; font-size:1rem;">${result.message}</h3>
            <p style="color:#bbb; font-size:0.9rem;">${result.reason}</p>
        </div>
    `;

    filterVideos(resultKey);
    document.querySelectorAll('.watch-btn').forEach(btn => {
        btn.classList.remove('locked');
        btn.style.background = "var(--primary-purple)";
        btn.innerHTML = "تماشا کن <i class='fas fa-play'></i>";
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) el.classList.add('active');
        else el.classList.remove('active');
    });
});


function initUserSystem() {
    const userData = JSON.parse(localStorage.getItem('bitzone_user'));
    const statusArea = document.getElementById('user-status-area');
    
    if (userData) {
        if(statusArea) {
            statusArea.innerHTML = `
                <div class="user-profile-nav" style="position: relative;">
                    <div class="profile-trigger" onclick="toggleUserMenu()" style="cursor:pointer; color:#fff; background:rgba(139,92,246,0.2); padding:8px 18px; border-radius:50px; border:1px solid #8b5cf6; display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
                        <span id="nav-username">${userData.username}</span>
                        <i class="fas fa-user-circle" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="user-dropdown" style="display:none; position:absolute; top:50px; left:0; background:#1a1b2e; border:1px solid #8b5cf6; padding:15px; border-radius:12px; min-width:200px; z-index:1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="text-align:center; margin-bottom:10px;">
                            <i class="fas fa-user-shield" style="font-size: 2rem; color:#8b5cf6;"></i>
                            <p style="margin-top:5px; font-weight:bold; color:white;">${userData.username}</p>
                        </div>
                        <hr style="border:0.5px solid #2d2d42; margin:10px 0;">
                        <a href="profile.html" style="display:block; color:#fff; text-decoration:none; padding:8px 0; font-size:0.9rem;">
                            <i class="fas fa-user-edit"></i> ویرایش مشخصات
                        </a>
                        <div onclick="logoutNow()" style="display:block; color:#ff4d4d; cursor:pointer; padding:8px 0; font-size:0.9rem;">
                            <i class="fas fa-sign-out-alt"></i> خروج از حساب
                        </div>
                    </div>
                </div>
            `;
        }

        document.querySelectorAll('.watch-btn').forEach(btn => {
            btn.classList.remove('locked');
            btn.style.background = "#8b5cf6";
            btn.style.cursor = "pointer";
            btn.innerHTML = "تماشا کن <i class='fas fa-play'></i>";
        });

    } else {
        document.querySelectorAll('.watch-btn').forEach(btn => {
            btn.classList.add('locked');
            btn.style.background = "#333";
            btn.style.cursor = "not-allowed";
            btn.innerHTML = "قفل است <i class='fas fa-lock'></i>";
        });
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function logoutNow() {
    localStorage.removeItem('bitzone_user');
    window.location.href = 'index.html';
}

function goToCourse(pageUrl) {
    const userData = localStorage.getItem('bitzone_user');
    if (userData) window.location.href = pageUrl;
    else {
        alert("برای تماشای دوره ابتدا باید وارد حساب کاربری خود شوید.");
        window.location.href = 'login.html';
    }
}


function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLight = savedTheme === 'light';
    document.body.classList.toggle('light-mode', isLight);
    const checkbox = document.getElementById('themeCheckbox');
    if(checkbox) checkbox.checked = isLight;
    updateThemeIcons(isLight);
}

function handleThemeChange() {
    const isLight = document.getElementById('themeCheckbox').checked;
    document.body.classList.toggle('light-mode', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcons(isLight);
}

function updateThemeIcons(isLight) {
    const moon = document.getElementById('moonIcon');
    const sun = document.getElementById('sunIcon');
    if(moon && sun) {
        moon.style.display = isLight ? 'none' : 'inline-block';
        sun.style.display = isLight ? 'inline-block' : 'none';
    }
}


function initMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero-section');
    canvas.width = window.innerWidth;
    canvas.height = hero ? hero.offsetHeight : 400;

    const chars = "01";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = document.body.classList.contains('light-mode') ? "rgba(243, 244, 246, 0.1)" : "rgba(5, 5, 10, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#8b5cf6";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fontSize, drops[i]*fontSize);
            if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);
}

function runTypingAnimation() {
    const codeContainer = document.querySelector('.code-visual');
    if (!codeContainer) return;
    const lines = [
        '<span class="code-keyword">const</span> user = <span class="code-function">"Future_Dev"</span>;',
        '<span class="code-keyword">if</span> (isCodingWithBitZone) {',
        '  console.<span class="code-function">log</span>(<span class="code-function">"Success!"</span>);',
        '}'
    ];
    codeContainer.innerHTML = '';
    lines.forEach((line, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'code-line';
            div.innerHTML = line;
            codeContainer.appendChild(div);
        }, index * 1000);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initUserSystem();
    initMatrixEffect();
    runTypingAnimation();
    showQuestion(); 

    const themeTgl = document.getElementById('themeCheckbox');
    if(themeTgl) themeTgl.addEventListener('change', handleThemeChange);

    window.onclick = (e) => {
        if (!e.target.closest('.profile-trigger')) {
const m = document.getElementById('user-dropdown');
            if(m) m.style.display = 'none';
        }
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown && !e.target.closest('.user-profile-nav')) dropdown.style.display = 'none';
    };
});
function closeResultModal() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.style.display = 'none';
    }

    
    document.body.style.overflow = 'auto';
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto'; 
    } else {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden'; 
    }
}


document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});


function checkMobile() {
    const isMobile = window.innerWidth <= 768;
    const html = document.documentElement;
    
    if (isMobile) {
        html.classList.add('mobile-view');
        
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.animation = 'none';
        });
    } else {
        html.classList.remove('mobile-view');
    }
}


window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);


let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
const roadmapData = {
    frontend: {
        title: "نقشه راه فرانت‌اِند",
        steps: ["HTML5 & CSS3", "JavaScript Modern", "Git & GitHub", "React.js / Vue.js", "Tailwind CSS"]
    },
    backend: {
        title: "نقشه راه بک‌اِند",
        steps: ["Python Fundamentals", "Django / Node.js", "SQL & Databases", "RESTful APIs", "Docker"]
    },
    ai: {
        title: "نقشه راه هوش مصنوعی",
        steps: ["Mathematics", "Python for Data Science", "Machine Learning", "Deep Learning", "TensorFlow"]
    }
};

function selectPath(pathKey) {
    const data = roadmapData[pathKey];
    const display = document.getElementById('roadmap-display');
    const stepsContainer = document.getElementById('roadmap-steps');
    const title = document.getElementById('roadmap-title');

    title.innerText = data.title;
    stepsContainer.innerHTML = ''; 

    data.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'roadmap-step';
        stepDiv.innerHTML = `
            <div class="step-circle">${index + 1}</div>
            <div class="step-text">${step}</div>
        `;
        stepsContainer.appendChild(stepDiv);
    });

    display.style.display = 'block';
    display.scrollIntoView({ behavior: 'smooth' }); 
}

function toggleSurvey() {
    const surveyModal = document.getElementById('surveyModal');
    if (!surveyModal) return;

    if (surveyModal.style.display === 'none' || surveyModal.style.display === '') {
        surveyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    } else {
        surveyModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}


let selectedRating = 0;
function submitVote(rating) {
    selectedRating = rating;
    
    alert("امتیاز " + rating + " ثبت شد. لطفاً اگر نظری دارید بنویسید و ثبت نهایی را بزنید.");
}


function finishSurvey() {
    const comment = document.getElementById('surveyComment').value;
    
    if (selectedRating === 0) {
        alert("لطفاً ابتدا یکی از ایموجی‌ها را برای امتیازدهی انتخاب کنید.");
        return;
    }

    
    console.log("Survey Result:", { rating: selectedRating, comment: comment });
    
    alert("ممنون! نظر شما با موفقیت ثبت شد.");
    toggleSurvey(); 
}
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');
    const wave = document.getElementById('wave');

    if (music.paused) {
        music.play();
        icon.classList.replace('fa-play', 'fa-pause'); 
        wave.classList.add('active'); 
    } else {
        music.pause();
        icon.classList.replace('fa-pause', 'fa-play'); 
        wave.classList.remove('active'); 
    }
}