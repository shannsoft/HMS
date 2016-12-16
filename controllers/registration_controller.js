mainApp.controller('Registration_Controller',function($scope,$rootScope,$state,RegisterService,$stateParams,$uibModal,Util){
  $scope.showModal = false;
  $scope.searchString = "All";
  $scope.patient = {};
  $scope.patient.registration_type = "Normal";
  $scope.patient.reg_date = moment(new Date()).format("YYYY-MM-DD");
  /***************************************************************************/
  /************************This is use to show a pop up***********************/
  /***************************************************************************/
  $scope.deleteRegister = function(size,reg_id){
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'views/modal.html',
     controller: 'deleteRegisterModalCtrl',
     size: size,
     resolve: {
      deleteRegisterDetails: function () {
         return $scope.deleteRegisterDetails;
       },
       reg_id:function () {
         return reg_id;
       }
     }
   });
  }
  /***************************************************************************/
  /*********************This is use to delete the register********************/
  /***************************************************************************/
  $scope.deleteRegisterDetails = function(id){
    var obj = {
      "id":id
    };
    RegisterService.register(obj,"delete").then(function(pRes) {
      if(pRes.data.statusCode == 200){
        Util.alertMessage('success', pRes.data.message);
        $scope.loadRegisterList();
      }
    });
  }
  /***************************************************************************/
  /*********************This is use to search the register********************/
  /***************************************************************************/
  $scope.search = function(string) {
    $scope.searchString = (string) ? string : 'All';
  }
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
  /***************************************************************************/
  /******************This is use to load patient details**********************/
  /***************************************************************************/
  $scope.loadDetails = function(){
    var obj = {
      "id":$stateParams.reg_id
    }
    RegisterService.register(obj,"get").then(function(pRes) {
      if(pRes.data.statusCode == 200){
        $scope.registerDetails = pRes.data.data[0];
        $scope.patient = pRes.data.data[0];
      }
    });
  }
  /***************************************************************************/
  /******************This is use to load patient details**********************/
  /***************************************************************************/
  $scope.printCoverPage  = function(div){
    var docHead = document.head.outerHTML;
    // document.getElementById('title').innerHTML = 'Hospital Management System';
    var printContents = document.getElementById(div).outerHTML;
    var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";
    var newWin = window.open("", "_blank", winAttr);
    var writeDoc = newWin.document;
    writeDoc.open();
    writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
    writeDoc.close();
    newWin.focus();
  }
  /***************************************************************************/
  /******************This is use to register a patient************************/
  /***************************************************************************/
  $scope.register = function(){
    $scope.patient.dob = moment($scope.patient.dob).format("YYYY-MM-DD");
    RegisterService.register($scope.patient,'create').then(function(pRes) {
      if(pRes.data.statusCode == 200){
        $state.go('cardPrint',{reg_id: pRes.data.data.id})
      }
    });
  }
  /***************************************************************************/
  /********************This is use to update a patient************************/
  /***************************************************************************/
  $scope.updateRegister = function(){
    $scope.patient.dob = moment($scope.patient.dob).format("YYYY-MM-DD");
    RegisterService.register($scope.patient,'update').then(function(pRes) {
      if(pRes.data.statusCode == 200){
        Util.alertMessage('success', pRes.data.message);
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
   $scope.calculateAge = function(){
    var dob = moment($scope.patient.dob).format("YYYY-MM-DD");
    var now = new Date();
    var birthdate = dob.split("-");
    var born = new Date(birthdate[0], birthdate[1]-1, birthdate[2]);
    age = get_age(born,now);
    if( age => 0)
      $scope.patient.age = age;
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
   RegisterService.doctor($scope.patient.dep_id).then(function(pRes) {
     if(pRes.status == 200){
       $scope.doctorlist = pRes.data.data;
     }
  })
 }
 /***************************************************************************/
 /***********This is use to load doctordetails*************/
 /***************************************************************************/
 $scope.loadDoctordetails = function(doctor){
   $scope.doctorDetails = JSON.parse(doctor);
   $scope.patient.doct_id = $scope.doctorDetails.doct_id;
 }
});

mainApp.controller('deleteRegisterModalCtrl', function ($scope, $uibModalInstance,deleteRegisterDetails,reg_id) {
  $scope.ok = function () {
    deleteRegisterDetails(reg_id);
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
