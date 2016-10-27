app.directive('getAll',function() {
    return {
        restrict: 'EA',
        controller: 'articleController',
        template: "<table class='articleTable'>"+
        "<tr>"+
        "<th>文章名称</th>"+
        "<th>文章类型</th>"+
        "<th>操作</th>"+
        "<th>删除</th>"+
        "</tr>"+
        "<tr id='{{allArticle.id}}' ng-repeat='allArticle in allArticles'>"+
        "<td>{{allArticle.attributes.title}}</td>"+
        "<td>{{allArticle.attributes.type}}</td>"+
        "<td><md-button class='md-fab md-mini md-primary' ng-click='change_article(allArticle.id)' aria-label='修改'><md-icon md-svg-src='views/images/pencil.svg'></md-icon></md-button>"+
        "<td><md-button class='md-fab md-mini md-primary' ng-click='delete_article(allArticle.id)' aria-label='删除'><md-icon md-svg-src='views/images/trash.svg'></md-icon></md-button></td>"+
        "</tr>"+
        "</table>"
    }
});
