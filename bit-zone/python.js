// python.js - فایل جاوا اسکریپت صفحه پایتون

// === تابع شروع (DOM Content Loaded) ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Python Pro Loaded!');
    
    // مقداردهی اولیه
    initializeTheme();
    initializeTabs();
    initializeVideo();
    initializeForm();
    initializeSkillLevels();
    initializeRecommendations();
    
    // لود ویدیوی اصلی
    loadMainVideo();
});

// === مدیریت تم (Light/Dark Mode) ===
function initializeTheme() {
    const themeCheckbox = document.querySelector('#checkbox');
    
    // چک کردن تم ذخیره شده در localStorage
    if (localStorage.getItem('python-theme') === 'light') {
        document.body.classList.add('light-mode');
        themeCheckbox.checked = true;
        console.log('🌞 تم روشن فعال شد');
    } else {
        console.log('🌙 تم تاریک فعال شد');
    }
    
    // گوش دادن به تغییرات سوئیچ
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('python-theme', 'light');
            console.log('🌞 تغییر به تم روشن');
            
            // نمایش پیام
            showFeedback('تم روشن فعال شد', 'success');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('python-theme', 'dark');
            console.log('🌙 تغییر به تم تاریک');
            
            // نمایش پیام
            showFeedback('تم تاریک فعال شد', 'success');
        }
        
        // افزودن انیمیشن تغییر تم
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
}

// === مدیریت تب‌ها ===
function initializeTabs() {
    // فعال کردن تب اول به طور پیش‌فرض
    const firstTabBtn = document.querySelector('.tab-btn');
    const firstTabContent = document.querySelector('.tab-item');
    
    if (firstTabBtn && firstTabContent) {
        firstTabBtn.classList.add('active');
        firstTabContent.classList.add('active');
    }
}

function openTab(evt, tabName) {
    // مخفی کردن همه تب‌ها
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('active');
    });
    
    // غیرفعال کردن همه دکمه‌ها
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // نمایش تب انتخاب شده
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        setTimeout(() => {
            selectedTab.classList.add('active');
        }, 10);
    }
    
    // فعال کردن دکمه انتخاب شده
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
    
    // ثبت لاگ
    console.log(`📂 تب "${tabName}" باز شد`);
    
    // اگر تب کدها بود، هایلایت کد را اعمال کن
    if (tabName === 'code') {
        setTimeout(() => {
            highlightPythonCode();
        }, 100);
    }
}

// === مدیریت ویدیو ===
function initializeVideo() {
    const video = document.getElementById('pythonVideo');
    
    if (video) {
        // تنظیم تایمر ویدیو
        video.addEventListener('timeupdate', updateVideoTimer);
        
        // نمایش کیفیت ویدیو
        displayVideoQuality();
        
        // رویداد پایان ویدیو
        video.addEventListener('ended', function() {
            console.log('🎬 ویدیو به پایان رسید');
            showFeedback('ویدیو با موفقیت تماشا شد! آماده یادگیری هستید؟', 'success');
            
            // پیشنهاد ویدیوی بعدی
            setTimeout(() => {
                suggestNextVideo();
            }, 2000);
        });
    }
}

function loadMainVideo() {
    const video = document.getElementById('pythonVideo');
    const poster = 'images/python-poster.jpg';
    const videoSource = 'videos/python-data-analysis.mp4';
    
    if (video) {
        // ایجاد افکت لودینگ
        const videoFrame = document.querySelector('.video-frame');
        if (videoFrame) {
            videoFrame.classList.add('loading');
            setTimeout(() => {
                videoFrame.classList.remove('loading');
            }, 1000);
        }
        
        // لود ویدیو
        video.poster = poster;
        const source = video.querySelector('source');
        if (source) {
            source.src = videoSource;
            video.load();
        }
        
        console.log(`🎥 ویدیو در حال لود: ${videoSource}`);
    }
}

