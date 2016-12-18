mainApp.controller('Registration_Controller',function($scope,$rootScope,$state,RegisterService,$stateParams,$uibModal,Util,NgTableParams){
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
        var initialParams = {
            count: 15 // initial page size
        };
        var initialSettings = {
          counts: [],
          paginationMaxBlocks: 13,
          paginationMinBlocks: 1,
          dataset:   $scope.registerList
        };
        $scope.tableParams = new NgTableParams(initialParams, initialSettings);
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
  /******************This is use to load patient edit**********************/
  /***************************************************************************/
  $scope.loadEditDetails = function(){
    var obj = {
      "id":$stateParams.reg_id
    }
    RegisterService.register(obj,"get").then(function(pRes) {
      if(pRes.data.statusCode == 200){
        $scope.patient = pRes.data.data[0];
        if($scope.patient.dep_id)
          $scope.loadDoctorlist(true);
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
    console.log($scope.patient);
    RegisterService.register($scope.patient,'create').then(function(pRes) {
      if(pRes.data.statusCode == 200){
        Util.alertMessage('success', pRes.data.message);
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
   $scope.calculateAge = function(dateString){
     var dateofbirth = moment(dateString).format('YYYY-MM-DD');
     var now = new Date();
     var today = new Date(now.getYear(),now.getMonth(),now.getDate());
     var yearNow = now.getYear();
     var monthNow = now.getMonth();
     var dateNow = now.getDate();
     var tempDte = dateofbirth.split('-');
     var dob = new Date(tempDte[0],tempDte[1]-1, tempDte[2]);
     var yearDob = dob.getYear();
     var monthDob = dob.getMonth();
     var dateDob = dob.getDate();
     var age = {};
     var ageString = "";
     var yearString = "";
     var monthString = "";
     var dayString = "";
     yearAge = yearNow - yearDob;
     if (monthNow >= monthDob)
       var monthAge = monthNow - monthDob;
     else {
       yearAge--;
       var monthAge = 12 + monthNow -monthDob;
     }

     if (dateNow >= dateDob)
       var dateAge = dateNow - dateDob;
     else {
       monthAge--;
       var dateAge = 31 + dateNow - dateDob;

       if (monthAge < 0) {
         monthAge = 11;
         yearAge--;
       }
     }

     age = {
         years: yearAge,
         months: monthAge,
         days: dateAge
         };

     if ( age.years > 1 ) yearString = " years";
     else yearString = " year";
     if ( age.months> 1 ) monthString = " months";
     else monthString = " month";
     if ( age.days > 1 ) dayString = " days";
     else dayString = " day";

     if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
       ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString;
     else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
       ageString = age.days + dayString;
     else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
       ageString = age.years + yearString;
     else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
       ageString = age.years + yearString + " and " + age.months + monthString;
     else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
       ageString = age.months + monthString + " and " + age.days + dayString;
     else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
       ageString = age.years + yearString + " and " + age.days + dayString;
     else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
       ageString = age.months + monthString;
     else
      ageString = "Oops! Could not calculate age!";
      $scope.patient.age = ageString;
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
 $scope.loadDoctorlist = function(isEdit){
   RegisterService.doctor($scope.patient.dep_id).then(function(pRes) {
     if(pRes.status == 200){
        $scope.doctorlist = pRes.data.data;
        if(isEdit) {
          $scope.loadDoctordetails($scope.patient.doct_id)
        }
     }
  })
 }
 /***************************************************************************/
 /***********This is use to load doctordetails*************/
 /***************************************************************************/
 $scope.loadDoctordetails = function(doctor){
   angular.forEach($scope.doctorlist,function(item){
     if(doctor == item.doct_id){
       $scope.doctorDetails = item;
     }
   })
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
