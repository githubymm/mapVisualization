// 初始化地图并将视图设置为所选的地理坐标和缩放级别,并添加图层
// center:[纬度,经度]
var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var map = new L.Map("mapDiv", {
        center: [28.80, 113.08],
        zoom: 15,
        mimZoom: 8,
        maxZoom: 20
    })
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }));

drawMiluo();

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


// 绘制汨罗市轮廓
function drawMiluo() {
    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    d3.json("data/miluo.json", function(error, miluo) {
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
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

    });
}

 
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
    if (markerColor == undefined||markerColors.indexOf(markerColor)<0) {
        markerColor = 'blue';
        console.log(icon+"图标底色未定义或图标底色不正确！")
    }
    if (iconColor == undefined) {
        iconColor = '#fff';
    }
    if (spin == undefined) {
        spin = false;
    }
    // console.log(icon);
    $.getJSON(url, function(data) {
        // console.log(data.features);
        var features = data.features;
        var coordinates = new Array();
        var titles = new Array();
        var description = new Array();

        if (features instanceof Array) {
            $.each(features, function(index, item) {
                coordinates.push(item.geometry.coordinates);
                // console.log(item.properties);
                //BZMC 雅格云莱酒店,DLSTGK 位于归义镇集镇,DMDHY 酒店服务行业,
                //DMDLL 由商家老板取名,DMDLSYG 自开业以来未曾更名
                var contents = item.properties.BZMC + "<br/>" + item.properties.DLSTGK +
                    "<br/>" + item.properties.DMDHY + "<br/>" + item.properties.DMDLL + "<br/>" + item.properties.DMDLSYG;
                titles.push(item.properties.BZMC);
                description.push(contents);
            });
        }
        for (var i = 0; i < coordinates.length; i++) {
            // console.log(typeof coordinates[i][1]);
            L.marker([coordinates[i][1], coordinates[i][0]], {
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
                .bindPopup("<p>" + description[i] + "</p>")
                .openPopup();
        }
    });
}

/**
 * 画线
 *@param url 请求文件地址
 *
 * @return
*/
function drawLine(url){

}