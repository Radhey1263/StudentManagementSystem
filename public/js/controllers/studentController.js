app.controller('StudentController', function($scope, $http) {
    
    // Initialize variables
    $scope.students = [];
    $scope.student = {};
    $scope.isEditMode = false;
    $scope.searchText = '';

    // API Base URL
    const API_URL = 'http://localhost:3000/api/students';

    // GET - Fetch all students
    $scope.getAllStudents = function() {
        $http.get(API_URL)
            .then(function(response) {
                if (response.data.success) {
                    $scope.students = response.data.data;
                }
            })
            .catch(function(error) {
                console.error('Error fetching students:', error);
                alert('Error loading students!');
            });
    };

    // POST/PUT - Submit student form
    $scope.submitStudent = function() {
        if ($scope.isEditMode) {
            // UPDATE existing student
            $http.put(API_URL + '/' + $scope.student._id, $scope.student)
                .then(function(response) {
                    if (response.data.success) {
                        alert('Student updated successfully!');
                        $scope.getAllStudents();
                        $scope.resetForm();
                    }
                })
                .catch(function(error) {
                    console.error('Error updating student:', error);
                    alert('Error updating student!');
                });
        } else {
            // CREATE new student
            $http.post(API_URL, $scope.student)
                .then(function(response) {
                    if (response.data.success) {
                        alert('Student added successfully!');
                        $scope.getAllStudents();
                        $scope.resetForm();
                    }
                })
                .catch(function(error) {
                    console.error('Error adding student:', error);
                    alert('Error adding student!');
                });
        }
    };

    // DELETE - Remove student
    $scope.deleteStudent = function(studentId) {
        if (confirm('Are you sure you want to delete this student?')) {
            $http.delete(API_URL + '/' + studentId)
                .then(function(response) {
                    if (response.data.success) {
                        alert('Student deleted successfully!');
                        $scope.getAllStudents();
                    }
                })
                .catch(function(error) {
                    console.error('Error deleting student:', error);
                    alert('Error deleting student!');
                });
        }
    };

    // Edit student - populate form
    $scope.editStudent = function(student) {
        $scope.student = angular.copy(student);
        $scope.isEditMode = true;
        window.scrollTo(0, 0); // Scroll to top
    };

    // Reset form
    $scope.resetForm = function() {
        $scope.student = {};
        $scope.isEditMode = false;
        $scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
    };

    // Load students on page load
    $scope.getAllStudents();
});