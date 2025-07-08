// ===== カウント + バーの設定 =====
var bar = new ProgressBar.Line('#splash-text',{
    easing: 'easeInOut',    //アニメーション効果
    duration: 1000,         //時間指定
    strokeWidth: 0.2,       //進捗ゲージの太さ
    color: '#555',          //進捗ゲージのカラー
    trailColor: '#bbb',
    text: {
        style: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: '0',
            margin: '-30px 0 0 0',
            transform: 'translate(-50%, -50%)',
            'font-size':'1.5rem',
            color: '#333',
        },
        autoStyleContainer: false
    },
    step: function (state, bar) {
        bar.setText(Math.round(bar.value() * 100) + ' %');
    }
});

// ===== アニメーションスタート =====
bar.animate(1.0, function(){
    $("#splash").delay(500).fadeOut(800);
    $("#container").fadeIn(800, function(){
        // タイピング
        const target = document.getElementById('portfolio-text');
        const text = 'PORTFOLIO.';
        let index = 0;

        target.textContent = '';

        function typeLetter(){
            if (index < text.length){
                target.textContent += text.charAt(index);
                index++;
                setTimeout(typeLetter, 150);   //表示速度　150ms
            }
        }
        setTimeout(typeLetter, 800)
    });
});

// ===== 背景 =====
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 35 },
    "size": { "value": 2 },
    "color": {"value": "#333"},
    "move": { "speed": 1 },
    "line_linked": {
        "enable": true,
        "color": "#333" 
    },
    "opacity": { "value": 0.2 }
  }
});

// ===== スムーススクロール =====
$('#next-content a').click(function (e) {
    e.preventDefault(); // デフォルトのリンク動作を無効化
    const target = $($(this).attr('href')); // hrefで指定された要素を取得

    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 800); 
    }
});

$('#page-top').click(function () {  //クリックしたとき
    $('body,html').animate({
        scrollTop: 0
    }, 500); 
    return false;
});

// ===== ナビゲーションのスムーススクロール =====
$('a[href^="#"]').click(function (e) {
  e.preventDefault();

  const speed = 600; // ミリ秒（＝0.6秒）
  const href = $(this).attr('href');
  const target = $(href === '#' || href === '' ? 'html' : href);
  const position = target.offset().top;

  $('html, body').animate({ scrollTop: position }, speed, 'swing');
});

// ===== skill-list のフェードイン処理 =====
function fadeInSkillList() {
  const skills = document.querySelectorAll('.skill-fade');
  const triggerBottom = window.innerHeight * 0.85;

  skills.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', fadeInSkillList);
window.addEventListener('load', fadeInSkillList); // 読み込み時にも実行

// ===== スクロールで下からフェードイン =====
$(window).on('scroll', function () {
  $('.fade-up').each(function () {
    const targetPos = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (scroll > targetPos - windowHeight + 100) {
      $(this).addClass('visible');
    }
  });
});

// ===== モーダルポップアップ =====
const workData = [
  {
    img: "https://via.placeholder.com/600x400",
    title: "作品タイトル 1",
    text: "ここに作品の詳細説明を記述します。"
  },
  {
    img: "assets/works-robot1.png",
    title: "Hello, Robot!",
    text: `
    <p>本作品は、C++とOpenGL／GLUTを用いて制作した、インタラクティブな3Dロボットアニメーションです。
      ロボットは自律的にランダムな方向へ歩行し、ユーザーからの入力やオブジェクトとの接触に応じて動作や表情を変化させます。
      内部では、一定間隔でランダムな角度を生成し、それに向かって回転・移動するランダムウォークのアルゴリズムを採用しています。</p>
    <a href="https://github.com/g2342051/hello-robot" target="_blank" class="animation-button">
      <i class="fa-brands fa-github fa-2xl" style="color: #030303;"></i>
    </a>
    `.trim()
  },
  {
    img: "assets/works-GPA2.png",
    title: "smartGPA",
    text: `
    <p>大学の成績管理を効率化するWebアプリです。<br>
      学生はログインして、自分のGPA・評価・相対順位・単位状況を確認できます。<br><br>

      得点に応じた評価・GPA計算、順位の自動算出、不足単位の表示などの機能を実装。<br>
      3人で開発し、私は<strong>バックエンド（DB設計・計算ロジック）</strong>を担当しました。</p>
    <a href="https://github.com/g2342051/smartGPA.git" target="_blank" class="animation-button">
      <i class="fa-brands fa-github fa-2xl" style="color: #030303;"></i>
    </a>`

  }
];

$('.work-card').on('click', function () {
  const index = $(this).data('index');
  const data = workData[index];
  $('#modal-img').attr('src', data.img);
  $('#modal-title').text(data.title);
  $('#modal-text').html(data.text);
  $('#work-modal').css('display', 'flex').hide().fadeIn();
});

$('.close-btn').on('click', function () {
  $('#work-modal').fadeOut();
});

// モーダル外クリックで閉じる
$('#work-modal').on('click', function (e) {
  if ($(e.target).is('#work-modal')) {
    $('#work-modal').fadeOut();
  }
});
