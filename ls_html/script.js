function playSound(id, vol = 1.0) {
   const audio = document.getElementById(id);
   if (audio) {
      audio.volume = vol;
      audio.currentTime = 0;
      audio.play().catch(e => {});
   }
}

function pauseSound(id) {
   const audio = document.getElementById(id);
   if (audio) audio.pause();
}

function typeWriterEffect(text, elementId, speed, callback) {
   let i = 0;
   const el = document.getElementById(elementId);
   if (!el) {
      if (callback) callback();
      return;
   }
   el.innerHTML = "";

   function type() {
      if (i < text.length) {
         el.innerHTML += text.charAt(i);
         i++;
         setTimeout(type, speed);
      } else {
         el.innerHTML += '<span class="cursor">_</span>';
         if (callback) callback();
      }
   }
   type();
}

function runGame() {
   playSound('click-sound');
   document.getElementById('main-menu').style.opacity = '0';
   setTimeout(() => {
      document.getElementById('main-menu').style.display = 'none';
      document.getElementById('intro-scene').style.display = 'flex';
      playSound('intro-voice');
      startAnimation();
   }, 1000);
}

function startAnimation() {
   setTimeout(() => showText('p1'), 500);
   setTimeout(() => showText('p2'), 14000);
   setTimeout(() => showText('p3'), 22000);
   setTimeout(() => showText('p4'), 26000);
   setTimeout(() => {
      showText('p5');
      setTimeout(() => document.getElementById('next-btn').classList.add('show'), 3000);
   }, 35000);
}

function showText(id) {
   const el = document.getElementById(id);
   if (el) el.classList.add('visible');
}

function skipIntro() {
   pauseSound('intro-voice');
   goToScene3();
}

function goToScene3() {
   pauseSound('intro-voice');
   playSound('click-sound');
   document.getElementById('intro-scene').style.display = 'none';
   document.getElementById('scene-3').style.display = 'block';
   const v = document.getElementById('bg-video');
   if (v) v.play().catch(() => {});
   playSound('quanta-sound');
}

let isDialogueShown = false;

function triggerDialogue() {
   if (!isDialogueShown) {
      const bg = document.getElementById('bg-video');
      if (bg) bg.classList.add('blurred');
      const cap = document.getElementById('scene3-caption');
      if (cap) cap.style.opacity = '0';
      const box = document.querySelector('#scene-3 .dialogue-box-style');
      if (box) {
         box.style.display = 'flex';
         setTimeout(() => box.classList.add('active'), 50);
      }
      playSound('click-sound');
      playSound('quanta-sound', 0.2);
      playSound('scene3-bgm', 0.6);
      playSound('leloi-voice');
      typeWriterEffect("Ta cất quân đánh giặc, không phải là có lòng ham muốn phú quý, mà chính vì muốn để ngàn năm về sau, người đời biết ta không chịu làm tôi tớ cho bọn giặc tàn ngược.", 'typewriter-text', 60, () => {
         const nu = document.getElementById('narrative-update');
         if (nu) nu.style.display = 'block';
         const btn = document.getElementById('btn-to-scene4');
         if (btn) btn.style.display = 'block';
      });
      isDialogueShown = true;
   }
}

function goToScene4() {
   pauseSound('quanta-sound');
   pauseSound('leloi-voice');
   playSound('click-sound');
   document.getElementById('scene-3').style.display = 'none';
   document.getElementById('scene-4').style.display = 'block';
   playSound('scene3-bgm', 0.8);
   typeWriterEffect("Những ngày sống trên núi Chí Linh: Lê Lợi phải giết con ngựa chiến của mình, nghĩa quân săn bắt, hái lá rừng, đào củ rừng ăn qua ngày.", 's4-typewriter', 50, () => {
      document.getElementById('btn-start-stage1').style.display = 'block';
   });
}

let currentStage = 0;

