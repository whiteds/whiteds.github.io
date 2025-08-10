import"./modulepreload-polyfill-B5Qt9EMX.js";import{I as ye,c as L,r as le,i as ie,G as fe,f as ce,l as V,j as ge,P as he,a as xe,t as Ie,m as H,b as te,h as be,d as we,q as Ee,e as ve}from"./scoreboard-dJYpJN6-.js";import{c as Ce,L as re}from"./lobby-c2wlNO_i.js";window.__SUPABASE__={url:"https://chbibdnqynilfuczbygg.supabase.co",anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYmliZG5xeW5pbGZ1Y3pieWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MDc0OTQsImV4cCI6MjA3MDI4MzQ5NH0.VuwTKXiU1Yx4C_fQCIp5X20m8SupxBkCKhQzN7Vqe20"};class de{constructor(e,s){this.channel=null,this.roomId=null,this.messageHandler=null,this.playerName=null,this.reconnectTimer=null,this.supa=Ce(e,s,{realtime:{params:{eventsPerSecond:20}},auth:{persistSession:!1,autoRefreshToken:!1}}),this.userId=crypto.randomUUID(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.channel&&(console.log("[Realtime] Page became visible, checking connection..."),this.checkAndReconnect())})}join(e,s,i){this.roomId=e,this.messageHandler=s,this.playerName=i||null,console.log(`[Realtime] Joining room: ${e} as ${i} (${this.userId})`);const t=this.supa.channel(`room:${e}`,{config:{broadcast:{ack:!0,self:!1}}});t.on("broadcast",{event:"message"},o=>{const r=o.payload;if(console.log("[Realtime] Received broadcast message:",r.type,r.payload),console.log("[Realtime] From channel:",this.roomId),console.log("[Realtime] Channel subscription status:",t.state),r.type==="join"||r.type==="leave"){const m=r.payload.userId;if(console.log(`[Realtime] Message userId: ${m}, My userId: ${this.userId}`),m===this.userId){console.log("[Realtime] Ignoring own message");return}}if(r.type==="ready"){const m=r.payload.userId;console.log(`[Realtime] Ready message - userId: ${m}, My userId: ${this.userId}`),console.log("[Realtime] Passing ready message to handler")}try{s(r)}catch(m){console.error("[Realtime] Error processing message:",m)}}),t.subscribe(o=>{console.log(`[Realtime] Channel status: ${o}`),o==="SUBSCRIBED"?(console.log("[Realtime] Successfully subscribed, sending join message"),this.send({type:"join",payload:{userId:this.userId,name:i}}),this.reconnectTimer&&clearInterval(this.reconnectTimer),this.reconnectTimer=setInterval(()=>{this.checkAndReconnect()},5e3)):(o==="CHANNEL_ERROR"||o==="TIMED_OUT")&&(console.log("[Realtime] Connection error, attempting to reconnect..."),this.reconnect())}),this.channel=t}checkAndReconnect(){if(!this.channel)return;const e=this.channel.state;console.log(`[Realtime] Connection check - state: ${e}`),e!=="joined"&&e!=="joining"&&(console.log("[Realtime] Connection lost, reconnecting..."),this.reconnect())}reconnect(){!this.roomId||!this.messageHandler||(console.log("[Realtime] Attempting to reconnect..."),this.channel&&(this.supa.removeChannel(this.channel),this.channel=null),this.reconnectTimer&&(clearInterval(this.reconnectTimer),this.reconnectTimer=null),setTimeout(()=>{this.roomId&&this.messageHandler&&this.join(this.roomId,this.messageHandler,this.playerName||void 0)},1e3))}leave(){this.reconnectTimer&&(clearInterval(this.reconnectTimer),this.reconnectTimer=null),this.channel&&(this.send({type:"leave",payload:{userId:this.userId}}),this.supa.removeChannel(this.channel),this.channel=null),this.roomId=null,this.messageHandler=null,this.playerName=null}send(e){if(!this.channel){console.warn("[Realtime] Cannot send - no channel");return}console.log("[Realtime] Sending message:",e.type,e.payload),console.log("[Realtime] To room:",this.roomId),console.log("[Realtime] Channel state:",this.channel.state),this.channel.send({type:"broadcast",event:"message",payload:e}).then(()=>console.log("[Realtime] Message sent successfully")).catch(s=>console.error("[Realtime] Error sending message:",s))}getUserId(){return this.userId}}const me=document.getElementById("board"),Re=document.getElementById("next"),ke=document.getElementById("hold"),Se=document.getElementById("score"),Te=document.getElementById("level"),$e=document.getElementById("lines"),R=document.getElementById("btn-pause"),Ge=document.getElementById("btn-restart"),S=document.getElementById("scoreboard"),k=document.getElementById("opponent"),U=document.getElementById("room-id"),M=document.getElementById("room-label"),D=document.getElementById("btn-join"),Y=document.getElementById("btn-leave"),$=document.getElementById("btn-ready"),y=document.getElementById("btn-start"),W=document.getElementById("btn-lobby"),X=document.getElementById("btn-create"),J=document.getElementById("btn-close-lobby"),P=document.getElementById("lobby"),oe=document.getElementById("room-list"),K=document.getElementById("nickname"),Be={board:me,next:Re,hold:ke,scoreEl:Se,levelEl:Te,linesEl:$e},w=new ye;w.attach();const a=L();let u=!0,ne=a.status,C=!1,l=null,f=null,se=0,T=!1,B=null,x=!1,G=(localStorage.getItem("tetris_nick")||"").trim()||"Anonymous",d=null,p=!1,h=!1,c=null,v=!1;setTimeout(()=>E(),100);R.addEventListener("click",()=>Z());Ge.addEventListener("click",()=>{le(a),u=!1,R.textContent="Pause"});D==null||D.addEventListener("click",()=>{var i;const e=window.__SUPABASE__,s=(((i=U==null?void 0:U.value)==null?void 0:i.trim())||localStorage.getItem("tetris_room")||"").trim();!(e!=null&&e.url)||!(e!=null&&e.anonKey)||!s||(l&&l.leave(),l=new de(e.url,e.anonKey),l.join(s,t=>{if(t.type==="state"){const o=t.payload;console.log("[Game] Received state from opponent"),f=o,o.attack&&o.attack>0&&(console.log(`[Game] Receiving ${o.attack} attack lines from opponent!`),ie(a,o.attack),pe(o.attack)),o.status==="gameover"&&a.status==="playing"&&!v&&(console.log("[Game] Opponent lost! You win!"),v=!0,ue(),u=!0,C=!1,R.textContent="Game Over"),j()}else if(t.type==="host_info"){const o=t.payload;console.log("[Game] Received host info:",o),!p&&o.name&&(d=o.name,h=!0,E(),g())}else if(t.type==="leave")t.payload.userId!==l.getUserId()&&(console.log(`[Game] Opponent left: ${d}`),_(`${d||"Opponent"} left the room`),d=null,h=!1,x=!1,f=null,j(),E(),g(),p&&c&&c.updatePlayers(1));else if(t.type==="join")t.payload.userId!==l.getUserId()&&(d=t.payload.name||"Guest",h=!0,E(),g(),console.log(`[Game] Opponent joined: ${d}`),_(`${d} joined the room!`),p&&c&&c.updatePlayers(2),p&&(console.log("[Game] Sending host info to guest"),l==null||l.send({type:"host_info",payload:{userId:l.getUserId(),name:G}})));else if(t.type==="ready"){console.log("[Game] Received ready event:",t.payload);const o=l.getUserId();console.log(`[Game] My userId: ${o}, Event userId: ${t.payload.userId}`),t.payload.userId!==o?(x=t.payload.ready,console.log(`[Game] Opponent ready status updated: ${x}`),g(),x?(console.log("[Game] Opponent is ready!"),_(`${d||"Opponent"} is ready!`),A(!0)):(console.log("[Game] Opponent is not ready"),A(!1))):console.log("[Game] Ignoring own ready event")}else if(t.type==="start"){const o=Date.now(),r=t.payload.at,m=r-o,I=Math.max(0,m-4e3);console.log(`[Game] Guest received start signal. Target time: ${r}, Current: ${o}, Delay: ${I}ms`),setTimeout(()=>{F(()=>{Object.assign(a,L(t.payload.seed)),u=!1,C=!0,v=!1,R.textContent="Pause"})},I)}},G),M&&(M.textContent=`Room: ${s}`),localStorage.removeItem("tetris_room"),E(),g())});Y==null||Y.addEventListener("click",()=>{l==null||l.leave(),f=null,d=null,x=!1,T=!1,C=!1,v=!1,u=!0,h=!1,p&&c&&c.closeRoom(),c=null,p=!1,j(),E(),g(),localStorage.removeItem("tetris_room"),localStorage.removeItem("tetris_room_title"),localStorage.removeItem("tetris_room_created"),window.location.href="../multi/"});$==null||$.addEventListener("click",()=>{if(T=!T,console.log(`[Game] Ready button clicked, ready: ${T}, isHost: ${p}`),p)g();else{$.textContent=T?"Ready ✔":"Ready";const n=(l==null?void 0:l.getUserId())||"unknown";console.log(`[Game] Sending ready status: ${T}, userId: ${n}`),l==null||l.send({type:"ready",payload:{userId:n,ready:T}}),g()}});y==null||y.addEventListener("click",()=>{if(!(!h||!x)){if(l){const n=l;n.checkAndReconnect&&n.checkAndReconnect()}setTimeout(()=>{const n=Math.floor(Math.random()*2147483647),e=Date.now()+5050;l==null||l.send({type:"start",payload:{seed:n,at:e}}),console.log(`[Game] Host starting game at absolute time: ${e} (in 5050ms)`),setTimeout(()=>{F(()=>{Object.assign(a,L(n)),u=!1,C=!0,v=!1,R.textContent="Pause"})},50)},100)}});W==null||W.addEventListener("click",()=>{const e=window.__SUPABASE__;!(e!=null&&e.url)||!(e!=null&&e.anonKey)||!P||(P.style.display=P.style.display==="none"?"block":"none",B||(B=new re(e.url,e.anonKey),B.onUpdate=s=>_e(s),B.join((K==null?void 0:K.value)||"Anonymous")))});J==null||J.addEventListener("click",()=>{P&&(P.style.display="none")});X==null||X.addEventListener("click",()=>{if(!B)return;const n=B.createRoom("Room");U&&(U.value=n)});function _e(n){oe&&(oe.innerHTML=n.map(e=>`<div class="row" style="justify-content:space-between;"><span>${e.id} • ${e.host}</span><span>${e.players}/${e.max}</span></div>`).join(""))}function Z(){u=!u,R.textContent=u?"Resume":"Pause"}function g(){!y||!$||(p?($.style.display="none",y.style.display="inline-block",h&&x?(y.disabled=!1,y.style.opacity="1",y.style.cursor="pointer",y.textContent="Start"):(y.disabled=!0,y.style.opacity="0.5",y.style.cursor="not-allowed",y.textContent=h?"Waiting Ready...":"Waiting for player...")):(y.style.display="none",$.style.display="inline-block"))}function E(){const n=document.getElementById("my-name");n&&(n.textContent=G);const e=document.getElementById("opponent-name");e&&(d?(e.textContent=d,x&&(e.textContent+=" ✅")):e.textContent="Waiting for opponent...")}function A(n){const e=document.getElementById("opponent-name");e&&d&&(e.textContent=d+(n?" ✅":""))}function _(n){const e=document.createElement("div");e.style.cssText=`
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #2a2f66;
    color: #e6e9ff;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1001;
    animation: slideIn 0.3s ease-out;
  `,e.textContent=n;const s=document.createElement("style");s.textContent=`
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `,document.head.appendChild(s),document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}function Oe(n){const e=document.createElement("div");if(e.style.cssText=`
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 200, 0, 0.9);
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1500;
    animation: slideUp 0.3s ease-out;
  `,e.textContent=`💥 ${n}줄 공격! 💥`,!document.getElementById("attack-sent-style")){const s=document.createElement("style");s.id="attack-sent-style",s.textContent=`
      @keyframes slideUp {
        from { transform: translateX(-50%) translateY(20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    `,document.head.appendChild(s)}document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},1e3)}function pe(n){const e=document.createElement("div");if(e.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 20px 40px;
    border-radius: 12px;
    font-size: 24px;
    font-weight: bold;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    z-index: 1500;
    animation: attackPulse 0.5s ease-out;
  `,e.textContent=`⚠️ ${n}줄 공격 받음! ⚠️`,!document.getElementById("attack-style")){const s=document.createElement("style");s.id="attack-style",s.textContent=`
      @keyframes attackPulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
      }
    `,document.head.appendChild(s)}document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},1500)}function ue(){const n=document.createElement("div");n.style.cssText=`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: grid;
    place-items: center;
    z-index: 3000;
  `;const e=document.createElement("div");if(e.style.cssText=`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px 60px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: victoryBounce 0.5s ease-out;
  `,e.innerHTML=`
    <h1 style="font-size: 48px; margin: 0 0 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🎉 승리! 🎉</h1>
    <p style="font-size: 20px; margin: 0 0 10px;">상대방이 게임오버 되었습니다!</p>
    <p style="font-size: 16px; margin: 0 0 30px; opacity: 0.9;">최종 점수: ${a.score}</p>
    <button id="btn-victory-leave" style="background: white; color: #667eea; border: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">로비로 돌아가기</button>
  `,!document.getElementById("victory-style")){const i=document.createElement("style");i.id="victory-style",i.textContent=`
      @keyframes victoryBounce {
        0% { transform: scale(0.5); opacity: 0; }
        60% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }
    `,document.head.appendChild(i)}n.appendChild(e),document.body.appendChild(n);const s=document.getElementById("btn-victory-leave");s==null||s.addEventListener("click",()=>{window.location.href="../multi/"})}function Ue(){const n=document.createElement("div");n.style.cssText=`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: grid;
    place-items: center;
    z-index: 3000;
  `;const e=document.createElement("div");if(e.style.cssText=`
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: 40px 60px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: defeatFade 0.5s ease-out;
  `,e.innerHTML=`
    <h1 style="font-size: 48px; margin: 0 0 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">😢 패배 😢</h1>
    <p style="font-size: 20px; margin: 0 0 10px;">게임 오버!</p>
    <p style="font-size: 16px; margin: 0 0 30px; opacity: 0.9;">최종 점수: ${a.score}</p>
    <button id="btn-defeat-leave" style="background: white; color: #f5576c; border: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">로비로 돌아가기</button>
  `,!document.getElementById("defeat-style")){const i=document.createElement("style");i.id="defeat-style",i.textContent=`
      @keyframes defeatFade {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `,document.head.appendChild(i)}n.appendChild(e),document.body.appendChild(n);const s=document.getElementById("btn-defeat-leave");s==null||s.addEventListener("click",()=>{window.location.href="../multi/"})}function F(n){const e=["3","2","1","GO!"];let s=0;const i=()=>{if(s>=e.length){n();return}const t=document.createElement("div");if(t.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 120px;
      font-weight: 900;
      color: #ffd95d;
      text-shadow: 0 4px 12px rgba(0,0,0,0.5);
      z-index: 2000;
      animation: countPulse 1s ease-out;
      pointer-events: none;
    `,t.textContent=e[s],!document.getElementById("countdown-style")){const o=document.createElement("style");o.id="countdown-style",o.textContent=`
        @keyframes countPulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          40% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        }
      `,document.head.appendChild(o)}document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t)},1e3),s++,s<e.length?setTimeout(i,1e3):setTimeout(n,1e3)};i()}function Pe(){if(w.consume("pause")&&Z(),w.consume("restart")&&(le(a),u=!1,R.textContent="Pause"),u||a.status!=="playing")return;const n=w.consume("left"),e=w.consume("right");n&&H(a,-1,0),e&&H(a,1,0),w.consume("softDrop")&&H(a,0,1),w.consume("rotateCW")&&te(a,1),w.consume("rotateCCW")&&te(a,-1),w.consume("hardDrop")&&be(a),w.consume("hold")&&we(a)}const je=new fe({update:n=>{Pe(),!u&&C&&Ie(a,n),Le(),ne!==a.status&&(a.status==="gameover"&&Ae(),ne=a.status)},render:()=>xe(a,Be)});je.start();const b=localStorage.getItem("tetris_room"),Q=localStorage.getItem("tetris_room_title");b&&window.location.pathname.includes("/game/")&&setTimeout(()=>{const e=window.__SUPABASE__;if(e!=null&&e.url&&(e!=null&&e.anonKey)){console.log(`[Game] Auto-joining room: ${b}`),l&&l.leave(),l=new de(e.url,e.anonKey),l.join(b,t=>{if(t.type==="state"){const o=t.payload;console.log("[Game] Received state from opponent"),f=o,o.attack&&o.attack>0&&(console.log(`[Game] Receiving ${o.attack} attack lines from opponent!`),ie(a,o.attack),pe(o.attack)),o.status==="gameover"&&a.status==="playing"&&!v&&(console.log("[Game] Opponent lost! You win!"),v=!0,ue(),u=!0,C=!1,R.textContent="Game Over"),j()}else if(t.type==="host_info"){const o=t.payload;console.log("[Game] Received host info:",o),!p&&o.name&&(d=o.name,h=!0,E(),g())}else if(t.type==="leave")t.payload.userId!==l.getUserId()&&(console.log(`[Game] Opponent left: ${d}`),_(`${d||"Opponent"} left the room`),d=null,h=!1,x=!1,f=null,j(),E(),g(),p&&c&&c.updatePlayers(1));else if(t.type==="join")t.payload.userId!==l.getUserId()&&(d=t.payload.name||"Guest",h=!0,E(),g(),console.log(`[Game] Opponent joined: ${d}`),_(`${d} joined the room!`),p&&c&&c.updatePlayers(2),p&&(console.log("[Game] Sending host info to guest"),l==null||l.send({type:"host_info",payload:{userId:l.getUserId(),name:G}})));else if(t.type==="ready"){console.log("[Game] Received ready event:",t.payload);const o=l.getUserId();console.log(`[Game] My userId: ${o}, Event userId: ${t.payload.userId}`),t.payload.userId!==o?(x=t.payload.ready,console.log(`[Game] Opponent ready status updated: ${x}`),g(),x?(console.log("[Game] Opponent is ready!"),_(`${d||"Opponent"} is ready!`),A(!0)):(console.log("[Game] Opponent is not ready"),A(!1))):console.log("[Game] Ignoring own ready event")}else if(t.type==="start"){const o=Date.now(),r=t.payload.at,m=r-o,I=Math.max(0,m-4e3);console.log(`[Game] Guest received start signal. Target time: ${r}, Current: ${o}, Delay: ${I}ms`),setTimeout(()=>{F(()=>{Object.assign(a,L(t.payload.seed)),u=!1,C=!0,v=!1,R.textContent="Pause"})},I)}},G);const s=localStorage.getItem("tetris_room_title")||b;M&&(M.textContent=`Room: ${s}`),p=localStorage.getItem("tetris_room_created")==="true",c||(c=new re(e.url,e.anonKey),c.join(G),p&&Q&&(console.log("[Game] Host maintaining room in lobby:",b),c.myRoomId=b,c.rooms.set(b,{id:b,host:G,title:Q,players:1,max:2,updatedAt:Date.now()}),c.isSubscribed&&c.updatePlayers(1)),c.onUpdate=t=>{const o=t.find(r=>r.id===b);o?(console.log("[Game] Room status:",o),p&&h&&(c==null||c.updatePlayers(2))):p&&Q&&(console.log("[Game] Room not found in lobby, maintaining it..."),c&&(c.myRoomId=b,c.updatePlayers(h?2:1)))}),E(),g()}},500);const ze="https://chbibdnqynilfuczbygg.supabase.co",Me="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYmliZG5xeW5pbGZ1Y3pieWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MDc0OTQsImV4cCI6MjA3MDI4MzQ5NH0.VuwTKXiU1Yx4C_fQCIp5X20m8SupxBkCKhQzN7Vqe20";window.__SUPABASE__={url:ze,anonKey:Me};S&&ce(S,V());q();window.addEventListener("resize",q);window.__tetris={getStatus:()=>a.status,isPaused:()=>u,pause:()=>{u||Z()}};window.addEventListener("beforeunload",()=>{p&&c&&c.closeRoom()});function Ae(){const n=a.score,e=V();if(l&&C&&f&&!v&&f.status==="playing"&&(console.log("[Game] You lost! Opponent wins!"),v=!0,Ue()),Ee(n,e)){const s=(localStorage.getItem("tetris_player_name")||"").trim(),i=(localStorage.getItem("tetris_nick")||"").trim();ve(s||i||"Anonymous",n,{level:a.level,lines:a.lines})}S&&(ce(S,V()),q());try{window.dispatchEvent(new CustomEvent("tetris:score-updated"))}catch{}}function q(){if(!S)return;const n=16,e=window.innerHeight,s=me.getBoundingClientRect(),i=Math.max(120,e-(s.bottom+n)-n);S.style.maxHeight=`${i}px`,S.style.overflowY="auto",document.body.style.paddingBottom=`${Math.ceil(S.getBoundingClientRect().height)+n}px`}let ae=0;function Le(){if(!l||!C)return;const n=performance.now();if(n-ae<200||(ae=n,!a))return;const e=Math.max(0,a.lines-se);se=a.lines;const s=e;s>0&&C&&(console.log(`[Game] Sending ${s} attack lines to opponent!`),Oe(s));const i={field:a.field.map(t=>t.map(o=>o?1:0)),active:a.active?{type:a.active.type,x:a.active.x,y:a.active.y,rotation:a.active.rotation}:null,score:a.score,level:a.level,lines:a.lines,status:a.status,attack:s>0?s:void 0};l.send({type:"state",payload:i})}function j(){if(!k)return;const n=k.getContext("2d");if(n.clearRect(0,0,k.width,k.height),!f){const o=Math.floor((k.width-320)/2),r=Math.floor((k.height-20*32)/2);n.strokeStyle="#1f2347",n.lineWidth=1;for(let m=0;m<20;m++)for(let I=0;I<10;I++)n.strokeRect(o+I*32,r+m*32,32,32);return}const e=32,s=Math.floor((k.width-10*e)/2),i=Math.floor((k.height-20*e)/2);n.strokeStyle="#1f2347",n.lineWidth=1;for(let t=0;t<20;t++)for(let o=0;o<10;o++)n.strokeRect(s+o*e,i+t*e,e,e);for(let t=2;t<f.field.length;t++)for(let o=0;o<f.field[0].length;o++)f.field[t][o]&&(n.fillStyle="#6ea8fe",n.fillRect(s+o*e+1,i+(t-2)*e+1,e-2,e-2));if(f.active){const t=f.active,o=t.type,r=t.rotation,m=ge({type:o,rotation:r,x:t.x,y:t.y}),I=he[o];n.fillStyle=I;for(let O=0;O<m.length;O++)for(let z=0;z<m[O].length;z++)if(m[O][z]){const N=t.x+z,ee=t.y+O;ee>=2&&N>=0&&N<10&&n.fillRect(s+N*e+1,i+(ee-2)*e+1,e-2,e-2)}}}
