    function openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.querySelector('#checkbox');
    
    
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeCheckbox.checked = true;
    }

    
    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});


function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
    
    document.getElementById('qaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('qaName').value;
        const text = document.getElementById('qaText').value;
        if(name && text) {
            const list = document.getElementById('qaList');
            const item = document.createElement('div');
            item.style = "background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px; margin-top: 10px; border-left: 3px solid #22d3ee;";
            item.innerHTML = `<strong>${name}:</strong> <p>${text}</p>`;
            list.prepend(item);
            this.reset();
        }
    });

    
    document.getElementById('sendPoll').addEventListener('click', function() {
        const star = document.querySelector('input[name="star"]:checked');
        if(star) {
            alert("امتیاز " + star.value + " ستاره‌ای شما ثبت شد. ممنون مهندس!");
        } else {
            alert("لطفاً ابتدا تعداد ستاره‌ها را انتخاب کنید.");
        }
    });
    function openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        tablinks = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
    }

    
    document.getElementById('qaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('qaName').value;
        const text = document.getElementById('qaText').value;
        
        const list = document.getElementById('qaList');
        const msg = document.createElement('div');
        msg.className = "qa-msg-card"; 
        msg.style = "background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; border-right: 3px solid #22d3ee; margin-bottom: 10px;";
        msg.innerHTML = `<small style="color:#22d3ee">${name}</small><p style="margin:5px 0 0 0">${text}</p>`;
        
        list.prepend(msg);
        this.reset();
    });
    
    function openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        tablinks = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
    }

    
    function copyCode() {
        const codeText = document.getElementById('projectCode').innerText;
        navigator.clipboard.writeText(codeText).then(() => {
            const btn = document.querySelector('.copy-btn');
            btn.innerHTML = '<i class="fas fa-check"></i> کپی شد!';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> کپی کردن کد';
                btn.style.background = 'var(--iot-cyan)';
            }, 2000);
        });
    }

    
    function submitPoll() {
        const stars = document.querySelector('input[name="star"]:checked');
        const msgBox = document.getElementById('poll-msg');
        
        if (stars) {
            msgBox.innerHTML = `امتیاز ${stars.value} ستاره با موفقیت ثبت شد!`;
            msgBox.style.display = "block";
            msgBox.className = "feedback-msg msg-success";
        } else {
            msgBox.innerHTML = "لطفاً ابتدا یک ستاره انتخاب کنید.";
            msgBox.style.display = "block";
            msgBox.className = "feedback-msg msg-error";
        }
    }

    
    document.getElementById('qaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('qaName').value;
        const text = document.getElementById('qaText').value;
        const list = document.getElementById('qaList');
        
        const msg = document.createElement('div');
        msg.style = "background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin-top: 10px; border-right: 3px solid var(--iot-cyan);";
        msg.innerHTML = `<strong>${name}:</strong> <p>${text}</p>`;
        list.prepend(msg);
        this.reset();
    });