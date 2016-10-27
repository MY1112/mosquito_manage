app.controller('articleController',function($scope,get_all_article,$location,delete_leancloud) {

    get_all_article.get_all(function(data) {
        $scope.allArticles = data;
    });

    $scope.change_article = function(articleId) {
        localStorage.setItem('articleId',articleId);
        $location.path('/change_article');
    }

    $scope.delete_article = function(articleId) {
        delete_leancloud.call('Article',articleId)
        document.getElementById(articleId).remove();
    }




})