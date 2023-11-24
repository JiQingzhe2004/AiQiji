// 获取搜索框和按钮元素
let searchInput = document.getElementById('search');
let searchButton = document.querySelector('.sousuo button');

// 添加按钮点击事件
searchButton.addEventListener('click', function() {
    // 获取用户输入的搜索词
    let keyword = searchInput.value;
    
    // 创建一个TreeWalker来遍历所有的文本节点
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    
    // 遍历所有的文本节点
    while (node = walker.nextNode()) {
        // 在文本中查找匹配项
        let index = node.textContent.indexOf(keyword);
        
        // 如果找到匹配项
        if (index !== -1) {
            // 创建一个新的span元素来高亮显示匹配项
            let span = document.createElement('span');
            span.style.color = 'blanchedalmond';
            span.style.backgroundColor = 'red';
            span.textContent = keyword;
            
            // 替换匹配项
            let textNode = node.splitText(index);
            textNode.textContent = textNode.textContent.substring(keyword.length);
            node.parentNode.insertBefore(span, textNode);
            
            // 平滑滚动到高亮元素的位置
            span.scrollIntoView({behavior: 'smooth'});
            
            // 只处理第一个匹配项
            break;
        }
    }
});

// 获取所有的图片元素和箭头元素
let images = document.querySelectorAll('.lunbo img');
let leftArrow = document.querySelector('.lunbo .arrow.left');
let rightArrow = document.querySelector('.lunbo .arrow.right');

// 创建一个索引变量来跟踪当前显示的图片
let currentIndex = 0;

// 创建一个函数来更新显示的图片
function updateImage() {
    // 隐藏所有的图片
    for (let i = 0; i < images.length; i++) {
        images[i].style.transform = 'translateX(-100%)';
        images[i].style.transition = 'none';
    }
    
    // 显示当前的图片
    images[currentIndex].style.transform = 'translateX(0)';
    images[currentIndex].style.transition = 'transform 0.3s';
}

// 初始化显示的图片
updateImage();

// 为箭头元素添加点击事件监听器
leftArrow.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});
rightArrow.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageText = document.getElementById('messageText').value;
    
    // 假设您已经有一个函数来处理发送留言到服务器的请求
    submitMessageToServer(messageText).then(response => {
        // 显示留言
        displayMessage(response.message, response.timestamp, response.ip);
        document.getElementById('messageText').value = ''; // 清空输入框
    });
});

function displayMessage(message, timestamp, ip) {
    const messagesDisplay = document.getElementById('messagesDisplay');
    const messageElement = document.createElement('div');

    messageElement.innerHTML = `
        <p>留言内容: ${message}</p>
        <p>留言时间: ${timestamp}</p>
        <p>IP 地区: ${ip}</p>
    `;
    messagesDisplay.appendChild(messageElement);
}

let lastScrollTop = 0;
