app.controller('addController',function($scope,add_article,$mdToast,tinymceSetting) {
    $scope.publish_article = function() {
        if($scope.article_title && $scope.article_type) {
            add_article.add($scope.article_title,$scope.article_type,tinyMCE.activeEditor.getContent({format: 'raw'}),function () {
               console.log(tinyMCE.activeEditor.getContent({format: 'raw'}));
                var pinTo = $scope.getToastPosition();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('发表成功！')
                        .position(pinTo )
                        .hideDelay(3000)
                );
            });
        }
        console.log(tinyMCE.activeEditor.getContent({format: 'raw'}));
    }

    tinymceSetting.setting();

    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;

        last = angular.extend({},current);
    }
})