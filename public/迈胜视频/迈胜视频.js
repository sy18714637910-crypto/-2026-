const film=document.querySelector('#film');
const play=document.querySelector('#play');
film.querySelector('source').src='https://media.githubusercontent.com/media/sy18714637910-crypto/-2026-/main/迈胜视频/健康不将就，为更好的明天。迈胜医疗@亚布力中国企业家论坛 _xWT111_1280x720.mp4';
film.load();
play.addEventListener('click',()=>film.play());
film.addEventListener('play',()=>{play.hidden=true});
film.addEventListener('click',()=>{if(film.paused)film.play();else film.pause()});