function startCurrentStage() {
   playSound('click-sound');
   document.getElementById('stage-screen').style.display = 'none';
   if (currentStage === 1) document.getElementById('fisherman-container').style.display = 'block';
   else if (currentStage === 2) document.getElementById('archer-container').style.display = 'block';
}

function prepareStage1() {
   document.getElementById('s4-text-container').style.display = 'none';
   pauseSound('scene3-bgm');
   document.getElementById('s4-bg2').style.opacity = '1';
   playSound('s4-audio2');
   document.getElementById('stage-screen').style.display = 'flex';
   currentStage = 1;
   document.querySelector('#stage-screen .stage-title').innerText = "CHẶNG 1: BẮT CÁ";
}

let fishClicks = 0;

function catchFish(isDown) {
   const imgN = document.getElementById('img-kl-normal');
   const imgA = document.getElementById('img-kl-action');
   if (isDown) {
      if (imgN) imgN.style.display = 'none';
      if (imgA) imgA.style.display = 'block';
      playSound('batca-sound');
      fishClicks++;
      document.getElementById('fish-count').innerText = fishClicks;
      if (fishClicks >= 15) finishStage1();
   } else {
      if (imgN) imgN.style.display = 'block';
      if (imgA) imgA.style.display = 'none';
   }
}

function finishStage1() {
   document.getElementById('fisherman-container').style.display = 'none';
   playSound('reward-sound');
   document.getElementById('reward-popup').style.display = 'flex';
   document.getElementById('reward-img').src = "conca.png";
   document.getElementById('reward-text').innerText = "BẠN ĐÃ CÓ CÁ!";
   document.getElementById('reward-btn').innerText = "TIẾP TỤC";
   document.getElementById('reward-btn').onclick = prepareStage2;
}

function prepareStage2() {
   document.getElementById('reward-popup').style.display = 'none';
   document.getElementById('s4-bg2').style.opacity = '0';
   document.getElementById('s4-bg3').style.opacity = '1';
   document.getElementById('stage-screen').style.display = 'flex';
   currentStage = 2;
   document.querySelector('#stage-screen .stage-title').innerText = "CHẶNG 2: SĂN CHIM";
}

let arrowCount = 0;

function shootArrow(isDown) {
   const imgN = document.getElementById('img-ban-normal');
   const imgA = document.getElementById('img-ban-action');
   const arrow = document.getElementById('flying-arrow');
   if (isDown) {
      if (imgN) imgN.style.display = 'none';
      if (imgA) imgA.style.display = 'block';
      playSound('tiengten-sound');
      if (arrow) {
         arrow.style.display = 'block';
         arrow.style.animation = 'none';
         arrow.offsetHeight;
         arrow.style.animation = 'flyArrow 0.3s linear';
      }
      arrowCount++;
      document.getElementById('arrow-count').innerText = arrowCount;
      if (arrowCount >= 20) finishStage2();
   } else {
      setTimeout(() => {
         if (imgN) imgN.style.display = 'block';
         if (imgA) imgA.style.display = 'none';
      }, 200);
   }
}

function finishStage2() {
   document.getElementById('archer-container').style.display = 'none';
   playSound('reward-sound');
   document.getElementById('reward-popup').style.display = 'flex';
   document.getElementById('reward-img').src = "chim.png";
   document.getElementById('reward-text').innerText = "BẠN ĐÃ CÓ CHIM!";
   document.getElementById('reward-btn').innerText = "TẬP HỢP QUÂN";
   document.getElementById('reward-btn').onclick = goToScene5;
}

function goToScene5() {
   document.getElementById('scene-4').style.display = 'none';
   document.getElementById('scene-5').style.display = 'block';
   const v = document.getElementById('s5-video');
   if (v) v.play().catch(() => {});
   playSound('tiengtrong-sound', 1.0);
   setTimeout(triggerLeLoiCommand, 4000);
}

