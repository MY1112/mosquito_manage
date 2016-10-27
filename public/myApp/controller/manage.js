/**
 * Created by liu on 16-8-25.
 */
app.controller('manageCtrl', function ($scope,$location, LeanCloudClassService,delete_leancloud) {
    function getTotalUser() {
        LeanCloudClassService.query("_User", {where: {objectId: {$nin: [localStorage.getItem("AV/FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz/currentUser").objectId]}}}, function (data) {
            $scope.userInfo = data;
        })
    }

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: JSON.parse(localStorage.getItem('imgInfo')).length,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            //$ionicScrollDelegate.scrollTop(false);
            var page = $scope.paginationConf.currentPage;
            $scope.imgInfo = JSON.parse(localStorage.getItem('imgInfo')).slice((page - 1) * 10, page * 10);
        }
    };

    function init() {
        getTotalUser();
    }

    init();

    $scope.deleteImg = function (id) {
        delete_leancloud.call('CameraPosition',id);
        document.getElementById(id).remove();
    };

    $scope.goToManageImg = function (id) {
        localStorage.setItem('userId',id);
        $location.path('/manageImg')
    };
});