function updateVideoTimer() {
    const video = document.getElementById('pythonVideo');
    const timerElement = document.querySelector('.video-timer');
    
    if (video && timerElement) {
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timerElement.textContent = `${currentTime} / ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function displayVideoQuality() {
    const qualityBadge = document.querySelector('.quality-badge');
    if (qualityBadge) {
        // شبیه‌سازی تشخیص کیفیت
        const qualities = ['4K', '1080p', '720p', '480p'];
        const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
        qualityBadge.textContent = randomQuality;
    }
}

// === مدیریت کدها ===
function highlightPythonCode() {
    const codeElement = document.getElementById('projectCode');
    if (codeElement) {
        // افزودن کلاس هایلایت
        codeElement.classList.add('python-highlight');
        
        // هایلایت سینتکس ساده
        const code = codeElement.textContent;
        const highlighted = highlightPythonSyntax(code);
        codeElement.innerHTML = highlighted;
        
        console.log('✨ هایلایت کد پایتون اعمال شد');
    }
}

function highlightPythonSyntax(code) {
    // رنگ‌های هایلایت
    const colors = {
        keyword: '#ff6b6b',      // قرمز برای کلمات کلیدی
        function: '#51cf66',     // سبز برای توابع
        string: '#f59e0b',       // نارنجی برای رشته‌ها
        comment: '#94a3b8',      // خاکستری برای کامنت
        number: '#8b5cf6',       // بنفش برای اعداد
        builtin: '#22d3ee'       // آبی برای توابع داخلی
    };
    
    // الگوهای هایلایت
    const patterns = [
        { pattern: /(#.*$)/gm, color: colors.comment },                          // کامنت‌ها
        { pattern: /\b(def|class|import|from|as|if|else|elif|for|while|return|try|except|finally|with|in|is|and|or|not)\b/g, color: colors.keyword }, // کلمات کلیدی
        { pattern: /\b(pd|np|plt|df|print|len|range|str|int|float|list|dict|set|tuple)\b/g, color: colors.builtin }, // توابع داخلی
        { pattern: /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g, color: colors.function }, // توابع تعریف شده
        { pattern: /(['"])(.*?)\1/g, color: colors.string },                     // رشته‌ها
        { pattern: /\b(\d+\.?\d*)\b/g, color: colors.number },                   // اعداد
    ];
    
    let highlighted = code;
    
    patterns.forEach(pattern => {
        highlighted = highlighted.replace(pattern.pattern, 
            `<span style="color: ${pattern.color}">$&</span>`);
    });
    
    return highlighted;
}

function copyCode() {
    const codeElement = document.getElementById('projectCode');
    const copyBtn = document.querySelector('.copy-btn');
    
    if (codeElement && copyBtn) {
        // حذف تگ‌های HTML برای کپی خالص
        const plainText = codeElement.textContent;
        
        navigator.clipboard.writeText(plainText).then(() => {
            // تغییر دکمه به حالت موفقیت
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> کپی شد!';
            copyBtn.style.background = '#10b981';
            copyBtn.style.transform = 'scale(1.05)';
            
            // نمایش پیام
            showFeedback('کد با موفقیت کپی شد! 🎉', 'success');
            console.log('📋 کد کپی شد');
            
            // بازگرداندن دکمه به حالت اولیه
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '';
                copyBtn.style.transform = '';
            }, 2000);
            
        }).catch(err => {
            console.error('خطا در کپی کردن:', err);
            showFeedback('خطا در کپی کردن کد', 'error');
        });
    }
}

function expandCode() {
    const codeWindow = document.querySelector('.code-window');
    const viewMoreLink = document.querySelector('.view-more-github');
    
    if (codeWindow) {
        // تغییر ارتفاع کد
        if (codeWindow.style.maxHeight === 'none') {
            codeWindow.style.maxHeight = '300px';
            viewMoreLink.innerHTML = '<i class="fas fa-expand-alt"></i> نمایش کامل کد';
            console.log('📦 کد کوچک شد');
        } else {
            codeWindow.style.maxHeight = 'none';
            viewMoreLink.innerHTML = '<i class="fas fa-compress-alt"></i> کوچک کردن کد';
            console.log('📄 کد کامل نمایش داده شد');
        }
    }
}

// === مدیریت فرم انجمن ===
function initializeForm() {
    const form = document.getElementById('qaForm');
    const qaList = document.getElementById('qaList');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('qaName');
            const textInput = document.getElementById('qaText');
            
            const name = nameInput.value.trim() || 'کاربر ناشناس';
            const text = textInput.value.trim();
            
            if (!text) {
                showFeedback('لطفاً سوال خود را وارد کنید', 'error');
                return;
            }
            
            // ایجاد کارت سوال جدید
            const questionCard = createQuestionCard(name, text);
            qaList.prepend(questionCard);
            
            // نمایش پیام موفقیت
            showFeedback('سوال شما با موفقیت ارسال شد! پاسخ به زودی داده خواهد شد.', 'success');
            
            // ریست فرم
            form.reset();
            
            // ثبت در کنسول
            console.log(`💬 سوال جدید: "${text.substring(0, 50)}..." از ${name}`);
            
            // شبیه‌سازی پاسخ ربات
            setTimeout(() => {
                simulateBotReply(name, text);
            }, 3000);
        });
    }
    
    // بارگذاری سوالات نمونه
    loadSampleQuestions();
}

function createQuestionCard(name, text, isReply = false) {
    const card = document.createElement('div');
    card.className = `qa-card ${isReply ? 'qa-reply' : ''}`;
    card.style.cssText = `
        background: ${isReply ? 'rgba(34, 211, 238, 0.1)' : 'rgba(255, 255, 255, 0.03)'};
        padding: 1.2rem;
        border-radius: 12px;
        margin-bottom: 1rem;
        border-right: 4px solid ${isReply ? '#22d3ee' : '#ffd43b'};
        transition: all 0.3s ease;
        animation: fadeInUp 0.4s ease;
    `;
    
    const time = new Date().toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    card.innerHTML = `
        <div class="qa-header">
            <div class="qa-user">
                <i class="fas fa-${isReply ? 'robot' : 'user'}"></i>
                <span class="qa-name">${name}</span>
                ${isReply ? '<span class="qa-badge">راهنما</span>' : ''}
            </div>
            <span class="qa-time">${time}</span>
        </div>
        <div class="qa-text">${text}</div>
        <div class="qa-actions">
            <button class="qa-like-btn" onclick="likeQuestion(this)">
                <i class="far fa-thumbs-up"></i> <span>0</span>
            </button>
            ${!isReply ? '<button class="qa-reply-btn" onclick="showReplyBox(this)"><i class="fas fa-reply"></i> پاسخ</button>' : ''}
        </div>
    `;
    
    return card;
}

function loadSampleQuestions() {
    const qaList = document.getElementById('qaList');
    if (!qaList) return;
    
    const sampleQuestions = [
        {
            name: 'مهندس علی',
            text: 'چطور می‌تونم با Pandas داده‌های CSV رو clean کنم و missing values رو handle کنم؟',
            likes: 12
        },
        {
            name: 'فاطمه',
            text: 'تفاوت بین NumPy array و Python list چیه؟ کدوم سریعتره؟',
            likes: 8
        },
        {
            name: 'محمد',
            text: 'برای ساخت وب اپلیکیشن با پایتون، Django بهتره یا Flask؟',
            likes: 15
        }
    ];
    
    sampleQuestions.forEach(q => {
        const card = createQuestionCard(q.name, q.text);
        
        // تنظیم لایک‌ها
        const likeBtn = card.querySelector('.qa-like-btn');
        if (likeBtn) {
            likeBtn.querySelector('span').textContent = q.likes;
        }
        
        qaList.appendChild(card);
    });
}

function likeQuestion(button) {
    const likeCount = button.querySelector('span');
    let count = parseInt(likeCount.textContent);
    
    // افزودن انیمیشن
    button.classList.add('liked');
    setTimeout(() => {
        button.classList.remove('liked');
    }, 300);
    
    // افزایش تعداد لایک
    count++;
    likeCount.textContent = count;
    
    // تغییر آیکون
    const icon = button.querySelector('i');
    icon.classList.remove('far');
    icon.classList.add('fas');
    
    console.log(`👍 لایک شد: ${count} لایک`);
}

function showReplyBox(button) {
    const card = button.closest('.qa-card');
    const existingReplyBox = card.querySelector('.reply-box');
    
    if (existingReplyBox) {
        existingReplyBox.remove();
        return;
    }
    
    const replyBox = document.createElement('div');
    replyBox.className = 'reply-box';
    replyBox.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
    `;
    
    replyBox.innerHTML = `
        <textarea class="reply-textarea" placeholder="پاسخ خود را بنویسید..." rows="2"></textarea>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button class="qa-submit-btn" onclick="submitReply(this)" style="padding: 8px 16px; font-size: 0.9rem;">
                <i class="fas fa-paper-plane"></i> ارسال پاسخ
            </button>
            <button class="cancel-btn" onclick="this.closest('.reply-box').remove()" style="background: transparent; border: 1px solid #64748b; color: #64748b; padding: 8px 16px; border-radius: 8px;">
                انصراف
            </button>
        </div>
    `;
    
    card.appendChild(replyBox);
}

function submitReply(button) {
    const replyBox = button.closest('.reply-box');
    const textarea = replyBox.querySelector('.reply-textarea');
    const text = textarea.value.trim();
    
    if (!text) {
        showFeedback('لطفاً متن پاسخ را وارد کنید', 'error');
        return;
    }
    
    const card = replyBox.closest('.qa-card');
    const replyCard = createQuestionCard('شما', text, false);
    replyCard.style.marginTop = '0.5rem';
    replyCard.style.marginRight = '2rem';
    
    replyBox.parentNode.insertBefore(replyCard, replyBox.nextSibling);
    replyBox.remove();
    
    showFeedback('پاسخ شما با موفقیت ارسال شد', 'success');
    console.log('💭 پاسخ ارسال شد');
}

function simulateBotReply(userName, question) {
    const qaList = document.getElementById('qaList');
    
    // پاسخ‌های از پیش تعیین شده
    const responses = [
        `سلام ${userName}! سوال خوبی پرسیدید. در پایتون می‌تونید از کتابخانه Pandas استفاده کنید. کد نمونه:\n\nimport pandas as pd\ndf = df.dropna() # حذف missing values\ndf = df.fillna(0) # پر کردن با صفر`,
        `برای این سوال، پیشنهاد می‌کنم مستندات رسمی پایتون رو چک کنید. معمولاً NumPy برای پردازش عددی سریعتره!`,
        `هر دو Django و Flask عالی هستند. Django برای پروژه‌های بزرگ و ساختاریافته، Flask برای میکروسرویس‌ها و پروژه‌های کوچیک مناسب‌تره.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const botCard = createQuestionCard('Python Assistant', randomResponse, true);
    
    qaList.prepend(botCard);
    
    console.log('🤖 پاسخ ربات ارسال شد');
    
    // اعلان
    showNotification('راهنما پاسخ داد!', 'پاسخ پایتون اسیستانت برای سوال شما آماده است.', 'info');
}

// === مدیریت سطوح مهارت ===
function initializeSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        level.addEventListener('click', function() {
            // حذف انتخاب قبلی
            skillLevels.forEach(l => l.classList.remove('selected'));
            
            // انتخاب سطح جدید
            this.classList.add('selected');
            
            const levelText = this.querySelector('h4').textContent;
            console.log(`🎯 سطح مهارت انتخاب شد: ${levelText}`);
        });
    });
}

function selectSkill(level) {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(el => el.classList.remove('selected'));
    
    const selectedLevel = document.querySelector(`.skill-level[onclick*="${level}"]`);
    if (selectedLevel) {
        selectedLevel.classList.add('selected');
        
        // نمایش سطح انتخاب شده
        const levelNames = {
            'beginner': 'مبتدی',
            'intermediate': 'متوسط',
            'advanced': 'پیشرفته',
            'expert': 'حرفه‌ای'
        };
        
        const levelName = levelNames[level] || level;
        showFeedback(`سطح "${levelName}" انتخاب شد`, 'success');
    }
}

function submitSkillPoll() {
    const selectedSkill = document.querySelector('.skill-level.selected');
    const pollMsg = document.getElementById('poll-msg');
    
    if (!selectedSkill) {
        pollMsg.textContent = 'لطفاً سطح مهارت خود را انتخاب کنید';
        pollMsg.className = 'feedback-msg msg-error';
        pollMsg.style.display = 'block';
        return;
    }
    
    const skillName = selectedSkill.querySelector('h4').textContent;
    const skillDesc = selectedSkill.querySelector('p').textContent;
    
    // ذخیره در localStorage
    localStorage.setItem('python-skill-level', skillName);
    localStorage.setItem('python-skill-selected', 'true');
    
    // نمایش پیام موفقیت
    pollMsg.innerHTML = `
        <i class="fas fa-trophy"></i>
        <strong>تبریک! سطح مهارت "${skillName}" ثبت شد</strong>
        <p style="margin-top: 5px; font-size: 0.9rem;">${skillDesc}</p>
        <p style="margin-top: 10px; color: #94a3b8; font-size: 0.8rem;">
            این اطلاعات برای شخصی‌سازی محتوا استفاده می‌شود
        </p>
    `;
    pollMsg.className = 'feedback-msg msg-success';
    pollMsg.style.display = 'block';
    
    console.log(`🏆 سطح مهارت ثبت شد: ${skillName}`);
    
    // پیشنهاد دوره بر اساس سطح
    setTimeout(() => {
        suggestCourseBasedOnLevel(skillName);
    }, 1500);
}

function suggestCourseBasedOnLevel(level) {
    const courses = {
        'مبتدی': 'پایتون مقدماتی - از صفر تا صد',
        'متوسط': 'تحلیل داده با Pandas و NumPy',
        'پیشرفته': 'یادگیری ماشین با Scikit-learn',
        'حرفه‌ای': 'توسعه فریمورک‌های پایتون'
    };
    
    const course = courses[level];
    if (course) {
        showNotification(
            'پیشنهاد دوره',
            `با توجه به سطح ${level}، دوره "${course}" به شما پیشنهاد می‌شود`,
            'info'
        );
    }
}

// === مدیریت ویدیوهای پیشنهادی ===
function initializeRecommendations() {
    const recCards = document.querySelectorAll('.rec-card');
    
    recCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            console.log(`🎬 ویدیوی پیشنهادی انتخاب شد: ${title}`);
            
            // افزودن انیمیشن کلیک
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

function playRecommendedVideo(videoSrc) {
    const mainVideo = document.getElementById('pythonVideo');
    const videoFrame = document.querySelector('.video-frame');
    
    if (mainVideo && videoFrame) {
        // افکت تغییر ویدیو
        videoFrame.style.opacity = '0.5';
        videoFrame.classList.add('changing');
        
        setTimeout(() => {
            // تغییر منبع ویدیو
            const source = mainVideo.querySelector('source');
            if (source) {
                source.src = videoSrc;
                mainVideo.load();
                mainVideo.play();
                
                // به روزرسانی پستر
                mainVideo.poster = 'images/loading.jpg';
                
                // ریست تایمر
                updateVideoTimer();
            }
            
            videoFrame.style.opacity = '1';
            videoFrame.classList.remove('changing');
            
            console.log(`▶️ پخش ویدیوی جدید: ${videoSrc}`);
            showFeedback('ویدیوی جدید در حال پخش...', 'success');
            
        }, 500);
    }
}

function suggestNextVideo() {
    const suggestions = [
        {
            title: 'یادگیری ماشین پیشرفته',
            desc: 'ساخت مدل‌های پیچیده با TensorFlow',
            duration: '50 دقیقه'
        },
        {
            title: 'API نویسی با FastAPI',
            desc: 'ساخت API های مدرن و سریع',
            duration: '35 دقیقه'
        },
        {
            title: 'بهینه‌سازی کد پایتون',
            desc: 'تکنیک‌های افزایش سرعت اجرا',
            duration: '40 دقیقه'
        }
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    showNotification(
        'پیشنهاد بعدی',
        `${randomSuggestion.title}\n${randomSuggestion.desc} (${randomSuggestion.duration})`,
        'info'
    );
}

// === توابع کمکی ===
function showFeedback(message, type = 'success') {
    // ایجاد عنصر پیام
    const feedback = document.createElement('div');
    feedback.className = `feedback-msg msg-${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 9999;
        opacity: 0;
        animation: slideDown 0.3s ease forwards;
        max-width: 90%;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(feedback);
    
    // حذف خودکار پس از 3 ثانیه
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

function showNotification(title, message, type = 'info') {
    // بررسی اگر نوتیفیکیشن قبلی باز است
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(19, 30, 49, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'info' ? '#3776ab' : type === 'success' ? '#10b981' : '#f43f5e'};
        border-radius: 12px;
        padding: 1rem;
        width: 300px;
        z-index: 9998;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transform: translateX(-100%);
        animation: slideInLeft 0.5s ease forwards;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: start; gap: 10px;">
            <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-triangle'}" 
               style="color: ${type === 'info' ? '#3776ab' : type === 'success' ? '#10b981' : '#f43f5e'}; font-size: 1.2rem;"></i>
            <div style="flex: 1;">
                <strong style="color: #f8fafc; display: block; margin-bottom: 5px;">${title}</strong>
                <div style="color: #94a3b8; font-size: 0.9rem; line-height: 1.4;">${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 5px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // حذف خودکار پس از 5 ثانیه
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// === انیمیشن‌های CSS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    .theme-transition {
        transition: background-color 0.3s, color 0.3s !important;
    }
    
    .loading {
        background-image: linear-gradient(90deg, #0f172a 25%, #1e293b 50%, #0f172a 75%) !important;
        background-size: 200% 100% !important;
        animation: loading-shimmer 2s infinite !important;
    }
    
    @keyframes loading-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .changing {
        animation: pulse 0.5s ease;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.98); }
    }
    
    .liked {
        animation: pop 0.3s ease;
    }
    
    @keyframes pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .clicked {
        animation: clickEffect 0.3s ease;
    }
    
    @keyframes clickEffect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
    }
    
    .python-highlight {
        transition: all 0.3s ease;
    }
    
    /* استایل‌های اضافی برای QA */
    .qa-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .qa-user {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .qa-name {
        font-weight: bold;
        color: #f8fafc;
    }
    
    .qa-badge {
        background: #22d3ee;
        color: #000;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.7rem;
        font-weight: bold;
    }
    
    .qa-time {
        color: #64748b;
        font-size: 0.8rem;
    }
    
    .qa-text {
        color: #e2e8f0;
        line-height: 1.6;
        white-space: pre-line;
    }
    
    .qa-actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    
    .qa-like-btn, .qa-reply-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #334155;
        color: #94a3b8;
        padding: 5px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.2s ease;
    }
    
    .qa-like-btn:hover, .qa-reply-btn:hover {
        background: rgba(55, 118, 171, 0.1);
        border-color: #3776ab;
        color: #f8fafc;
    }
    
    .reply-textarea {
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid #475569;
        border-radius: 6px;
        padding: 10px;
        color: white;
        font-family: inherit;
        resize: vertical;
    }
`;
document.head.appendChild(style);

// === توابع عمومی ===
console.log(`
██████╗ ██╗   ██╗████████╗██╗  ██╗ ██████╗ ███╗   ██╗
██╔══██╗╚██╗ ██╔╝╚══██╔══╝██║  ██║██╔═══██╗████╗  ██║
██████╔╝ ╚████╔╝    ██║   ███████║██║   ██║██╔██╗ ██║
██╔═══╝   ╚██╔╝     ██║   ██╔══██║██║   ██║██║╚██╗██║
██║        ██║      ██║   ██║  ██║╚██████╔╝██║ ╚████║
╚═╝        ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
Python Pro Interface Loaded Successfully!
✨ Ready to code amazing Python projects!
`);