function triggerLeLoiCommand() {
   const v = document.getElementById('s5-video');
   if (v) v.classList.add('blurred');
   const cap = document.getElementById('s5-caption');
   if (cap) cap.style.opacity = '0';
   const box = document.getElementById('s5-dialogue-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   playSound('leloicatluong-voice');
   typeWriterEffect("Các ngươi cho nghĩa quân chúng ta âm thầm sản xuất và cất giấu lương thực ở những nơi bí mật trên núi Chí Linh này để biết đâu sau này cần dùng đến.", 's5-typewriter-text', 50, () => {
      document.getElementById('btn-to-3d').style.display = 'block';
   });
}

function goToScene6() {
   pauseSound('leloicatluong-voice');
   playSound('click-sound');
   document.getElementById('scene-5').style.display = 'none';
   document.getElementById('scene-6').style.display = 'block';
}

function openModel3D() {
   playSound('click-sound');
   document.getElementById('horse-hotspot').style.display = 'none';
   document.getElementById('model-modal').style.display = 'flex';
}

function closeModel3D() {
   playSound('click-sound');
   document.getElementById('model-modal').style.display = 'none';
   document.getElementById('horse-hotspot').style.display = 'block';
}

function goToScene7() {
   playSound('click-sound');
   document.getElementById('scene-6').style.display = 'none';
   document.getElementById('scene-7').style.display = 'block';
   playSound('trongvang-sound', 1.0);
   const box = document.getElementById('s7-dialogue-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   typeWriterEffect("(Đánh phục kích): Lý Bân cho quân đến Lam Sơn. Ta lợi dụng địa hình 2 vách núi, cho quân giả thua để lùa giặc vào trận địa mai phục!", 's7-intro-text', 40, () => {
      document.getElementById('start-ambush-btn').style.display = 'block';
   });
}

function startAmbush() {
   playSound('click-sound');
   document.getElementById('s7-dialogue-box').style.display = 'none';
   document.getElementById('rock-left').style.display = 'block';
   document.getElementById('rock-right').style.display = 'block';
   alert("NHIỆM VỤ: Nhấn vào các tảng đá đang phát sáng để lăn xuống (15 lần)!");
}

let rockCount = 0;
const TARGET_ROCKS = 15;

function dropRock(side) {
   playSound('daroi-sound');
   const rock = document.createElement('img');
   rock.src = 'da.png';
   rock.className = 'falling-rock remove-black-bg';
   rock.style.left = side === 'left' ? '15%' : 'auto';
   rock.style.right = side === 'right' ? '15%' : 'auto';
   rock.style.top = '25%';
   document.getElementById('scene-7').appendChild(rock);
   rock.style.animation = 'dropRock 1s linear forwards';
   setTimeout(() => rock.remove(), 1000);
   rockCount++;
   if (rockCount >= TARGET_ROCKS) {
      setTimeout(startArrowPhase, 1000);
   }
}

function startArrowPhase() {
   document.getElementById('rock-left').style.display = 'none';
   document.getElementById('rock-right').style.display = 'none';
   document.getElementById('bow-center').style.display = 'block';
   alert("Bắn tên!");
}

let arrowAmbushCount = 0;
const TARGET_ARROWS = 15;

function fireArrowRain() {
   playSound('tiengten-sound');
   for (let i = 0; i < 3; i++) {
      const arrow = document.createElement('img');
      arrow.src = 'muiten.png';
      arrow.className = 'falling-arrow-down remove-black-bg';
      arrow.style.left = (30 + Math.random() * 40) + '%';
      arrow.style.top = '15%';
      arrow.style.animation = `rainArrow ${(0.5 + Math.random() * 0.5)}s linear forwards`;
      document.getElementById('scene-7').appendChild(arrow);
      setTimeout(() => arrow.remove(), 1000);
   }
   arrowAmbushCount++;
   if (arrowAmbushCount >= TARGET_ARROWS) {
      setTimeout(endAmbushBattle, 1500);
   }
}

