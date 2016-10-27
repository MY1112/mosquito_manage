var app = angular.module('routingDemoApp',['ngRoute','ngMaterial']);

app.run(function() {
    var APP_ID = 'FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz';
    var APP_KEY = 'Ronj9oBORrmjCDx2HdlhCwr3';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
})



app.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('light-blue');
    $routeProvider
        .when('/home',{
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/jump',{
            templateUrl: 'views/jump.html',
            controller: 'jumpController'
        })
        .when('/login',{
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/add_article',{
            templateUrl: 'views/add_article.html',
            controller: 'addController'
        })
        .when('/the_article',{
            templateUrl: 'views/the_article.html',
            controller: 'articleController'
        })
        .when('/change_article',{
            templateUrl: 'views/change_article.html',
            controller: 'changeController'
        })
        .when('/manage',{
            templateUrl: 'views/manage.html',
            controller: 'manageCtrl'
        })
        .when('/manageImg',{
            templateUrl: 'views/manageImg.html',
            controller: 'manageImgCtrl'
        }).when('/map',{
            templateUrl: 'views/map.html',
            controller: 'mapController'
        }).when('/choose_province',{
            templateUrl: 'views/choose_province.html',
            controller: 'chooseProvinceController'
        })

        .otherwise({redirectTo:'/home'});
}]);
