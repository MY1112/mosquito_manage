/**
 * Created by liu on 16-8-25.
 */
app.controller('manageImgCtrl', function ($scope, $location, LeanCloudClassService,delete_leancloud, promptBox) {

    function init() {
        getImgInfo();
    }

    function getImgInfo() {
        var query = {
            "__type": "Pointer",
            "className": "_User",
            "objectId": localStorage.getItem('userId')
        };
        LeanCloudClassService.query("CameraPosition",{
            where: {
                user: query
            },
            order: "-createdAt"
        }, function (data) {
            if (data.length === 0) {
                $location.path("/manage");
                promptBox.prompt("该用户尚未发表图片");
            }
            $scope.userImgInfo = data;
        });
    }

    init();

    $scope.deleteImg = function (id) {
        delete_leancloud.call('CameraPosition',id)
        document.getElementById(id).remove();
    };
});
