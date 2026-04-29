let app = angular.module("myApp", []);

app.controller("myctrl", ($scope, $http) => {
    $scope.employee = [];

    // Default values for dropdowns and checkboxes can be set here
    $scope.newemployee = { isActive: true, jobType: "" };

    $scope.msg = "";

    // read
    $scope.readdata = () => {
        $http.get('/api/readdata').then((res) => {
            $scope.employee = res.data;
        })
    }
    $scope.readdata();

    // add
    $scope.adddata = (employee) => {
        $http.post('/api/adddata', employee).then((res) => {
            $scope.msg = res.data.message;
            $scope.newemployee = { isActive: true, jobType: "" }; // Reset form
            $scope.readdata();
        })
    }

    // delete
    $scope.deletedata = (id) => {
        $http.delete('/api/deletedata/' + id).then((res) => {
            $scope.msg = res.data.message;
            $scope.readdata();
        })
    }

    // edit
    $scope.edit = (e) => {
        $scope.newemployee = angular.copy(e);
    }

    // update
    $scope.updatedata = (employee) => {
        $http.put('/api/updatedata/' + employee.eid, employee).then((res) => {
            $scope.msg = res.data.message;
            $scope.newemployee = { isActive: true, jobType: "" }; // Reset form
            $scope.readdata();
        })
    }
});