app.controller('chooseProvinceController', function ($scope, $location, get_user_access_result, $q) {
    $scope.provinces = ["广东省", "云南省", "广西壮族自治区", "海南省", "福建省", "浙江省", "上海市"]
    $scope.getProvince = function (city) {
        get_user_access_result.get_all(city, function (results) {
            localStorage.setItem('chooseProvince', JSON.stringify(results))
            var user_infos = [];
            results.forEach(function (provinceInfo,index) {
                user_infos.push(test(provinceInfo,index))
            })
            $q.all(user_infos).then(function (data) {
                localStorage.setItem('showUserInfo', JSON.stringify(data));
                $location.path("/map")
            });
        })
    }

    function test(provinceInfo,index) {
        var defer = $q.defer();
        var promise = defer.promise;
        var user_info = {}
        var point = new BMap.Point(provinceInfo._serverData.lastpicture_location._longitude, provinceInfo._serverData.lastpicture_location._latitude);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            user_info.address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
            user_info.id = provinceInfo.id;
            user_info.num = index + 1
            defer.resolve(user_info)
        });
        return promise
    }

});