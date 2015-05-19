angular.module('MainApp', []);

function mainController($scope, $http) {
    $scope.newObject = {};
    $scope.objects = {};
    $scope.selected = false;

    $http.get('http://localhost:3000/examen/').success(function(data) {

        $scope.objects = data;
        console.log(data);
    })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.deleteObject = function(newObject) {
        $http.delete('http://localhost:3000/examen/' + $scope.newObject.Name)
            .success(function(data) {
                $scope.newObject = {};
                $scope.selected = false;
                $scope.objects = null;

                $http.get('http://localhost:3000/examen/').success(function(data) {
                    $scope.objects = data;
                })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error:' + data);
            });
    };

    $scope.createObject = function() {
        $http.post('http://localhost:3000/examen/', $scope.newObject)
            .success(function(data) {
                $scope.newObject = {};
                $scope.objects.push(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error: ' + data);
            });
    };

    $scope.updateObject = function(newObject) {
        console.log(newObject);
        $http.put('http://localhost:3000/examen/' + $scope.newObject.Name, newObject)
            .success(function(data) {
                $scope.newObject = {}; // Borramos los datos del formulario

              //  $scope.objects = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error:' + data);
            });
    };



    $scope.selectObject = function(object) {
        $http.get('http://localhost:3000/examen/'+ object.Name).success(function(data) {
            $scope.newObject = data;
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $scope.newObject = object;
        $scope.selected = true;
        console.log($scope.newObject, $scope.selected);
    };

}
