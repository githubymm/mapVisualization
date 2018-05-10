// 初始化地图并将视图设置为所选的地理坐标和缩放级别,并添加图层
// center:[纬度,经度]
var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var map = new L.Map("mapDiv", {
        center: [28.80, 113.08],
        zoom: 10,
        mimZoom: 8,
        maxZoom: 18
    })
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }));

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

// 汨罗市区
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
        console.log(topLeft);
        console.log(bottomRight);

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

// 酒店
$.getJSON("data/汨罗市一公里测试数据/c2741酒店_Clip.json", function(data) {
    console.log(data.features);
    var hotel_features = data.features;
    var hotel_coordinates = new Array();
    var hotel_titles = new Array();
    var hotel_description = new Array();

    if (hotel_features instanceof Array) {
        $.each(hotel_features, function(index, item) {
            hotel_coordinates.push(item.geometry.coordinates);
            console.log(item.properties);
            //BZMC 雅格云莱酒店,DLSTGK 位于归义镇集镇,DMDHY 酒店服务行业,
            //DMDLL 由商家老板取名,DMDLSYG 自开业以来未曾更名
            var contents = item.properties.BZMC + "<br/>" + item.properties.DLSTGK +
                "<br/>" + item.properties.DMDHY + "<br/>" + item.properties.DMDLL + "<br/>" + item.properties.DMDLSYG;
            hotel_titles.push(item.properties.BZMC);
            hotel_description.push(contents);
        });
    }
    for (var i = 0; i < hotel_coordinates.length; i++) {
        console.log(typeof hotel_coordinates[i][1]);
        L.marker([hotel_coordinates[i][1], hotel_coordinates[i][0]], {
                title: hotel_titles[i],
                opacity: 0.9,
                draggable: true
            })
            .addTo(map)
            .bindPopup("<p>" + hotel_description[i] + "</p>")
            .openPopup();
    }
});