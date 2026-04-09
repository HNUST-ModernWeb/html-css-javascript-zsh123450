
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 页面加载时检查本地存储中的主题设置
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// 点击切换明暗主题，并保存到本地存储
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

const avatarUpload = document.getElementById('avatarUpload');
const avatarPreview = document.getElementById('avatarPreview');
const avatarWrapper = document.querySelector('.avatar-wrapper');

// 点击头像区域触发文件选择
avatarWrapper.addEventListener('click', () => {
    avatarUpload.click();
});

// 选择图片后预览显示
avatarUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            avatarPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 重置为默认头像 - 创新功能
const resetAvatar = document.getElementById('resetAvatar');
const defaultAvatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d04?w=200&h=200&fit=crop&crop=face';

resetAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarPreview.src = defaultAvatar;
    localStorage.setItem('userInfo', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userInfo') || '{}'),
        avatar: defaultAvatar
    }));
});


const saveBtn = document.getElementById('saveBtn');
const nameInput = document.getElementById('nameInput');
const schoolInput = document.getElementById('schoolInput');
const majorInput = document.getElementById('majorInput');
const hometownInput = document.getElementById('hometownInput');
const introInput = document.getElementById('introInput');

// 点击保存按钮，将所有信息存储到本地存储
saveBtn.addEventListener('click', () => {
    localStorage.setItem('userInfo', JSON.stringify({
        name: nameInput.value,
        school: schoolInput.value,
        major: majorInput.value,
        hometown: hometownInput.value,
        intro: introInput.value,
        avatar: avatarPreview.src
    }));
    
    alert('个人信息已保存！');
});

// 页面加载时从本地存储读取保存的信息
window.addEventListener('DOMContentLoaded', () => {
    const savedInfo = localStorage.getItem('userInfo');
    if (savedInfo) {
        const info = JSON.parse(savedInfo);
        nameInput.value = info.name || '';
        schoolInput.value = info.school || '';
        majorInput.value = info.major || '';
        hometownInput.value = info.hometown || '';
        introInput.value = info.intro || '';
        if (info.avatar) {
            avatarPreview.src = info.avatar;
        }
    }
});