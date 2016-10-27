app.controller('myCtrl', function ($scope, $location, LeanCloudClassService,$q) {


    //$scope.panduan = true;
    //
    //if(localStorage.getItem('AV/FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz/currentUser')) {
    //    $scope.panduan = false;
    //}
    var arr = [];
    $scope.logout = function () {
        localStorage.removeItem('articleId');
        AV.User.logOut();
        var currentUser = AV.User.current();
        if (currentUser) {
            console.log('失败！')
        } else {
            $location.path('/home');
        }
    }

    function getUserImg() {

        LeanCloudClassService.query("CameraPosition", {
            where: {
                user: {$ne: null}
            },
            order: "-createdAt"
        }, function (data) {

            data.forEach(function (item) {
                arr.push(test(item))

            });
             $q.all(arr).then(function(data){
                 localStorage.setItem('imgInfo', JSON.stringify(data));
            });
        });
    }

    function test(item){
        var defer = $q.defer();
        var promise = defer.promise;

        LeanCloudClassService.test_query("_User", {where: {objectId: item.user.objectId}}, function (userInfo) {
            item.username = userInfo[0].username
            defer.resolve(item);
        });
        return promise
    }

    getUserImg();

})