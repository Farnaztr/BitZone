
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const introLayer = document.getElementById('bit-intro');
const introText = document.getElementById('intro-text');
const statusText = document.getElementById('status-text');
const bar = document.getElementById('progress-bar'); 
const card = document.getElementById('login-card');
let particles = [];
let mouse = { x: null, y: null, radius: 100 };
window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const userInput = document.getElementById('user-identifier').value;
    const userPass = document.getElementById('user-password').value;
    
    
    let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
    
    
    const existingUser = allUsers.find(u => u.username === userInput);

    if (existingUser) {
        
        if (existingUser.password === userPass) {
            
            localStorage.setItem('bitzone_user', JSON.stringify(existingUser));
            const btn = document.querySelector('.submit-btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال تایید...';
            
            setTimeout(() => { window.location.href = 'index.html'; }, 600);
        } else {
            alert("خطا: رمز عبور اشتباه است!");
        }
    } else {
        
        alert("این نام کاربری وجود ندارد. لطفاً ابتدا ثبت‌نام کنید.");
    }
});



const userData = JSON.parse(localStorage.getItem('bitzone_user'));

if (userData) {
    console.log("خوش آمدی " + userData.username);
    
    window.location.href = 'index.html';
} else {
    
    console.log("لطفا لاگین کنید.");
}

function startIntro() {
    
    const columns = Math.floor(window.innerWidth / 25);
    for (let i = 0; i < columns; i++) {
        setTimeout(() => {
            const col = document.createElement('div');
            col.className = 'matrix-column';
            col.style.left = (i * 25) + 'px';
            col.style.animationDuration = (Math.random() * 2 + 1) + 's';
            col.style.opacity = Math.random() * 0.5;
            
            let content = "";
            for(let j=0; j<25; j++) content += Math.round(Math.random()) + "<br>";
            col.innerHTML = content;
            
            introLayer.appendChild(col);
        }, i * 40);
    }

    
    setTimeout(() => {
        if(bar) bar.style.width = '100%';
    }, 100);

    const messages = [
        "INITIALIZING BIT_STREAM...",
        "DECRYPTING SECURE_ZONE...",
        "BYPASSING FIREWALLS...",
        "ACCESS GRANTED. WELCOME."
    ];
    
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
        statusText.innerText = messages[msgIndex];
        msgIndex++;
        if(msgIndex >= messages.length) clearInterval(msgInterval);
    }, 900);

    
    setTimeout(() => {
        introText.style.display = 'block';
        introText.animate([
            { transform: 'scale(1.3)', filter: 'blur(15px)', opacity: 0 },
            { transform: 'scale(1)', filter: 'blur(0)', opacity: 1 }
        ], { duration: 400, easing: 'ease-out' });
        introText.style.opacity = '1';
    }, 2000);

    
    setTimeout(() => {
        introLayer.style.filter = "hue-rotate(45deg) brightness(1.5)";
        introLayer.style.opacity = '0';
        introLayer.style.transform = "scale(1.2)";
        
        setTimeout(() => {
            introLayer.remove();
            if(card) card.classList.add('show');
        }, 800);
    }, 4800);
}


class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = Math.random() * 0.8 - 0.4;
        this.vy = Math.random() * 0.8 - 0.4;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > canvas.height || this.y < 0) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = '#bc13fe'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    let particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < Math.min(particleCount, 120); i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(188, 19, 254, ${1 - dist/150})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
}


window.onload = () => {
    init();
    animate();
    startIntro();
};

window.onresize = () => {
    init();
};



function openRegisterModal(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('registerModal');
    if(modal) modal.style.display = 'flex';
}


function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if(modal) modal.style.display = 'none';
}


function confirmRegistration() {
    const u = document.getElementById('usernameInput').value;
    const p = "1234"; 

    if (!u || u.trim() === "") {
        alert("لطفاً نام کاربری را وارد کنید.");
        return;
    }

    let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
    
    
    if (allUsers.some(user => user.username === u)) {
        alert("این نام کاربری قبلاً ثبت شده است.");
    } else {
        allUsers.push({ username: u, password: p });
        localStorage.setItem('bitzone_users_list', JSON.stringify(allUsers));
        alert("ثبت‌نام موفقیت‌آمیز بود!\nنام کاربری: " + u + "\nرمز عبور پیش‌فرض: 1234");
        closeRegisterModal();
    }
}


