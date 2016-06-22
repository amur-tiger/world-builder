/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a CharacterListController.
     */
    export interface CharacterListScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the character overview.
     */
    export class CharacterListController {
        static $inject = ["$scope", "$localStorage", "$routeParams"];

        constructor(private $scope: CharacterListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects/:project/characters", {
                templateUrl: "views/characterList/characterList.html",
                controller: "CharacterListController"
            });
        }])
        .controller("CharacterListController", CharacterListController);
}