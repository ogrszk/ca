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
}
console.log(tt);

function refresh(){
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
		}
	}
}

function pushMine(){
	for(y=0;y<f_n;y++){
		for(x=0;x<f_n;x++){
			if(m_st[x][y]){
				var a = document.getElementById("x"+x+"y"+y);
				a.classList.add("pushedMine");
			}
		}
	}
}

function clickGrid(x,y) {
//	alert(x+','+y);
	p_st[x][y] = true;
	if(m_st[x][y]) pushMine();
	var a = document.getElementById("x"+x+"y"+y);
	a.classList.add("pushed");
	refresh();
	
	
}

tmp = document.createDocumentFragment();

// var str = document.createTextNode("あ");	// 生成する要素の値（文字列）
// grid.appendChild(str);
for(y=0;y<f_n;y++){
	for(x=0;x<f_n;x++){

		var grd = document.createElement("div");
		grd.id = 'x'+x+'y'+y;
		grd.classList.add("grid");
		var f = "clickGrid("+x+","+y+");";
		grd.setAttribute('onclick',f);
	// var elemLi2 = elemLi.cloneNode(true);
		tmp.appendChild(grd);
	}
	var br = document.createElement("br");
	tmp.appendChild(br);

}

field.appendChild(tmp);

