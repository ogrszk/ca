var f_n = 5;	// フィールドの大きさ
var m_n = 5;	// 地雷の数

var p_st = [];	// 押したかどうか
for(i=0;i<f_n;i++){
	p_st[i] = [];
	for(j=0;j<f_n;j++){
		p_st[i][j] = false;
	}
}

var m_st = [];	// 地雷があるかどうか
for(i=0;i<f_n;i++){
	m_st[i] = [];
	for(j=0;j<f_n;j++){
		m_st[i][j] = false;
	}
}
var r = [];
for(i=0;i<f_n*f_n;i++){
	r[i] = i;
}
for(i=0;i<m_n;i++){
	var t = Math.floor(Math.random()*f_n*f_n);
	console.log(t);
	var tmp = r[i];
	r[i] = r[t];
	r[t] = tmp;
}
console.log(r);
var ttt;
for(i=0;i<m_n;i++){
	m_st[r[i]%f_n][Math.floor(r[i]/f_n)] = true;
	ttt = (r[i]%f_n)+","+(Math.floor(r[i]/f_n));
	console.log(ttt);
}
var tt = "";
for(y=0;y<f_n;y++){
	for(x=0;x<f_n;x++){
		tt += m_st[x][y] + ",";
	}
	tt += ('|');
}

console.log(tt);

function howManyMine (x,y) {
	var aroundMine = 0;
	if(x>0){
		if(y>0 && m_st[x-1][y-1]) aroundMine++;
		if(m_st[x-1][y]) aroundMine++;
		if(y<f_n-1 && m_st[x-1][y+1]) aroundMine++;
	}
	if(y>0 && m_st[x][y-1]) aroundMine++;
	if(y<f_n-1 && m_st[x][y+1]) aroundMine++;

	if(x<f_n-1){
		if(y>0 && m_st[x+1][y-1]) aroundMine++;
		if(m_st[x+1][y]) aroundMine++;
		if(y<f_n-1 && m_st[x+1][y+1]) aroundMine++;
	}
	return aroundMine;
}

function refresh () {
	var clear = true;
	for(y=0;y<f_n;y++){
		for(x=0;x<f_n;x++){
			var a = document.getElementById("x"+x+"y"+y);
			a.classList.remove("shadow_tl","shadow_l","shadow_t");
			if(p_st[x][y]){
				if(x>0 && y>0 && !p_st[x][y-1] && !p_st[x-1][y]){
					a.classList.add("shadow_tl");
				}else if(x>0 && !p_st[x-1][y]){
					a.classList.add("shadow_l");
				}else if(y>0 && !p_st[x][y-1]){
					a.classList.add("shadow_t");
				}
			}
			if(p_st[x][y]==m_st[x][y]){
				clear = false;
			}
		}
	}
	if(clear){
		var b = document.getElementById("field");
		b.classList.add("cleared");
		alert('Cleared');
	}
}

function pushMine () {
	for(y=0;y<f_n;y++){
		for(x=0;x<f_n;x++){
			if(m_st[x][y]){
				var a = document.getElementById("x"+x+"y"+y);
				a.classList.add("pushedMine");
			}
		}
	}
}

function clickGrid (x,y) {
//	alert(x+','+y);
	p_st[x][y] = true;
	var a = document.getElementById("x"+x+"y"+y);
	a.classList.add("pushed");

	if(m_st[x][y]){
		pushMine();
	}else{
		var k = howManyMine(x,y);
		if(k) a.classList.add("m"+k);
	}

	refresh();
}

function cntxtGrid (x,y) {
	var a = document.getElementById("x"+x+"y"+y);
	a.classList.toggle("putFlag");
}

tmp = document.createDocumentFragment();

for(y=0;y<f_n;y++){
	for(x=0;x<f_n;x++){

		var grd = document.createElement("div");
		grd.id = 'x'+x+'y'+y;
		grd.classList.add("grid");
		grd.setAttribute('onclick','clickGrid('+x+','+y+');');
		grd.setAttribute('oncontextmenu','cntxtGrid('+x+','+y+');return false');

		tmp.appendChild(grd);
	}
	var br = document.createElement("br");
	tmp.appendChild(br);

}

field.appendChild(tmp);

