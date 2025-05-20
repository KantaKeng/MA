document.addEventListener('DOMContentLoaded', function() {
    // ตัวแปรอ้างอิง DOM
    const decryptBtn = document.getElementById('decryptBtn');
    const cipherInput = document.getElementById('cipherInput');
    const result = document.getElementById('result');
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // ข้อความที่ถูกเข้ารหัส
    const correctEncrypted = "L oryh brx qd edeh nkrq vxdb";
    const correctDecrypted = "I love you na babe khon suay";
    
    // สร้างเอฟเฟกต์หัวใจพื้นหลัง
    createHeartBackground();
    
    // สร้าง confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // สร้าง success animation container
    const successAnimation = document.createElement('div');
    successAnimation.className = 'success-animation';
    document.body.appendChild(successAnimation);
    
    // ใส่เอฟเฟกต์พิมพ์ข้อความให้กับข้อความในหน้าเว็บ
    typeWriterEffect();
    
    // รับการคลิกปุ่มถอดรหัส
    decryptBtn.addEventListener('click', function() {
        // เพิ่มเอฟเฟกต์กำลังโหลด
        const originalBtnText = decryptBtn.innerHTML;
        decryptBtn.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>กำลังถอดรหัส...';
        decryptBtn.disabled = true;
        
        // จำลองการประมวลผล
        setTimeout(() => {
            const userInput = cipherInput.value.trim();
            
            // ถอดรหัส
            const decrypted = caesarDecrypt(userInput, 3);
            
            // ล้างคลาสเดิม
            result.className = 'result';
            
            // ตรวจสอบผลลัพธ์
            if (userInput.toLowerCase() === correctEncrypted.toLowerCase() || 
                decrypted.toLowerCase() === correctDecrypted.toLowerCase()) {
                
                // แสดงข้อความเมื่อถูกต้อง
                result.textContent = "เย้! บะบี๋เก่งจากหนูรักบะบี๋น้าา 2 ปีแยะอุอิุอุ 💖";
                result.classList.add('success');
                
                // เล่นเอฟเฟกต์พลุและกระดาษสี
                createConfetti();
                
                // แสดงวิดีโอ
                videoContainer.classList.remove('hidden');
                setTimeout(() => {
                    videoContainer.classList.add('visible');
                    videoPlayer.play();
                }, 300);
                
            } else {
                // แสดงข้อความเมื่อผิด
                result.textContent = "ลองใหม่น้า~ บี๋ทำด้ายยยย! 💪";
                result.classList.add('error');
                
                // ซ่อนวิดีโอ
                videoContainer.classList.remove('visible');
                videoContainer.classList.add('hidden');
                videoPlayer.pause();
            }
            
            // เปลี่ยนปุ่มกลับเป็นปกติ
            decryptBtn.innerHTML = originalBtnText;
            decryptBtn.disabled = false;
        }, 1200);
    });
    
    // ฟังก์ชันถอดรหัส Caesar Cipher
    function caesarDecrypt(text, shift) {
        return text.split('').map(char => {
            // ตรวจสอบว่าเป็นตัวอักษรภาษาอังกฤษ
            if (/[a-zA-Z]/.test(char)) {
                // หาค่า ASCII
                const code = char.charCodeAt(0);
                
                // กำหนดค่าฐาน (A=65, a=97)
                const base = code >= 65 && code <= 90 ? 65 : 97;
                
                // คำนวณและแปลงกลับเป็นตัวอักษร
                return String.fromCharCode(
                    (((code - base - shift + 26) % 26) + base)
                );
            }
            
            // ส่งคืนอักขระที่ไม่ใช่ตัวอักษรโดยไม่เปลี่ยนแปลง
            return char;
        }).join('');
    }
    
    // รองรับการกดปุ่ม Enter
    cipherInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            decryptBtn.click();
        }
    });
    
    // เอฟเฟกต์พิมพ์ข้อความ
    function typeWriterEffect() {
        const msgElement = document.querySelector('.message p');
        const hintElement = document.querySelector('.hint');
        
        if (msgElement && hintElement) {
            const msgText = msgElement.textContent;
            const hintText = hintElement.textContent;
            
            msgElement.textContent = '';
            hintElement.textContent = '';
            
            // พิมพ์ข้อความแรก
            typeText(msgElement, msgText, 0, 30, function() {
                // หลังจากข้อความแรกเสร็จ ค่อยพิมพ์ข้อความที่สอง
                setTimeout(() => {
                    typeText(hintElement, hintText, 0, 20);
                }, 300);
            });
        }
    }
    
    // ฟังก์ชันพิมพ์ข้อความทีละตัว
    function typeText(element, text, index, speed, callback) {
        if (index < text.length) {
            const span = document.createElement('span');
            span.className = 'animated-text';
            span.textContent = text.charAt(index);
            
            element.appendChild(span);
            
            setTimeout(() => {
                typeText(element, text, index + 1, speed, callback);
            }, speed);
        } else if (callback) {
            callback();
        }
    }
    
    // สร้างเอฟเฟกต์หัวใจพื้นหลัง
    function createHeartBackground() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'hearts-container';
        document.body.appendChild(heartsContainer);
        
        // สร้างหัวใจจำนวนหนึ่ง
        for (let i = 0; i < 30; i++) {
            createHeart(heartsContainer);
        }
        
        // สร้างหัวใจเพิ่มเติมเป็นระยะ
        setInterval(() => {
            createHeart(heartsContainer);
        }, 3000);
    }
    
    // ฟังก์ชันสร้างหัวใจ
    function createHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // สุ่มค่าต่างๆ
        const left = Math.random() * 100;
        const size = Math.random() * 15 + 10;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        // กำหนดสไตล์
        heart.style.left = `${left}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        // สุ่มสี
        const colors = ['#ff6b95', '#ff8fb3', '#ff4c7d', '#ff91a3', '#ffb3c0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg)`;
        
        // เพิ่มหัวใจลงในคอนเทนเนอร์
        container.appendChild(heart);
        
        // ลบหัวใจหลังจากแอนิเมชันเสร็จสิ้น
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
    
    // ฟังก์ชันสร้าง confetti
    function createConfetti() {
        confettiContainer.style.display = 'block';
        const colors = ['#ff6b95', '#91ff9e', '#91c5ff', '#ffdb91', '#ff91c5', '#c291ff', '#91ffe6'];
        
        // สร้าง confetti จำนวนมาก
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // สุ่มรูปร่าง
                const shapes = ['square', 'circle', 'triangle', 'heart'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                // สุ่มค่าต่างๆ
                const left = Math.random() * 100;
                const size = Math.random() * 10 + 5;
                const duration = Math.random() * 3 + 2;
                const delay = Math.random() * 0.5;
                
                // กำหนดสไตล์
                confetti.style.left = `${left}%`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.opacity = Math.random() * 0.6 + 0.4;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                // รูปร่างต่างๆ
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = `${size}px solid transparent`;
                    confetti.style.borderRight = `${size}px solid transparent`;
                    confetti.style.borderBottom = `${size * 1.5}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                    confetti.style.background = 'transparent';
                } else if (shape === 'heart') {
                    confetti.style.background = 'transparent';
                    confetti.style.boxShadow = 'none';
                    confetti.style.width = `${size * 1.2}px`;
                    confetti.style.height = `${size}px`;
                    confetti.style.background = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(colors[Math.floor(Math.random() * colors.length)])}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') no-repeat center`;
                    confetti.style.backgroundSize = 'contain';
                }
                
                // กำหนดแอนิเมชัน
                confetti.style.animation = `fall ${duration}s linear forwards`;
                confetti.style.animationDelay = `${delay}s`;
                
                // ใส่ transform
                const randomRotation = Math.random() * 360;
                confetti.style.transform = `rotate(${randomRotation}deg)`;
                
                // กำหนด keyframes สำหรับการตกลงมา
                const keyframes = `
                    @keyframes fall {
                        from {
                            transform: translate(0, -20px) rotate(${randomRotation}deg);
                        }
                        to {
                            transform: translate(${Math.random() * 150 - 75}px, ${window.innerHeight + 100}px) rotate(${randomRotation + 360 * 3}deg);
                        }
                    }
                `;
                
                // เพิ่ม keyframes ลงใน stylesheet
                const styleSheet = document.createElement('style');
                styleSheet.textContent = keyframes;
                document.head.appendChild(styleSheet);
                
                // เพิ่ม confetti ลงในคอนเทนเนอร์
                confettiContainer.appendChild(confetti);
                
                // ลบ confetti เมื่อแอนิเมชันเสร็จสิ้น
                setTimeout(() => {
                    confetti.remove();
                    styleSheet.remove();
                }, (duration + delay) * 1000);
            }, Math.random() * 1000);
        }
        
        // ลบคอนเทนเนอร์หลังจากแอนิเมชันเสร็จสิ้น
        setTimeout(() => {
            confettiContainer.style.display = 'none';
        }, 5000);
    }
});