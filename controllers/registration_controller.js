mainApp.controller('Registration_Controller',function($scope,$rootScope,$state,RegisterService){
  $scope.showModal = false;
  $scope.patient_dor = moment(new Date()).format("YYYY-MM-DD");
  /***************************************************************************/
  /************************This is use to show a pop up***********************/
  /***************************************************************************/
  $scope.open = function () {
    $scope.showModal = true;
  };
  /***************************************************************************/
  /***********************This is use to hide a pop up************************/
  /***************************************************************************/
  $scope.ok = function () {
    $scope.showModal = false;
    console.log(12121);
  };
  /***************************************************************************/
  /***********************This is use to hide a pop up************************/
  /***************************************************************************/
  $scope.cancel = function () {
     $scope.showModal = false;
  };

  /***************************************************************************/
  /******************This is use to load the register list********************/
  /***************************************************************************/
  $scope.loadRegisterList  = function(){
    var obj = {};
    RegisterService.register(obj,"get").then(function(pRes) {
      if(pRes.data.statusCode == 200){
        $scope.registerList = pRes.data.data;
      }
    });
  }
  $scope.register = function(){
    var obj = {
      "reg_type":"OPD",
      "first_name":"Santosh",
      "last_name" : "Majhi",
      "gender":"male",
      "mobile":"9438753143",
      "street":"Test",
      "city":"Test",
      "state":"Test",
      "zip_code":"123456",
      "dob":"1982-10-10",
      "age":"30",
      "marital_status":"Single",
      "religion":"hindu",
      "reg_date":"2016-12-12",
      "email":"santoshmajhi99@gmail.com"
    }
    RegisterService.register(obj).then(function(pRes) {
      if(pRes.data.statusCode == 200){
      }
    });
  }
  /***************************************************************************/
  /****************This is use to open datePicker pop up*********************/
  /***************************************************************************/
 $scope.open = function() {
  $scope.popup2.opened = true;
 };
 $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 $scope.format = $scope.formats[0];
 $scope.altInputFormats = ['M!/d!/yyyy'];
 $scope.popup2 = {
   opened: false
 };

 function getDayClass(data) {
   var date = data.date,
     mode = data.mode;
   if (mode === 'day') {
     var dayToCheck = new Date(date).setHours(0,0,0,0);

     for (var i = 0; i < $scope.events.length; i++) {
       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

       if (dayToCheck === currentDay) {
         return $scope.events[i].status;
       }
     }
   }
   return '';
 }
 /***************************************************************************/
 /***********************This is use to calculate age************************/
 /***************************************************************************/
 $scope.calculateage = function(){
    var dob= moment($scope.patient.patient_dob).format("YYYY-MM-DD");
    console.log(dob);
    var now = new Date();
        var birthdate = dob.split("-");
        var born = new Date(birthdate[0], birthdate[1]-1, birthdate[2]);
        age=get_age(born,now);
        $scope.patient.patient_age = age;

 }
 function get_age(born, now) {
     var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
     if (now >= birthday)
       return now.getFullYear() - born.getFullYear();
     else
       return now.getFullYear() - born.getFullYear() - 1;
}
/***************************************************************************/
/***********This is use to load all departments in the dropdown*************/
/***************************************************************************/
 $scope.loadDepartment = function(){
   RegisterService.department().then(function(pRes) {
     if(pRes.status == 200){
     $scope.departmentlist = pRes.data.data;
     }
  })
 }
 /***************************************************************************/
 /***********This is use to load all doctorlist*************/
 /***************************************************************************/
 $scope.loadDoctorlist = function(){
   RegisterService.doctor($scope.patient.department).then(function(pRes) {
     if(pRes.status == 200){
       $scope.doctorlist = pRes.data.data;
     }
  })
 }
 /***************************************************************************/
 /***********This is use to load doctordetails*************/
 /***************************************************************************/
 $scope.loadDoctordetails = function(doctor){
   console.log(doctor);
   $scope.doctorDetails = JSON.parse(doctor);
 }
});
