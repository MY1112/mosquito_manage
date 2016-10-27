app.controller("changeController",function(get_article,$scope,change_article,$mdToast,tinymceSetting) {
    var article_Id = localStorage.getItem('articleId');
    get_article.call(article_Id,function(data) {
        $scope.article_title = data.attributes.title;
        $scope.article_type = data.attributes.type;
        tinyMCE.activeEditor.setContent(data.attributes.content);
    });

    $scope.save_article = function() {
        change_article.updata($scope.article_title,$scope.article_type,tinyMCE.activeEditor.getContent({format: 'raw'}),article_Id,function () {
            var pinTo = $scope.getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('保存成功！')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        });
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
});
