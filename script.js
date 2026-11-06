let battery = 100;
let panic = 0;
let currentStage = 1;

const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const batteryBar = document.getElementById('battery-bar');
const panicBar = document.getElementById('panic-bar');

const sndDrip = document.getElementById('snd-drip');
const sndFootsteps = document.getElementById('snd-footsteps');
const sndScare = document.getElementById('snd-scare');

function updateStatus() {
    batteryBar.style.width = battery + '%';
    panicBar.style.width = panic + '%';
}

function makeChoice(choiceNum) {
    if (sndDrip.paused) {
        sndDrip.volume = 0.3;
        sndDrip.play().catch(e => console.log(e));
    }

    if (currentStage === 1) {
        if (choiceNum === 1) {
            battery -= 20;
            panic += 15;
            sndFootsteps.play();
            storyText.innerHTML = "أضأت الكشاف! انعكس ضوؤه الباهت على جدران حجرية رطبة، وفي أقصى الغرفة رأيت باباً حديدياً قديمًا مقفلاً بسلسلة صدئة... لكنك سمعت صوتاً مفاجئاً خلفك!";
            choicesContainer.innerHTML = `
                <button class="choice-btn" onclick="makeChoice(1)">الالتفات بسرعة نحو مصدر الصوت</button>
                <button class="choice-btn" onclick="makeChoice(2)">الركض نحو الباب الحديدي ومحاولة كسره</button>
            `;
            currentStage = 2;
        } else {
            battery -= 5;
            panic += 30;
            storyText.innerHTML = "تحسست الجدار في ظلام تام... اصطدمت يداك بشيء لزج وبارد يشبه جثة أو شيئاً غير مألوف! ارتجف قلبك من شدة الخوف وازداد ذعرك.";
            choicesContainer.innerHTML = `
                <button class="choice-btn" onclick="makeChoice(1)">إشعال الكشاف فوراً من شدة الرعب</button>
                <button class="choice-btn" onclick="makeChoice(2)">البقاء صامتاً وعدم الحركة</button>
            `;
            currentStage = 3;
        }
    } else if (currentStage === 2) {
        if (choiceNum === 1) {
            sndScare.play();
            panic = 100;
            updateStatus();
            storyText.innerHTML = "التفتّ بسرعة... فرأيت وجهاً شاحباً ومخيفاً يحدق فيك مباشرة قبل أن ينطفئ الكشاف تماماً! لقد انتهى أمرك.";
            choicesContainer.innerHTML = `<button class="choice-btn" onclick="resetGame()">إعادة المحاولة من جديد</button>`;
        } else {
            battery -= 30;
            panic += 20;
            storyText.innerHTML = "ركضت نحو الباب ووجدت مفتاحاً معلقاً بجانبه! فتحت القفل بصعوبة بالغة وانزلقت إلى الممر المظلم الخارجي.. نجوت بحياتك مؤقتاً ولكن الكشّاف يوشك على النفاد!";
            choicesContainer.innerHTML = `<button class="choice-btn" onclick="resetGame()">لعبة جديدة</button>`;
        }
    } else if (currentStage === 3) {
        battery -= 10;
        panic += 40;
        sndScare.play();
        storyText.innerHTML = "بقيْت صامتاً، لكن شيئاً ما أمسك بكتفك وهمس بصوت مرعب في أذنك: 'وجدتُك...' انطفأ كل شيء وفقدت وعيك.";
        choicesContainer.innerHTML = `<button class="choice-btn" onclick="resetGame()">إعادة المحاولة</button>`;
    }

    updateStatus();
}

function resetGame() {
    battery = 100;
    panic = 0;
    currentStage = 1;
    updateStatus();
    storyText.innerHTML = "تستيقظ في مكان مظلم جداً... تشعر ببرودة المكان وصوت قطرات ماء تنقط بالقرب منك. لا تذكر كيف وصلت إلى هنا، ومعك فقط كشاف يدوي قديم.";
    choicesContainer.innerHTML = `
        <button class="choice-btn" onclick="makeChoice(1)">تشغيل الكشاف واستكشاف الغرفة</button>
        <button class="choice-btn" onclick="makeChoice(2)">التحسس في الظلام باليدين</button>
    `;
}
