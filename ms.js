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

function clickGrid(x,y) {
//	alert(x+','+y);
	var a = document.getElementById("x"+x+"y"+y);
	a.classList.add("pushed");
	p_st[x][y] = true;
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

