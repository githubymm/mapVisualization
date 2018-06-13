// 初始化地图并将视图设置为所选的地理坐标和缩放级别,并添加图层
// center:[纬度,经度]
var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var map = new L.Map("mapc-ount", {
        center: [28.12, 112.98],
        zoom: 16,
        mimZoom: 8,
        maxZoom: 30
    })
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }));

drawPolygon("data/长沙市村级人口统计/长沙市村级人口统计_1.json");

// 绘制轮廓
function drawPolygon(url) {
    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

    d3.json(url, function(error, data) {
        if (error) {
            console.log("error");
            return console.error(error);
        }
        console.log(data.features);

        // 使用Leaflet实现D3几何变换
        var projection = {
                stream: function(listener) {
                    return {
                        point: function(x, y) {
                            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                            listener.point(point.x, point.y);
                        },
                        lineStart: function() {
                            listener.lineStart();
                        },
                        lineEnd: function() {
                            listener.lineEnd();
                        },
                        polygonStart: function() {
                            listener.polygonStart();
                        },
                        polygonEnd: function() {
                            listener.polygonEnd();
                        }
                    };
                }
            }
            // 投射点数，使用d3.geo.path来将GeoJSON转换为SVG
        /*var transform = d3.geo.transform({
                point: projection
            }),*/
            path = d3.geo.path().projection(projection);

        console.log("sdf");
        console.log(data.features[0]);
        console.log(data.features[100]);
        // 使用D3的数据为每个特征创建路径元素
        var feature = g.selectAll("path")
            .data(data.features)
            .enter().append("path");

        map.on("viewreset", reset);
        reset();

        // 重新定位SVG以覆盖features
        // SVG拟合到一个图层，SVG的大小取决于显示的地理特征和当前缩放级别
        function reset() {
            // 计算给定要素的投影边界
            var bounds = path.bounds(data),
                topLeft = bounds[0],
                bottomRight = bounds[1];
            // console.log(topLeft);
            // console.log(bottomRight);
            var color=d3.scale.category20();
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



    });
}