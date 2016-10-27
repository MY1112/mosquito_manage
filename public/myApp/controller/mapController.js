/**
 * Created by lenovo on 16-10-21.
 */
app.controller('mapController', function ($scope) {
    var map = new BMap.Map("container");
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: JSON.parse(localStorage.getItem("chooseProvince")).length,//localStorage.getItem("mapInfo").length,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            var page = $scope.paginationConf.currentPage;
            console.log(localStorage.getItem('showUserInfo'))
            $scope.mapInfo = JSON.parse(localStorage.getItem('showUserInfo')).slice((page - 1) * 10, page * 10);
        }
    };

    // map.centerAndZoom(new BMap.Point(121.530227,31.585016), 15);
    $scope.get_map = function () {
        var provinceInfo = JSON.parse(localStorage.getItem('chooseProvince'))
        for (var i = 0; i < provinceInfo.length; i++) {
            //var point = new BMap.Point(provinceInfo[i].lastpicture_location.longitude, provinceInfo[i].lastpicture_location.latitude);
            //map.centerAndZoom(point, 15);
            //var marker = new BMap.Marker(point);
            //map.addOverlay(marker);

            addOverlay(provinceInfo[i], i)
        }
    }

    $scope.get_map()


    function addOverlay(item, value) {
        console.log(value)
        var myIcon = new BMap.Icon("views/images/ditu.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - value * 25)
        });
        var point = new BMap.Point(item.lastpicture_location.longitude, item.lastpicture_location.latitude);
        map.centerAndZoom(point, 15);
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
    }



});