if (document.getElementById('forgot-btn')) {
    document.getElementById('forgot-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const userInput = document.getElementById('user-identifier').value;
        const msgBox = document.getElementById('forgot-message');
        
        if (!userInput || userInput.trim() === "") {
            alert("لطفاً ابتدا نام کاربری خود را در کادر بالا وارد کنید.");
            return;
        }

        let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
        const foundUser = allUsers.find(user => user.username === userInput);

        if (msgBox) {
            msgBox.style.display = 'block';
            if (foundUser) {
                msgBox.style.color = "#bc13fe";
                msgBox.innerText = "کلید دسترسی شما: " + foundUser.password;
            } else {
                msgBox.style.color = "#ff4d4d";
                msgBox.innerText = "کاربری با این مشخصات یافت نشد.";
            }
        }
    });
}



window.openRegisterModal = function(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('registerModal');
    if(modal) {
        modal.style.display = 'flex';
    } else {
        alert("خطا: مودال ثبت‌نام در HTML پیدا نشد!");
    }
};


window.closeRegisterModal = function() {
    const modal = document.getElementById('registerModal');
    if(modal) modal.style.display = 'none';
};




window.processRegistration = function() {
    const u = document.getElementById('regUser').value.trim();
    const p = document.getElementById('regPass').value.trim();
    const a = document.getElementById('regAnswer').value.trim();

    if (!u || !p || !a) {
        alert("تمام فیلدها (نام، رمز و پاسخ سوال امنیتی) الزامی هستند!");
        return;
    }

    let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
    
    if (allUsers.some(user => user.username === u)) {
        alert("این نام کاربری از قبل در سیستم وجود دارد.");
        return;
    }

    
    allUsers.push({ 
        username: u, 
        password: p, 
        securityAnswer: a.toLowerCase() 
    });
    
    localStorage.setItem('bitzone_users_list', JSON.stringify(allUsers));
    alert("حساب شما با موفقیت ایجاد شد. حالا می‌توانید وارد شوید.");
    window.closeRegisterModal();
};


if (document.getElementById('forgot-btn')) {
    document.getElementById('forgot-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const u = document.getElementById('user-identifier').value.trim();
        
        if (!u) {
            alert("ابتدا نام کاربری خود را وارد کنید تا سیستم هویت شما را شناسایی کند.");
            return;
        }

        let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
        const user = allUsers.find(user => user.username === u);

        if (!user) {
            alert("کاربری با این نام یافت نشد.");
            return;
        }

        
        const answer = prompt("مرحله امنیتی: نام اولین معلم شما چیست؟");
        
        if (answer && answer.toLowerCase() === user.securityAnswer) {
            alert("هویت تایید شد! رمز عبور شما: " + user.password);
        } else {
            alert("پاسخ اشتباه است! دسترسی مسدود شد.");
        }
    });
}
window.showMessage = function(text, type = 'info') {
    
    const oldAlert = document.querySelector('.custom-alert');
    if (oldAlert) oldAlert.remove();

    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert alert-${type}`;
    alertBox.innerHTML = `<span>${text}</span>`;
    document.body.appendChild(alertBox);

    
    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateX(100%)';
        alertBox.style.transition = '0.4s';
        setTimeout(() => alertBox.remove(), 400);
    }, 3000);
};


setTimeout(() => {
    const fBtn = document.getElementById('forgot-btn');
    const msgBox = document.getElementById('forgot-message');

    if (fBtn) {
        
        const newBtn = fBtn.cloneNode(true);
        fBtn.parentNode.replaceChild(newBtn, fBtn);

        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            
            const u = document.getElementById('user-identifier').value.trim();
            
            
            if (!u) {
                alert("خطا: ابتدا نام کاربری خود را وارد کنید.");
                return; 
            }

            
            let allUsers = JSON.parse(localStorage.getItem('bitzone_users_list')) || [];
            const user = allUsers.find(user => user.username === u);

            if (!user) {
                alert("کاربری با نام '" + u + "' در سیستم یافت نشد.");
                if(msgBox) msgBox.style.display = 'none';
                return;
            }

            
            const answer = prompt("تایید هویت امنیتی:\nنام اولین معلم شما چیست؟");
            
            
            if (answer && user.securityAnswer && answer.toLowerCase() === user.securityAnswer.toLowerCase()) {
                alert("هویت شما تایید شد!");
                if(msgBox) {
                    msgBox.style.display = 'block';
                    msgBox.style.color = "#bc13fe";
                    msgBox.innerHTML = `🔑 رمز عبور شما: <strong style="color:#fff">${user.password}</strong>`;
                }
            } else if (answer === null) {
                
            } else {
                alert("پاسخ اشتباه است! اجازه دسترسی به رمز صادر نشد.");
                if(msgBox) msgBox.style.display = 'none';
            }
        });
    }
}, 5000); 

