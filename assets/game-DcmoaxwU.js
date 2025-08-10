import"./modulepreload-polyfill-B5Qt9EMX.js";import{I as ye,c as L,r as le,i as ie,G as fe,f as ce,l as V,j as ge,P as he,a as xe,t as Ie,m as H,b as te,h as be,d as we,q as Ee,e as ve}from"./scoreboard-dJYpJN6-.js";import{c as Ce,L as re}from"./lobby-c2wlNO_i.js";window.__SUPABASE__={url:"https://chbibdnqynilfuczbygg.supabase.co",anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYmliZG5xeW5pbGZ1Y3pieWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MDc0OTQsImV4cCI6MjA3MDI4MzQ5NH0.VuwTKXiU1Yx4C_fQCIp5X20m8SupxBkCKhQzN7Vqe20"};class de{constructor(e,s){this.channel=null,this.roomId=null,this.messageHandler=null,this.playerName=null,this.reconnectTimer=null,this.supa=Ce(e,s,{realtime:{params:{eventsPerSecond:20}},auth:{persistSession:!1,autoRefreshToken:!1}}),this.userId=crypto.randomUUID(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.channel&&(console.log("[Realtime] Page became visible, checking connection..."),this.checkAndReconnect())})}join(e,s,i){this.roomId=e,this.messageHandler=s,this.playerName=i||null,console.log(`[Realtime] Joining room: ${e} as ${i} (${this.userId})`);const t=this.supa.channel(`room:${e}`,{config:{broadcast:{ack:!0,self:!1}}});t.on("broadcast",{event:"message"},n=>{const d=n.payload;if(console.log("[Realtime] Received broadcast message:",d.type,d.payload),console.log("[Realtime] From channel:",this.roomId),console.log("[Realtime] Channel subscription status:",t.state),d.type==="join"||d.type==="leave"){const u=d.payload.userId;if(console.log(`[Realtime] Message userId: ${u}, My userId: ${this.userId}`),u===this.userId){console.log("[Realtime] Ignoring own message");return}}if(d.type==="ready"){const u=d.payload.userId;console.log(`[Realtime] Ready message - userId: ${u}, My userId: ${this.userId}`),console.log("[Realtime] Passing ready message to handler")}try{s(d)}catch(u){console.error("[Realtime] Error processing message:",u)}}),t.subscribe(n=>{console.log(`[Realtime] Channel status: ${n}`),n==="SUBSCRIBED"?(console.log("[Realtime] Successfully subscribed, sending join message"),this.send({type:"join",payload:{userId:this.userId,name:i}}),this.reconnectTimer&&clearInterval(this.reconnectTimer),this.reconnectTimer=setInterval(()=>{this.checkAndReconnect()},5e3)):(n==="CHANNEL_ERROR"||n==="TIMED_OUT")&&(console.log("[Realtime] Connection error, attempting to reconnect..."),this.reconnect())}),this.channel=t}checkAndReconnect(){if(!this.channel)return;const e=this.channel.state;console.log(`[Realtime] Connection check - state: ${e}`),e!=="joined"&&e!=="joining"&&(console.log("[Realtime] Connection lost, reconnecting..."),this.reconnect())}reconnect(){!this.roomId||!this.messageHandler||(console.log("[Realtime] Attempting to reconnect..."),this.channel&&(this.supa.removeChannel(this.channel),this.channel=null),this.reconnectTimer&&(clearInterval(this.reconnectTimer),this.reconnectTimer=null),setTimeout(()=>{this.roomId&&this.messageHandler&&this.join(this.roomId,this.messageHandler,this.playerName||void 0)},1e3))}leave(){this.reconnectTimer&&(clearInterval(this.reconnectTimer),this.reconnectTimer=null),this.channel&&(this.send({type:"leave",payload:{userId:this.userId}}),this.supa.removeChannel(this.channel),this.channel=null),this.roomId=null,this.messageHandler=null,this.playerName=null}send(e){if(!this.channel){console.warn("[Realtime] Cannot send - no channel");return}console.log("[Realtime] Sending message:",e.type,e.payload),console.log("[Realtime] To room:",this.roomId),console.log("[Realtime] Channel state:",this.channel.state),this.channel.send({type:"broadcast",event:"message",payload:e}).then(()=>console.log("[Realtime] Message sent successfully")).catch(s=>console.error("[Realtime] Error sending message:",s))}getUserId(){return this.userId}}const me=document.getElementById("board"),Re=document.getElementById("next"),ke=document.getElementById("hold"),Se=document.getElementById("score"),Be=document.getElementById("level"),Ge=document.getElementById("lines"),C=document.getElementById("btn-pause"),Te=document.getElementById("btn-restart"),k=document.getElementById("scoreboard"),R=document.getElementById("opponent"),P=document.getElementById("room-id"),M=document.getElementById("room-label"),Y=document.getElementById("btn-join"),W=document.getElementById("btn-leave"),B=document.getElementById("btn-ready"),y=document.getElementById("btn-start"),X=document.getElementById("btn-lobby"),J=document.getElementById("btn-create"),K=document.getElementById("btn-close-lobby"),U=document.getElementById("lobby"),oe=document.getElementById("room-list"),D=document.getElementById("nickname"),_e={board:me,next:Re,hold:ke,scoreEl:Se,levelEl:Be,linesEl:Ge},b=new ye;b.attach();const a=L();let p=!0,ne=a.status,v=!1,l=null,f=null,se=0,S=!1,T=null,x=!1,G=(localStorage.getItem("tetris_nick")||"").trim()||"Anonymous",r=null,m=!1,h=!1,c=null,E=!1;setTimeout(()=>w(),100);C.addEventListener("click",()=>Z());Te.addEventListener("click",()=>{le(a),p=!1,C.textContent="Pause"});Y==null||Y.addEventListener("click",()=>{var i;const e=window.__SUPABASE__,s=(((i=P==null?void 0:P.value)==null?void 0:i.trim())||localStorage.getItem("tetris_room")||"").trim();!(e!=null&&e.url)||!(e!=null&&e.anonKey)||!s||(l&&l.leave(),l=new de(e.url,e.anonKey),l.join(s,t=>{if(t.type==="state"){const n=t.payload;console.log("[Game] Received state from opponent"),f=n,n.attack&&n.attack>0&&(console.log(`[Game] Receiving ${n.attack} attack lines from opponent!`),ie(a,n.attack),pe(n.attack)),n.status==="gameover"&&a.status==="playing"&&!E&&(console.log("[Game] Opponent lost! You win!"),E=!0,ue(),p=!0,v=!1,C.textContent="Game Over"),j()}else if(t.type==="host_info"){const n=t.payload;console.log("[Game] Received host info:",n),!m&&n.name&&(r=n.name,h=!0,w(),g())}else if(t.type==="leave")t.payload.userId!==l.getUserId()&&(console.log(`[Game] Opponent left: ${r}`),_(`${r||"Opponent"} left the room`),r=null,h=!1,x=!1,f=null,j(),w(),g(),m&&c&&c.updatePlayers(1));else if(t.type==="join")t.payload.userId!==l.getUserId()&&(r=t.payload.name||"Guest",h=!0,w(),g(),console.log(`[Game] Opponent joined: ${r}`),_(`${r} joined the room!`),m&&c&&c.updatePlayers(2),m&&(console.log("[Game] Sending host info to guest"),l==null||l.send({type:"host_info",payload:{userId:l.getUserId(),name:G}})));else if(t.type==="ready"){console.log("[Game] Received ready event:",t.payload);const n=l.getUserId();console.log(`[Game] My userId: ${n}, Event userId: ${t.payload.userId}`),t.payload.userId!==n?(x=t.payload.ready,console.log(`[Game] Opponent ready status updated: ${x}`),g(),x?(console.log("[Game] Opponent is ready!"),_(`${r||"Opponent"} is ready!`),A(!0)):(console.log("[Game] Opponent is not ready"),A(!1))):console.log("[Game] Ignoring own ready event")}else if(t.type==="start"){const n=performance.now(),d=Math.max(0,t.payload.at-n-4e3);setTimeout(()=>{F(()=>{Object.assign(a,L(t.payload.seed)),p=!1,v=!0,E=!1,C.textContent="Pause"})},d)}},G),M&&(M.textContent=`Room: ${s}`),localStorage.removeItem("tetris_room"),w(),g())});W==null||W.addEventListener("click",()=>{l==null||l.leave(),f=null,r=null,x=!1,S=!1,v=!1,E=!1,p=!0,h=!1,m&&c&&c.closeRoom(),c=null,m=!1,j(),w(),g(),localStorage.removeItem("tetris_room"),localStorage.removeItem("tetris_room_title"),localStorage.removeItem("tetris_room_created"),window.location.href="../multi/"});B==null||B.addEventListener("click",()=>{if(S=!S,console.log(`[Game] Ready button clicked, ready: ${S}, isHost: ${m}`),m)g();else{B.textContent=S?"Ready ✔":"Ready";const o=(l==null?void 0:l.getUserId())||"unknown";console.log(`[Game] Sending ready status: ${S}, userId: ${o}`),l==null||l.send({type:"ready",payload:{userId:o,ready:S}}),g()}});y==null||y.addEventListener("click",()=>{if(!(!h||!x)){if(l){const o=l;o.checkAndReconnect&&o.checkAndReconnect()}setTimeout(()=>{const o=Math.floor(Math.random()*2147483647),e=performance.now()+5e3;l==null||l.send({type:"start",payload:{seed:o,at:e}}),F(()=>{Object.assign(a,L(o)),p=!1,v=!0,E=!1,C.textContent="Pause"})},100)}});X==null||X.addEventListener("click",()=>{const e=window.__SUPABASE__;!(e!=null&&e.url)||!(e!=null&&e.anonKey)||!U||(U.style.display=U.style.display==="none"?"block":"none",T||(T=new re(e.url,e.anonKey),T.onUpdate=s=>$e(s),T.join((D==null?void 0:D.value)||"Anonymous")))});K==null||K.addEventListener("click",()=>{U&&(U.style.display="none")});J==null||J.addEventListener("click",()=>{if(!T)return;const o=T.createRoom("Room");P&&(P.value=o)});function $e(o){oe&&(oe.innerHTML=o.map(e=>`<div class="row" style="justify-content:space-between;"><span>${e.id} • ${e.host}</span><span>${e.players}/${e.max}</span></div>`).join(""))}function Z(){p=!p,C.textContent=p?"Resume":"Pause"}function g(){!y||!B||(m?(B.style.display="none",y.style.display="inline-block",h&&x?(y.disabled=!1,y.style.opacity="1",y.style.cursor="pointer",y.textContent="Start"):(y.disabled=!0,y.style.opacity="0.5",y.style.cursor="not-allowed",y.textContent=h?"Waiting Ready...":"Waiting for player...")):(y.style.display="none",B.style.display="inline-block"))}function w(){const o=document.getElementById("my-name");o&&(o.textContent=G);const e=document.getElementById("opponent-name");e&&(r?(e.textContent=r,x&&(e.textContent+=" ✅")):e.textContent="Waiting for opponent...")}function A(o){const e=document.getElementById("opponent-name");e&&r&&(e.textContent=r+(o?" ✅":""))}function _(o){const e=document.createElement("div");e.style.cssText=`
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
  `,e.textContent=o;const s=document.createElement("style");s.textContent=`
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `,document.head.appendChild(s),document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}function Oe(o){const e=document.createElement("div");if(e.style.cssText=`
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
  `,e.textContent=`💥 ${o}줄 공격! 💥`,!document.getElementById("attack-sent-style")){const s=document.createElement("style");s.id="attack-sent-style",s.textContent=`
      @keyframes slideUp {
        from { transform: translateX(-50%) translateY(20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    `,document.head.appendChild(s)}document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},1e3)}function pe(o){const e=document.createElement("div");if(e.style.cssText=`
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
  `,e.textContent=`⚠️ ${o}줄 공격 받음! ⚠️`,!document.getElementById("attack-style")){const s=document.createElement("style");s.id="attack-style",s.textContent=`
      @keyframes attackPulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
      }
    `,document.head.appendChild(s)}document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{document.body.removeChild(e)},300)},1500)}function ue(){const o=document.createElement("div");o.style.cssText=`
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
    `,document.head.appendChild(i)}o.appendChild(e),document.body.appendChild(o);const s=document.getElementById("btn-victory-leave");s==null||s.addEventListener("click",()=>{window.location.href="../multi/"})}function Pe(){const o=document.createElement("div");o.style.cssText=`
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
    `,document.head.appendChild(i)}o.appendChild(e),document.body.appendChild(o);const s=document.getElementById("btn-defeat-leave");s==null||s.addEventListener("click",()=>{window.location.href="../multi/"})}function F(o){const e=["3","2","1","GO!"];let s=0;const i=()=>{if(s>=e.length){o();return}const t=document.createElement("div");if(t.style.cssText=`
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
    `,t.textContent=e[s],!document.getElementById("countdown-style")){const n=document.createElement("style");n.id="countdown-style",n.textContent=`
        @keyframes countPulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          40% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        }
      `,document.head.appendChild(n)}document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t)},1e3),s++,s<e.length?setTimeout(i,1e3):setTimeout(o,1e3)};i()}function Ue(){if(b.consume("pause")&&Z(),b.consume("restart")&&(le(a),p=!1,C.textContent="Pause"),p||a.status!=="playing")return;const o=b.consume("left"),e=b.consume("right");o&&H(a,-1,0),e&&H(a,1,0),b.consume("softDrop")&&H(a,0,1),b.consume("rotateCW")&&te(a,1),b.consume("rotateCCW")&&te(a,-1),b.consume("hardDrop")&&be(a),b.consume("hold")&&we(a)}const je=new fe({update:o=>{Ue(),!p&&v&&Ie(a,o),Le(),ne!==a.status&&(a.status==="gameover"&&Ae(),ne=a.status)},render:()=>xe(a,_e)});je.start();const I=localStorage.getItem("tetris_room"),Q=localStorage.getItem("tetris_room_title");I&&window.location.pathname.includes("/game/")&&setTimeout(()=>{const e=window.__SUPABASE__;if(e!=null&&e.url&&(e!=null&&e.anonKey)){console.log(`[Game] Auto-joining room: ${I}`),l&&l.leave(),l=new de(e.url,e.anonKey),l.join(I,t=>{if(t.type==="state"){const n=t.payload;console.log("[Game] Received state from opponent"),f=n,n.attack&&n.attack>0&&(console.log(`[Game] Receiving ${n.attack} attack lines from opponent!`),ie(a,n.attack),pe(n.attack)),n.status==="gameover"&&a.status==="playing"&&!E&&(console.log("[Game] Opponent lost! You win!"),E=!0,ue(),p=!0,v=!1,C.textContent="Game Over"),j()}else if(t.type==="host_info"){const n=t.payload;console.log("[Game] Received host info:",n),!m&&n.name&&(r=n.name,h=!0,w(),g())}else if(t.type==="leave")t.payload.userId!==l.getUserId()&&(console.log(`[Game] Opponent left: ${r}`),_(`${r||"Opponent"} left the room`),r=null,h=!1,x=!1,f=null,j(),w(),g(),m&&c&&c.updatePlayers(1));else if(t.type==="join")t.payload.userId!==l.getUserId()&&(r=t.payload.name||"Guest",h=!0,w(),g(),console.log(`[Game] Opponent joined: ${r}`),_(`${r} joined the room!`),m&&c&&c.updatePlayers(2),m&&(console.log("[Game] Sending host info to guest"),l==null||l.send({type:"host_info",payload:{userId:l.getUserId(),name:G}})));else if(t.type==="ready"){console.log("[Game] Received ready event:",t.payload);const n=l.getUserId();console.log(`[Game] My userId: ${n}, Event userId: ${t.payload.userId}`),t.payload.userId!==n?(x=t.payload.ready,console.log(`[Game] Opponent ready status updated: ${x}`),g(),x?(console.log("[Game] Opponent is ready!"),_(`${r||"Opponent"} is ready!`),A(!0)):(console.log("[Game] Opponent is not ready"),A(!1))):console.log("[Game] Ignoring own ready event")}else if(t.type==="start"){const n=performance.now(),d=Math.max(0,t.payload.at-n-4e3);setTimeout(()=>{F(()=>{Object.assign(a,L(t.payload.seed)),p=!1,v=!0,E=!1,C.textContent="Pause"})},d)}},G);const s=localStorage.getItem("tetris_room_title")||I;M&&(M.textContent=`Room: ${s}`),m=localStorage.getItem("tetris_room_created")==="true",c||(c=new re(e.url,e.anonKey),c.join(G),m&&Q&&(console.log("[Game] Host maintaining room in lobby:",I),c.myRoomId=I,c.rooms.set(I,{id:I,host:G,title:Q,players:1,max:2,updatedAt:Date.now()}),c.isSubscribed&&c.updatePlayers(1)),c.onUpdate=t=>{const n=t.find(d=>d.id===I);n?(console.log("[Game] Room status:",n),m&&h&&(c==null||c.updatePlayers(2))):m&&Q&&(console.log("[Game] Room not found in lobby, maintaining it..."),c&&(c.myRoomId=I,c.updatePlayers(h?2:1)))}),w(),g()}},500);const ze="https://chbibdnqynilfuczbygg.supabase.co",Me="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYmliZG5xeW5pbGZ1Y3pieWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MDc0OTQsImV4cCI6MjA3MDI4MzQ5NH0.VuwTKXiU1Yx4C_fQCIp5X20m8SupxBkCKhQzN7Vqe20";window.__SUPABASE__={url:ze,anonKey:Me};k&&ce(k,V());q();window.addEventListener("resize",q);window.__tetris={getStatus:()=>a.status,isPaused:()=>p,pause:()=>{p||Z()}};window.addEventListener("beforeunload",()=>{m&&c&&c.closeRoom()});function Ae(){const o=a.score,e=V();if(l&&v&&f&&!E&&f.status==="playing"&&(console.log("[Game] You lost! Opponent wins!"),E=!0,Pe()),Ee(o,e)){const s=(localStorage.getItem("tetris_player_name")||"").trim(),i=(localStorage.getItem("tetris_nick")||"").trim();ve(s||i||"Anonymous",o,{level:a.level,lines:a.lines})}k&&(ce(k,V()),q());try{window.dispatchEvent(new CustomEvent("tetris:score-updated"))}catch{}}function q(){if(!k)return;const o=16,e=window.innerHeight,s=me.getBoundingClientRect(),i=Math.max(120,e-(s.bottom+o)-o);k.style.maxHeight=`${i}px`,k.style.overflowY="auto",document.body.style.paddingBottom=`${Math.ceil(k.getBoundingClientRect().height)+o}px`}let ae=0;function Le(){if(!l||!v)return;const o=performance.now();if(o-ae<200||(ae=o,!a))return;const e=Math.max(0,a.lines-se);se=a.lines;const s=e;s>0&&v&&(console.log(`[Game] Sending ${s} attack lines to opponent!`),Oe(s));const i={field:a.field.map(t=>t.map(n=>n?1:0)),active:a.active?{type:a.active.type,x:a.active.x,y:a.active.y,rotation:a.active.rotation}:null,score:a.score,level:a.level,lines:a.lines,status:a.status,attack:s>0?s:void 0};l.send({type:"state",payload:i})}function j(){if(!R)return;const o=R.getContext("2d");if(o.clearRect(0,0,R.width,R.height),!f){const n=Math.floor((R.width-320)/2),d=Math.floor((R.height-20*32)/2);o.strokeStyle="#1f2347",o.lineWidth=1;for(let u=0;u<20;u++)for(let $=0;$<10;$++)o.strokeRect(n+$*32,d+u*32,32,32);return}const e=32,s=Math.floor((R.width-10*e)/2),i=Math.floor((R.height-20*e)/2);o.strokeStyle="#1f2347",o.lineWidth=1;for(let t=0;t<20;t++)for(let n=0;n<10;n++)o.strokeRect(s+n*e,i+t*e,e,e);for(let t=2;t<f.field.length;t++)for(let n=0;n<f.field[0].length;n++)f.field[t][n]&&(o.fillStyle="#6ea8fe",o.fillRect(s+n*e+1,i+(t-2)*e+1,e-2,e-2));if(f.active){const t=f.active,n=t.type,d=t.rotation,u=ge({type:n,rotation:d,x:t.x,y:t.y}),$=he[n];o.fillStyle=$;for(let O=0;O<u.length;O++)for(let z=0;z<u[O].length;z++)if(u[O][z]){const N=t.x+z,ee=t.y+O;ee>=2&&N>=0&&N<10&&o.fillRect(s+N*e+1,i+(ee-2)*e+1,e-2,e-2)}}}