function endAmbushBattle() {
   document.getElementById('bow-center').style.display = 'none';
   document.getElementById('s7-video-container').style.display = 'block';
   const v = document.getElementById('s7-video');
   if (v) v.play().catch(() => {});
   playSound('chaos-sound');
   document.getElementById('s7-narrative-box').style.display = 'block';
   document.getElementById('s7-narrative-text').innerText = "Thắng lợi!";
   setTimeout(() => {
      document.getElementById('victory-btn').style.display = 'block';
   }, 3000);
}

function goToScene8() {
   playSound('click-sound');
   pauseSound('trongvang-sound');
   pauseSound('chaos-sound');
   document.getElementById('scene-7').style.display = 'none';
   document.getElementById('scene-8').style.display = 'block';
   playSound('leloihoi-bgm', 0.7);
   const v = document.getElementById('s8-video');
   if (v) v.play().catch(() => {});
   typeWriterEffect("Tiếp tục bị Lý Bân cho tấn công vào Lam Sơn...", 's8-intro-text', 40, () => {
      setTimeout(showLeLoiScene8, 1500);
   });
}

function showLeLoiScene8() {
   document.getElementById('s8-intro-text').style.display = 'none';
   const box = document.getElementById('s8-leloi-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   playSound('leloikytin-voice');
   typeWriterEffect("Ai dám bắt chước Kỷ Tín...", 's8-leloi-text', 50, () => {
      setTimeout(() => {
         document.getElementById('lelai-container').style.display = 'block';
      }, 1000);
   });
}

function triggerLeLaiAction() {
   document.getElementById('s8-leloi-box').style.display = 'none';
   document.getElementById('lelai-container').style.display = 'none';
   pauseSound('leloihoi-bgm');
   playSound('lelaixin-sound', 0.8);
   const box = document.getElementById('s8-lelai-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   playSound('lelaidoiao-voice');
   typeWriterEffect("Thần xin được đổi áo", 's8-lelai-text', 60, () => {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'game-btn';
      nextBtn.innerText = "LÊ LAI XUẤT TRẬN >>";
      nextBtn.onclick = goToScene9;
      nextBtn.style.marginTop = "20px";
      const container = document.querySelector('#s8-lelai-box .dialogue-content');
      if (container) container.appendChild(nextBtn);
   });
}

function goToScene9() {
   playSound('click-sound');
   pauseSound('lelaixin-sound');
   pauseSound('lelaidoiao-voice');
   document.getElementById('scene-8').style.display = 'none';
   document.getElementById('scene-9').style.display = 'block';
   playSound('trongvang-sound');
   const v = document.getElementById('s9-video');
   if (v) v.play().catch(() => {});
   const lelai = document.getElementById('lelai-attack-container');
   if (lelai) lelai.classList.add('charge');
   setTimeout(() => {
      playSound('lelaitalachua-voice');
      playSound('lelaithoai-sound', 0.5);
      const shoutBox = document.getElementById('s9-shout-box');
      if (shoutBox) {
         shoutBox.style.display = 'flex';
         setTimeout(() => shoutBox.classList.add('active'), 50);
      }
      setTimeout(() => {
         const sb = document.getElementById('s9-shout-box');
         if (sb) sb.style.display = 'none';
         const hint = document.getElementById('click-hint-s9');
         if (hint) hint.style.display = 'block';
      }, 3000);
   }, 2000);
}

function endScene9() {
   document.getElementById('lelai-attack-container').style.display = 'none';
   document.getElementById('s9-shout-box').style.display = 'none';
   const box = document.getElementById('s9-narrative-box');
   if (box) box.style.display = 'block';
   playSound('reward-sound');
}

function goToScene10() {
   playSound('click-sound');
   pauseSound('lelaithoai-sound');
   pauseSound('trongvang-sound');
   document.getElementById('scene-9').style.display = 'none';
   document.getElementById('scene-10').style.display = 'block';
   playSound('namtien-sound', 0.8);
   const title = document.getElementById('s10-title');
   setTimeout(() => title.style.opacity = '1', 500);
   setTimeout(() => {
      title.style.opacity = '0';
      const box = document.getElementById('s10-dialogue-box');
      if (box) {
         box.style.display = 'flex';
         setTimeout(() => box.classList.add('active'), 50);
      }
      playSound('giongdocnamtien-voice');
      const fullText = `Sau khi họp hội nghị quân sự cấp cao, quân ta thực hiện chính sách: phải chiếm được vùng lãnh thổ rộng lớn như Nghệ An mới có thể huy động đủ sức người và sức của để kháng chiến lâu dài.<br><br><div class="poetry-text">“Trận Bồ Đằng sấm vang chớp giật<br>Miền Trà Lân trúc chẻ tro bay”</div>`;
      const container = document.getElementById('s10-typewriter-text');
      if (container) {
         container.innerHTML = fullText;
         container.style.opacity = 0;
         let op = 0;
         const fadeIn = setInterval(() => {
            if (op >= 1) {
               clearInterval(fadeIn);
            }
            container.style.opacity = op;
            op += 0.05;
         }, 50);
      }
      document.getElementById('btn-to-scene11').style.display = 'block';
   }, 2500);
}

function goToScene11() {
   playSound('click-sound');
   document.getElementById('scene-10').style.display = 'none';
   document.getElementById('scene-11').style.display = 'block';
   const v = document.getElementById('s11-video');
   if (v) v.play().catch(() => {});
}

function goToScene12() {
   playSound('click-sound');
   document.getElementById('scene-11').style.display = 'none';
   document.getElementById('scene-12').style.display = 'block';
   const v = document.getElementById('s12-video');
   if (v) v.play().catch(() => {});
   playSound('namtien-sound');
}

function goToScene13() {
   playSound('click-sound');
   pauseSound('namtien-sound');
   document.getElementById('scene-12').style.display = 'none';
   document.getElementById('scene-13').style.display = 'block';
   const v = document.getElementById('s13-video');
   if (v) v.play().catch(() => {});
   playSound('chaos-sound');
   const box = document.getElementById('s13-dialogue-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 500);
   }
   typeWriterEffect("Biết tin, triều đình nhà Minh chặn đánh ở 2 phía Nam và Bắc. Lê Lợi đánh phương Bắc trước, cho quân núp sau khe núi Bồ Đằng, đợi ban đêm giặc tấn công rồi đánh.", 's13-text', 40, () => {
      const victoryText = document.createElement('div');
      victoryText.className = 'highlight-victory';
      victoryText.innerHTML = "=> LÊ LỢI DẦN CHIẾM ĐƯỢC THÀNH TRÀ LÂN";
      document.getElementById('s13-text').appendChild(victoryText);
      playSound('reward-sound');
      const nextBtn = document.createElement('button');
      nextBtn.className = 'game-btn';
      nextBtn.innerText = "TIẾP TỤC: KẾ SÁCH 1425 >>";
      nextBtn.onclick = goToScene14;
      nextBtn.style.marginTop = "20px";
      const content = document.querySelector('#s13-dialogue-box .dialogue-content');
      if (content) content.appendChild(nextBtn);
   });
}

function goToScene14() {
   playSound('click-sound');
   pauseSound('chaos-sound');
   document.getElementById('scene-13').style.display = 'none';
   document.getElementById('scene-14').style.display = 'block';
   playSound('scene3-bgm');
   const intro = document.getElementById('s14-intro-text');
   if (intro) intro.style.display = 'block';
   setTimeout(() => {
      intro.style.display = 'none';
      const leloiBox = document.getElementById('s14-leloi-box');
      if (leloiBox) {
         leloiBox.style.display = 'flex';
         setTimeout(() => leloiBox.classList.add('active'), 50);
      }
      playSound('leloigiacdongta-voice');
      typeWriterEffect("Giặc đông, ta ít. Lấy ít mà đánh đông chỉ có nơi hiểm yếu mới mong thủ thắng. Binh Pháp nói rằng phải nhử người đến chứ đừng để người nhử mình. => Lê Lợi cho đánh chiếm Đỗ Gia.", 's14-leloi-text', 40, () => {
         document.getElementById('btn-next-s14').style.display = 'block';
      });
   }, 4000);
}

function nextPartScene14() {
   playSound('click-sound');
   document.getElementById('s14-leloi-box').style.display = 'none';
   document.getElementById('s14-narrative-box').style.display = 'block';
   setTimeout(() => {
      document.getElementById('btn-continue-game').style.display = 'block';
      playSound('click-sound');
   }, 5000);
}

function goToScene15() {
   playSound('click-sound');
   pauseSound('scene3-bgm');
   document.getElementById('scene-14').style.display = 'none';
   document.getElementById('scene-15').style.display = 'block';
   playSound('tiengtrong-sound');
   const box = document.getElementById('s15-leloi-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   playSound('leloisommuon-voice');
   typeWriterEffect("Sớm muộn thế nào giặc cũng đánh vào Khả Lưu. Ta không mai phục được ở sâu trong cửa ải thì mai phục ở phía ngoài ải vậy.", 's15-leloi-text', 40, () => {
      document.getElementById('btn-s15-next').style.display = 'block';
   });
}

function goToScene15_Part2() {
   playSound('click-sound');
   document.getElementById('s15-leloi-box').style.display = 'none';
   document.getElementById('s15-bg').style.backgroundImage = "url('danhnhau.jpg')";
   const narr = document.getElementById('s15-narrative-box');
   if (narr) {
      narr.style.display = 'block';
      document.getElementById('s15-narrative-text-single').innerHTML = "Nghĩa quân Lam Sơn giả vờ thua để lùa quân Minh vào trận địa mai phục => giặc thua to. <br>Giặc Minh cố thủ lâu dài ở gần Khả Lưu để chặn bước tiến của Lê Lợi về Nghệ An.";
   }
}

function goToScene15_Part3() {
   playSound('click-sound');
   document.getElementById('s15-narrative-box').style.display = 'none';
   document.getElementById('s15-bg').style.backgroundImage = "url('baiso.jpg')";
   const box = document.getElementById('s15-leloi-box');
   if (box) {
      document.getElementById('s15-leloi-text').innerHTML = "";
      box.style.display = 'flex';
   }
   typeWriterEffect("Lương thực không còn nhiều. Ta quyết định 'Đốt trại dụ địch', cho quân lui về Bồ Ải mai phục.", 's15-leloi-text', 40, () => {
      setTimeout(() => {
         document.getElementById('s15-leloi-box').style.display = 'none';
         document.getElementById('camp-trigger').style.display = 'block';
         alert("NHIỆM VỤ: Nhấn vào trại địch để bắt đầu đốt!");
      }, 2000);
   });
}

// Fire mini-game
let burningTime = 0;
let isBurning = false;
let burnInterval;

function startFireGame() {
   playSound('click-sound');
   document.getElementById('camp-trigger').style.display = 'none';
   document.getElementById('camp-game-container').style.display = 'block';
   document.body.style.cursor = 'none';
   document.getElementById('fire-cursor').style.display = 'block';
   playSound('dottrai-sound');
   document.addEventListener('mousemove', moveFire);
   document.addEventListener('mousedown', startBurn);
   document.addEventListener('mouseup', stopBurn);
   // also add touch support
   document.addEventListener('touchmove', touchMoveFire, {
      passive: false
   });
   document.addEventListener('touchstart', startBurnTouch, {
      passive: false
   });
   document.addEventListener('touchend', stopBurnTouch, {
      passive: false
   });
}

function moveFire(e) {
   const fire = document.getElementById('fire-cursor');
   if (!fire) return;
   fire.style.left = (e.pageX || e.clientX) + 'px';
   fire.style.top = (e.pageY || e.clientY) + 'px';
}

function touchMoveFire(e) {
   e.preventDefault();
   const touch = e.touches[0];
   if (!touch) return;
   const fire = document.getElementById('fire-cursor');
   if (!fire) return;
   fire.style.left = touch.clientX + 'px';
   fire.style.top = touch.clientY + 'px';
}

function startBurn() {
   if (isBurning) return;
   isBurning = true;
   burningTime = 0;
   burnInterval = setInterval(() => {
      burningTime++;
      if (burningTime >= 20) winFireGame();
   }, 1000);
}

function startBurnTouch(e) {
   e.preventDefault();
   startBurn();
}

function stopBurn() {
   isBurning = false;
   clearInterval(burnInterval);
}

function stopBurnTouch(e) {
   e.preventDefault();
   stopBurn();
}

function winFireGame() {
   clearInterval(burnInterval);
   document.removeEventListener('mousemove', moveFire);
   document.removeEventListener('mousedown', startBurn);
   document.removeEventListener('mouseup', stopBurn);
   document.removeEventListener('touchmove', touchMoveFire);
   document.removeEventListener('touchstart', startBurnTouch);
   document.removeEventListener('touchend', stopBurnTouch);
   document.body.style.cursor = 'default';
   document.getElementById('camp-game-container').style.display = 'none';
   pauseSound('dottrai-sound');
   pauseSound('tiengtrong-sound');
   playSound('chucmung-sound');
   playSound('reward-sound');
   document.getElementById('s15-final-box').style.display = 'block';
}

function goToScene16() {
   playSound('click-sound');
   pauseSound('chucmung-sound');
   document.getElementById('scene-15').style.display = 'none';
   document.getElementById('scene-16').style.display = 'block';
   playSound('chaos-sound');
   setTimeout(() => {
      document.getElementById('s16-intro-desc').style.opacity = '1';
      setTimeout(() => {
         document.getElementById('s16-bg').classList.add('blurred');
         document.getElementById('letter-icon').style.display = 'block';
      }, 2000);
   }, 1000);
}

function openLetterDialogue() {
   playSound('click-sound');
   document.getElementById('letter-icon').style.display = 'none';
   const box = document.getElementById('s16-dialogue-box');
   if (box) {
      box.style.display = 'flex';
      setTimeout(() => box.classList.add('active'), 50);
   }
   playSound('nguyentraithu-voice');
   const txt = "Ngươi từng gửi thư cho ta, cười ta nương náu nơi rừng núi, thập thò như chuột, không dám ra đồng bằng để đánh nhau. Nay quân ta đã đến đây, ngoài thành Nghệ An đều là chiến trường cả. Ngươi nói đây là rừng núi chăng? Ngươi cứ đóng thành như mụ già mãi hay sao? Ta sợ rằng ngươi không tránh khỏi tiếng nhục, hiền như đàn bà khăn yếm vậy.";
   typeWriterEffect(txt, 's16-typewriter-text', 30, () => {
      setTimeout(() => {
         document.getElementById('s16-dialogue-box').style.display = 'none';
         document.getElementById('s16-conclusion').style.display = 'block';
         playSound('reward-sound');
      }, 2000);
   });
}

function goToScene17() {
   playSound('click-sound');
   pauseSound('reward-sound');
   document.getElementById('scene-16').style.display = 'none';
   document.getElementById('scene-17').style.display = 'block';
   playSound('tiengtrong-sound');
   const text1 = "Lê Lợi tiếp tục hạ lệnh giải phóng thành công Tân Bình và Thuận Hóa (giải phóng hoàn toàn miền Nam).";
   const text2 = "⇒ NAM TIẾN: Đánh chiếm các đồn nhỏ xung quanh và dụ binh => thành công làm chủ lãnh thổ từ Thanh Hóa vào Nghệ An.";
   typeWriterEffect(text1, 's17-text-1', 40, () => {
      setTimeout(() => {
         playSound('reward-sound');
         typeWriterEffect(text2, 's17-text-2', 40, () => {
            document.getElementById('btn-s17-end').style.display = 'inline-block';
         });
      }, 1000);
   });
}