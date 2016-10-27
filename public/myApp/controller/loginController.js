app.controller('loginController',function($scope,$location,login_manager) {

    var wait=60;
    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.value="免费获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value="重新发送(" + wait + ")";
            wait--;
            setTimeout(function() {
                    time(o)
                },
                1000)
        }
    }
    document.getElementById("btn").onclick=function(){
        if($scope.loginPhone) {
            time(this);
            AV.User.requestLoginSmsCode($scope.loginPhone).then(function (success) {
                console.log('***********fd**********')
            }, function (error) {
                console.log(error)
            });
        }
    }



    $scope.manage_login = function() {
        if($scope.loginPhone && $scope.loginCode){
            login_manager.call($scope.loginPhone,$scope.loginCode,function(data) {
                if(data.attributes.type == 'admin') {
                    $location.path('/jump')
                }
            })
        }
    }
})