(function() {

"use strict";

angular
  .module("voteFunny", [
    "auth0.lock",
    "angular-jwt",
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .config(
    function($sceDelegateProvider, lockProvider, $urlRouterProvider){
       $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
    ]);
    lockProvider.init({
      clientID: 'NmjdW5FKcfXy2nH4U7tZTelzyeT3IEz7',
      domain: 'gabook.auth0.com',
      options: {
        _idTokenVerification: false
      }
      });
    $urlRouterProvider.otherwise('/shows');
    }
  )
  .factory("Show", [
    "$resource",
    Show
  ])
  .controller("indexCtrl", [
    "$state",
    "Show",
    "authService",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Show",
    "authService",
    showController
  ])

  function Router ($stateProvider, lockProvider, $urlRouterProivder) {
    $stateProvider
      .state("index", {
        url: "/shows",
        templateUrl: "/assets/js/ng-views/index.html",
        controller: "indexCtrl",
        controllerAs: "vm"
      })
      .state("show", {
        url: "/shows/:name",
        templateUrl: "/assets/js/ng-views/show.html",
        controller: "showCtrl",
        controllerAs: "vm"
      })

  }

  function Show ($resource) {
    return $resource("/api/shows/:name", {}, {
      update: { method: "PUT" }
    });
  }

  function indexController ($state, Show, authService) {
    this.shows = Show.query()
    this.newShow = new Show()
    this.create = function () {
      this.newShow.$save().then(function(show){
        $state.go("show", { name: show.name} )
      })
    }
    var vm = this
    vm.authService = authService
    authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    });
  }

  function showController ($state, $stateParams, Show, authService) {
    this.show = Show.get({name: $stateParams.name})
    this.vote = function () {
      this.show.vote += 1
      this.show.$update({name: $stateParams.name})
    }
    this.update = function () {
      this.show.$update({name: $stateParams.name})
    }
    this.destroy = function () {
    this.show.$delete({name: $stateParams.name}).then(function(){
        $state.go("index")
      })
    }
    var vm = this
    vm.authService = authService
    authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    });
}
})();
