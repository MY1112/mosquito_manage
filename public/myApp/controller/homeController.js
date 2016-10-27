app.controller('homeController',function($location,$scope) {
    if (localStorage.getItem('AV/FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz/currentUser')) {
        $location.path('/jump')
    }else {
        $location.path('/login')
    }
})