// 初始化地图并将视图设置为所选的地理坐标和缩放级别,并添加图层
// center:[纬度,经度]
var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var map = new L.Map("mapDiv", {
        center: [20.80, 113.08],
        zoom: 16,
        mimZoom: 8,
        maxZoom: 30,
        zoomControl: false,
    })
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }));
// 自定义缩放按钮
L.control.zoom({
     position:'topright'
}).addTo(map);

// drawPolygon("data/miluo.json");
// drawPolygon("data/changsha.json");
/*
drawPoint("data/汨罗市一公里测试数据/c276民政事务网点_Clip.json", "cog", "cadetblue");
drawPoint("data/汨罗市一公里测试数据/c2741酒店_Clip.json", "fa-hotel", "red");
drawPoint("data/汨罗市一公里测试数据/c2651集贸市场专业市场_Clip.json", "shopping-cart");
drawPoint("data/汨罗市一公里测试数据/c271党政机关社会组织事业单位企业_Clip.json");
drawPoint("data/汨罗市一公里测试数据/c2631广场体育场_Clip.json", "fa-soccer-ball-o");
drawPoint("data/汨罗市一公里测试数据/c2365环岛路口_Clip.json", "fa-refresh", "lightgreen");
drawPoint("data/汨罗市一公里测试数据/c2353公共交通车站_Clip.json", "fa-bus", "gray");
drawPoint("data/汨罗市一公里测试数据/c2333道口_Clip.json", "fa-map-signs", "lightgray");
drawPoint("data/汨罗市一公里测试数据/c221城镇居民点_Clip.json", "fa-star", "green");
drawPoint("data/汨罗市一公里测试数据/c2163村民小组_Clip.json", "fa-group", "orange");
drawPoint("data/汨罗市一公里测试数据/c216村民委员会_Clip.json", "fa-group", "green");
*/
drawLine("data/汨罗市一公里测试数据/c121河流_Clip.json","#aad3df", 10, "#aad3df");
drawLine("data/汨罗市一公里测试数据/c2331铁路_Clip.json","#717171",5,"#717171");
// drawLine("data/汨罗市一公里测试数据/c2351道路街巷_Clip.json", "#fff", 5, "#fff");
drawLine("data/汨罗市一公里测试数据/c2361桥梁_Clip.json", "#f7fabf", 10, "#f7fabf");

//点击菜单，调用函数绘制地点
window.onload = function() {
    drawPoint("data/miluocity.json", "fa-star", "red");
    var menuList = document.getElementById("menuList");
    menuList.onclick = function(ev) {
        var ev = ev || window.event;　　　　
        var target = ev.target || ev.srcElement;　　　　
        if (target.nodeName.toLowerCase() == 'li') {　　
            switch (target.id) {
                case 'cities':
                    // alert(target.innerHTML);
                    drawPoint("data/汨罗市一公里测试数据/c221城镇居民点_Clip.json", "fa-star", "green");
                    drawPoint("data/汨罗市一公里测试数据/c2163村民小组_Clip.json", "fa-group", "orange");
                    drawPoint("data/汨罗市一公里测试数据/c216村民委员会_Clip.json", "fa-group", "green");
                    break;
                case 'transport':
                    // alert(target.innerHTML);
                    drawPoint("data/汨罗市一公里测试数据/c2365环岛路口_Clip.json", "fa-refresh", "lightgreen");
                    drawPoint("data/汨罗市一公里测试数据/c2353公共交通车站_Clip.json", "fa-bus", "gray");
                    drawPoint("data/汨罗市一公里测试数据/c2333道口_Clip.json", "fa-map-signs", "lightgray");
                    break;
                case 'life':
                    // alert(target.innerHTML);
                    drawPoint("data/汨罗市一公里测试数据/c276民政事务网点_Clip.json", "cog", "cadetblue");
                    drawPoint("data/汨罗市一公里测试数据/c2741酒店_Clip.json", "fa-hotel", "red");
                    drawPoint("data/汨罗市一公里测试数据/c2651集贸市场专业市场_Clip.json", "shopping-cart");
                    drawPoint("data/汨罗市一公里测试数据/c2631广场体育场_Clip.json", "fa-soccer-ball-o");
                    break;
                case 'work':
                    // alert(target.innerHTML);
                    drawPoint("data/汨罗市一公里测试数据/c271党政机关社会组织事业单位企业_Clip.json");
                    break;
                default:
                    alert("请选择菜单！")
            }　　　
        }　　
    }
}



// 绘制面
function drawPolygon(url) {

    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");


    d3.json(url, function(error, miluo) {
        if (error) {
            console.log("error");
            return console.error(error);
        }

        // 投射点数，使用d3.geo.path来将GeoJSON转换为SVG
        var transform = d3.geo.transform({
                point: projectPoint
            }),
            path = d3.geo.path().projection(transform);

        // 使用D3的数据为每个特征创建路径元素
        var feature = g.selectAll("path")
            .data(miluo.features)
            .enter().append("path");

        map.on("viewreset", reset);
        reset();

        // 重新定位SVG以覆盖features
        // SVG拟合到一个图层，SVG的大小取决于显示的地理特征和当前缩放级别
        function reset() {
            // 计算给定要素的投影边界
            var bounds = path.bounds(miluo),
                topLeft = bounds[0],
                bottomRight = bounds[1];
            // console.log(topLeft);
            // console.log(bottomRight);

            svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px");

            g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

            feature.attr("d", path)
                .attr("stroke", "#1D5FDC")
                .attr("stroke-width", 1.5)
                .style("fill-opacity", 0);
        }

        // 使用Leaflet实现D3几何变换
        // 投影单个点，并将生成的坐标传输给输出几何流
        function projectPoint(x, y) {
            // latLngToLayerPoint(<LatLng>latlng) 返回地图图层上与地理坐标相一致的点
            // L.LatLng(Number lat,Number lng) lat为纬度，lng为经度，表示通过某一经度和纬度确定的地理上的点
            // stream.point 表面x, y (可选的 z) 坐标
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

    });
}


var allPlaces=new Array();
var placeStyle;
var marker;
/**
 * 画点
 *@param url 请求文件地址
 *@param icon 图标名称
 *@param markerColor 图标底色,其取值是有限制的
 *@param iconColor 图标颜色,可随意输入颜色值,#xxx
 *@param spin 图标是否转动（ture/false）
 *
 * @return
 */

function drawPoint(url, icon, markerColor, iconColor, spin) {
    var markerColors = ["red", "darkred", "lightred", "orange", "beige", "green", "darkgreen",
        "lightgreen", "blue", "darkblue", "lightblue", "cadetblue", "purple", "darkpurple", "pink",
        "white", "gray", "lightgray", "black"
    ];
    if (url === null || url.lastIndexOf(".json") < -1) {
        alert("未传入文件或传入的文件格式不正确！")
    }
    // console.log(icon);
    if (icon == undefined) {
        icon = 'circle';
    }
    if (markerColor == undefined || markerColors.indexOf(markerColor) < 0) {
        markerColor = 'blue';
        // console.log(icon + "图标底色未定义或图标底色不正确！")
    }
    if (iconColor == undefined) {
        iconColor = '#fff';
    }
    if (spin == undefined) {
        spin = false;
    }

    d3.json(url, function(error,data) {
        var features = data.features;
        var coordinates = new Array();
        var titles = new Array();
        var description = new Array();
        var placeId=new Array();

        if (features instanceof Array) {
            $.each(features, function(index, item) {
                coordinates.push(item.geometry.coordinates);
                // console.log(item.properties);
                //BZMC 雅格云莱酒店,DLSTGK 位于归义镇集镇,DMDHY 酒店服务行业,
                //DMDLL 由商家老板取名,DMDLSYG 自开业以来未曾更名
                // console.log("data.features");
                // console.log(data.features);
                var contents="<ul><li><h4>"+item.properties.BZMC+
                "</h4></li><li><p>"+item.properties.DLSTGK+"</p></li><li><p>"+
                item.properties.DMDHY+"</p></li><li><p>"+item.properties.DMDLL+
                "</p></li><li><p>"+item.properties.DMDLSYG+"</p></li></ul>";
                
                /*var contents = item.properties.BZMC +"<br/>"+item.properties.DLSTGK +
                    item.properties.DMDHY + item.properties.DMDLL + item.properties.DMDLSYG;*/
                titles.push(item.properties.BZMC);
                description.push(contents);
                placeId.push(item.properties.Id);
            });
        }

        
        for(var j=0;j<titles.length;j++){
            allPlaces[j]=new Array();
            // for(k=0;k<titles.length;k++){
                allPlaces[j][j]=titles[j]+","+placeId[j];
            // }
        }
    console.log("allPlaces");

console.log(allPlaces);
        for (var i = 0; i < coordinates.length; i++) {
            // console.log(typeof coordinates[i][1]);
            marker=L.marker([coordinates[i][1], coordinates[i][0]], {
                    title: titles[i],
                    opacity: 0.9,
                    draggable: false,
                    icon: L.AwesomeMarkers.icon({
                        icon: icon,
                        prefix: 'fa',
                        markerColor: markerColor,
                        iconColor: iconColor,
                        spin: spin
                    })
                })
                .addTo(map)
                .bindPopup("<div id='placeMsg'>" + description[i] + "</div>")
                .openPopup();

            // allPlaces[i]=titles[i];
            
            // console.log(marker._icon.className);
            // console.log("marker");
            // console.log(marker);
            // marker._icon.className=marker._icon.className+" placesId-"+placeId[i];
            // console.log(marker._icon.className);

            // allPlaces[i]=new Array();

        }
        
    });

}
    // console.log(allPlaces);


    
/**
 * 画线
 *@param url 请求文件地址
 *
 * @return
 */
function drawLine(url, stroke, strokeWidth, fill) {
    if (url === null || url.lastIndexOf(".json") < -1) {
        alert("未传入文件或传入的文件格式不正确！")
    }
    if (stroke == undefined || !findString(stroke, "#")) {
        stroke = "#7C68AD";
    }
    if (strokeWidth == undefined || typeof strokeWidth != "number") {
        strokeWidth = 5;
    }
    if (fill == undefined || !findString(stroke, "#")) {
        fill = "#7C68AD";
    }

    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    d3.json(url, function(error, data) {
        if (error) {
            console.log("error");
            return console.error(error);
        }
        console.log("data");

        console.log(data);
        // 投射点数，使用d3.geo.path来将GeoJSON转换为SVG
        var transform = d3.geo.transform({
                point: projectPoint
            }),
            path = d3.geo.path().projection(transform);

        // 使用D3的数据为每个特征创建路径元素
        var feature = g.selectAll("path")
            .data(data.features)
            .enter().append("path");

        var text = g.selectAll("text")
            .data(data.features)
            .enter().append("text");
        // console.log(data.features);

        map.on("viewreset", reset);
        reset();

        // 重新定位SVG以覆盖features
        // SVG拟合到一个图层，SVG的大小取决于显示的地理特征和当前缩放级别
        function reset() {
            // 计算给定要素的投影边界
            var bounds = path.bounds(data),
                topLeft = bounds[0],
                bottomRight = bounds[1];
            // console.log("topLeft "+topLeft);
            // console.log(bottomRight);

            // 取得或设置渲染上下文
            // var context=path.context(data.features[0].properties.BZMC);
            // console.log(data.features[0].properties.BZMC);

            svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px");

            g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

            feature.attr("d", path)
                .attr("stroke", stroke)
                .attr("stroke-width", strokeWidth)
                .attr("fill", fill);
            
            text.attr({
                    'x': topLeft[0] + (bottomRight[0] - topLeft[0]) / 2,
                    'y': topLeft[1] + (bottomRight[1] - topLeft[1]) / 2,
                    'dy': '.35em'

                })
                .style({
                    "text-anchor": function(d) {
                        return 'middle';
                    }
                })
                .text(function(d, i) {
                    // console.log(d);
                    // console.log(i);
                    // console.log(d.properties.BZMC)
                    return d.properties.BZMC;

                });
        }

        // 使用Leaflet实现D3几何变换
        // 投影单个点，并将生成的坐标传输给输出几何流
        function projectPoint(x, y) {
            // latLngToLayerPoint(<LatLng>latlng) 返回地图图层上与地理坐标相一致的点
            // L.LatLng(Number lat,Number lng) lat为纬度，lng为经度，表示通过某一经度和纬度确定的地理上的点
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            // console.log("!!!!!");
            // console.log(point);
            this.stream.point(point.x, point.y);
        }

        function msgbox() {
            $("body").append("div")
        }
    });
}

/**
 * 查找字符串位置
 *@param stringValue 字符串
 *@param el 要查找的字符
 *
 * @return true/false
 */
function findString(stringValue, el) {
    // console.log(stringValue.length);
    if (stringValue.length == 7 || stringValue.length == 4) {
        var positions = new Array();
        var pos = stringValue.indexOf(el);

        while (pos > -1) {
            positions.push(pos);
            var flag = positions[0];
            pos = stringValue.indexOf(el, pos + 1);
        }
        var len = positions.length;
        if (flag == 0 && len == 1) {
            return true;
        }
    }

    return false;
}

/**
 * 搜索地点
 *@param inputPlace 输入的地点名
 *@param el 
 *
 * @return 
 */
function findPlaces() {
    var keyWord = $("#startP").val();
    console.log(keyWord);
    
    //方法一，字符串方法indexOf
    var len = allPlaces.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (allPlaces[i].indexOf(keyWord) >= 0) {
            arr.push(allPlaces[i]);
        }
    }
    if(arr==false){
        alert("该地点未进行标记！")
    }
    return arr;
/*
    //方法二，正则表达式
    var len = allPlaces.length;
    var arr = [];
    var reg = new RegExp(keyWord);
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (allPlaces[i].match(reg)) {
            arr.push(allPlaces[i]);
        }
    }
    return arr;
*/


}


