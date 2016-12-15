<?php
header('Access-Control-Allow-Origin: *');
	require_once("Rest.inc.php");
	class API extends REST {
		public $data = "";
		const DB_SERVER = "localhost";
		const DB_USER = "root";
		// const DB_USER = "goapps";
		const DB_PASSWORD = "";
		// const DB_PASSWORD = "goapps123";
	  const DB = "hms_db";
		// adding table names
		const usersTable = "user_table";
		const departmentTable = "department_table";
		const doctorTable = "doctor_table";
		const registerTable = "registration_table";
		private $db = NULL;
		private $proxy = NULL;
		private $storeApiLogin = false;
		public $errorCodes = array(
				"200" => "The client request has succeeded",
				"201" => "Created",
				"202" => "Accepted",
				"203" => 	"Non-authoritative information.",
				"204" => 	"No content",
				"205" => 	"Reset content",
				"206" => 	"Partial content",
				"302" => "Object moved",
				"304" => "Not modified",
				"307" => "Temporary redirect",
				"400" => "Bad request",
				"401" => "Access denied",
				"402" => "Payment Required",
				"403" => "Forbidden",
				"404" => "Not found",
				"405" => "HTTP verb used to access this page is not allowed",
				"406" => "Client browser does not accept the MIME type of the requested page",
				"407" => "Proxy authentication required",
				"412" => "Precondition failed",
				"413" => "Request entity too large",
				"414" => "Request-URL too long",
				"415" => "Unsupported media type",
				"416" => "Requested range not satisfiable",
				"417" => "Execution failed",
				"423" => "Locked error",
				"500" => "Internal server error",
				"501" => "Header values specify a configuration that is not implemented",
				"502" => "Bad Gateway",
				"503" => "Service unavailable",
				"504" => "Gateway timeout",
				"505" => "HTTP version not supported"
		);
		public $messages = array(
				"loginSuccess" => "Successfully Logedin",
				"userLogout" => "Successfully log out",
				"changedPassword" => "Successfully Changed your password",
				"dataFetched" => "Data Fetched Successfully"
		);
		public function __construct(){
			parent::__construct();
			$this->dbConnect();
		}
		private function dbConnect(){
			$this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
			if($this->db)
          mysql_select_db(self::DB, $this->db) or die('ERRROR:'.mysql_error());
			else
				echo "db not exists";
		}
		public function processApi(){
			$func = '';
			if(isset($_REQUEST['service']))
				$func = strtolower(trim(str_replace("/", "", $_REQUEST['service'])));
			else if(isset($_REQUEST['reqmethod']))
				$func = strtolower(trim(str_replace("/", "", $_REQUEST['reqmethod'])));
			if($func){
				if (method_exists($this, $func)) {
					$this->$func();
				} else{
					$this->log('invalid service:'.$func." at ".date("Y-m-d H:i:s"));
					$this->response('invalid service', 406);
				}
			}
			else
				echo "invalid function";
		}
		/*
		* This is used to make a log of the error in the server end
		* (Yet to implemented) A log class that will create logs in the different files according to the type of the logs
		* like for logs for the server errors , information logs will be store in the different files
		*/
		public function log($logText,$type = 3 ,$destFile= 'error_log.txt'){
			error_log("\n".$logText,$type,$destFile);
		}
		public function json($data){
        if(is_array($data)){
            $formatted = json_encode($data);
            return $this->formatJson($formatted);
        }
				else {
					return $data;
				}
    }
		/*******************************************************/
		/*****This function use for covvert json response*******/
		/*******************************************************/
    private function formatJson($jsonData){
        $formatted = $jsonData;
        $formatted = str_replace('"{', '{', $formatted);
        $formatted = str_replace('}"', '}', $formatted);
        $formatted = str_replace('\\', '', $formatted);
        return $formatted;
    }
		/*******************************************************/
		/*****This function use for generate access token*******/
		/*******************************************************/
		public function generateRandomString($length = 60) {
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}
		/*******************************************************/
		/**********This function use for get the record*********/
		/*******************************************************/
		public function executeGenericDQLQuery($query){
			try{
				if(!$this->db){
					$this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
				}
				$result = mysql_query($query, $this->db);
				$rows = array();
				while($row = mysql_fetch_array($result)){
					array_push($rows,$row);
				}
				return $rows;
			}
			catch(Exception $e){
				$response = array();
				$response['status'] = false;
				$response['message'] = $e->getMessage();
				$this->response($this->json($response), 200);
			}
		}
		/*******************************************************/
		/********This function use for update the record********/
		/*******************************************************/
    public function executeGenericDMLQuery($query){
      try{
        $result = mysql_query($query, $this->db);
        if(mysql_errno($this->db) != 0){
            throw new Exception("Error   :".mysql_errno($this->db)."   :  ".mysql_error($this->db));
        }
				return mysql_affected_rows(); // return the affected rows
      }
      catch(Exception $e){
        $response = array();
        $response['status'] = false;
        $response['message'] = $e->getMessage();
        $this->response($this->json($response), 200);
      }
    }
		/*******************************************************/
		/**********This function use for insert record**********/
		/*******************************************************/
    public function executeGenericInsertQuery($query){
        try{
            $result = mysql_query($query, $this->db);
            if(mysql_errno($this->db) != 0){
                throw new Exception("Error   :".mysql_errno($this->db)."   :  ".mysql_error($this->db));
            }
            return mysql_insert_id($this->db);
        }
        catch(Exception $e){
            $response = array();
            $response['status'] = false;
            $response['message'] = $e->getMessage();
            $this->response($this->json($response), 200);
        }
    }
		/*******************************************************/
		/********This function use for send the response********/
		/*******************************************************/
		public function sendResponse($statusCode,$message = null ,$data = null){
			$response = array();
			$response['statusCode'] = $statusCode;
			$response['message'] = $message;
			$response['data'] = $data;
			$this->response($this->json($response), 200);
    }
		/*******************************************************/
	  /**************This function use for login**************/
	  /*******************************************************/
		public function login() {
			if(!isset($this->_request['user_name']) || !isset($this->_request['password']))
				$this->sendResponse(202,"Invalid user name or password");
			$user_name = $this->_request['user_name'];
			$password = md5($this->_request['password']);
			$token = $this->generateRandomString();
			$sql = "update ".self::usersTable." set token='$token' where user_name='$user_name'";
			$result = $this->executeGenericDMLQuery($sql);
			if($result){
				$sql = "select * from ".self::usersTable." where user_name = '$user_name' and password = '$password' limit 1";
				$rows = $this->executeGenericDQLQuery($sql);
				if(sizeof($rows)){
						$users = array();
						$users['id'] = $rows[0]['id'];
						$users['user_name'] = $rows[0]['user_name'];
						$users['first_name'] = $rows[0]['first_name'];
						$users['last_name'] = $rows[0]['last_name'];
						$users['token'] = $rows[0]['token'];
						$this->sendResponse(200,$this->messages['loginSuccess'],$users);
				}
				else {
					$this->sendResponse(201,"Invalid username or password","fail");
				}
			}
			else{
				$this->sendResponse(202,"Invalid user name or password");
			}
    }
		/*******************************************************/
	  /**************This function use for logout*************/
	  /*******************************************************/
		public function logout(){
			$headers = apache_request_headers(); // to get all the headers
			$accessToken = $headers['Accesstoken'];
			if($accessToken){
				$sql = "update ".self::usersTable." set token='' where token='$accessToken'";
				$result = $this->executeGenericDMLQuery($sql);
				if($result){
					$this->sendResponse(200,$this->messages['userLogout']);
				}
			}
		}
		/*******************************************************/
		/**********This function use for change password********/
		/*******************************************************/
		public function changePassword(){
			$headers = apache_request_headers();
			$accessToken = $headers['Accesstoken'];
			$password = md5($this->_request['password']);
			$sql = "update ".self::usersTable." set password='$password' where user_token='$accessToken'";
			$result = $this->executeGenericDMLQuery($sql);
			if($result){
				$this->sendResponse(200,'Successfully Changed Your Password');
			}
		}
		/*******************************************************/
		/**********This function use for password check*********/
		/*******************************************************/
	 	public function checkPassword(){
		    	$headers = apache_request_headers();
		    	$accessToken = $headers['Accesstoken'];
					if(isset($this->_request['password'])){
						$cpass = $this->_request['password'];
						$sql = "SELECT password FROM ".self::usersTable." where user_token='$accessToken'";
						$rows = $this->executeGenericDQLQuery($sql);
						$users = array();
						if($rows[0]['password'] == md5($cpass)){
							$this->sendResponse(200,"success");
						}
						else{
							$this->sendResponse(201,"failure");
						}
					}
		}
		/*******************************************************/
		/******This function use for get the department list****/
		/*******************************************************/
		public function getDepartment(){
			$sql = "select * from ".self::departmentTable;
			$rows = $this->executeGenericDQLQuery($sql);
			$department = array();
			for($i = 0; $i < sizeof($rows); $i ++){
				$department[$i]['id'] = $rows[$i]['dep_id'];
				$department[$i]['name'] = $rows[$i]['dep_name'];
			}
			$this->sendResponse(200,$this->messages['dataFetched'],$department);
		}
		/*******************************************************/
		/*This function use for get the doctor of a particular dep**/
		/*******************************************************/
		public function getDoctor(){
			$sql = "select * from ".self::doctorTable;
			if(isset($this->_request['dep_id'])){
				$dep_id = $this->_request['dep_id'];
				$sql .= " where dep_id = ".$dep_id;
			}
			$rows = $this->executeGenericDQLQuery($sql);
			$doctor = array();
			for($i = 0; $i < sizeof($rows); $i ++){
				$doctor[$i]['doct_id'] = $rows[$i]['doct_id'];
				$doctor[$i]['doct_name'] = $rows[$i]['doct_name'];
				$doctor[$i]['doct_price'] = $rows[$i]['doct_price'];
				$doctor[$i]['doct_location'] = $rows[$i]['doct_location'];
				$doctor[$i]['doct_timing'] = $rows[$i]['doct_timing'];
			}
			$this->sendResponse(200,$this->messages['dataFetched'],$doctor);
		}
		/*******************************************************/
		/******This function use for register a patient*********/
		/*******************************************************/
		public function register(){
			$headers = apache_request_headers(); // to get all the headers
			$accessToken = $headers['Accesstoken'];
			if(!isset($this->_request['operation']))
				$this->sendResponse(400,'Operation not Defined');
			if(!$accessToken)
				$this->sendResponse(401,'Access Denied');
			$sql = null;
			switch ($this->_request['operation']) {
				case 'create':
					if(isset($this->_request['register_data'])){
						$reg_data = $this->_request['register_data'];
						$reg_type = $reg_data['registration_type'];
						$reg_fname = $reg_data['first_name'];
						$reg_lname = $reg_data['last_name'];
						$reg_gen = $reg_data['gender'];
						$reg_mobile = $reg_data['mobile'];
						$reg_email = (isset($reg_data['email'])) ? $reg_data['email'] : null;
						$reg_street = $reg_data['street'];
						$reg_city = $reg_data['city'];
						$reg_state = $reg_data['state'];
						$reg_zip = $reg_data['zip'];
						$reg_dob = $reg_data['dob'];
						$reg_age = $reg_data['age'];
						$reg_marital = $reg_data['marital_status'];
						$reg_religion = $reg_data['religion'];
						$reg_regDate = $reg_data['reg_date'];
						$reg_proType = (isset($reg_data['prof_type'])) ? $reg_data['prof_type'] : null;
						$reg_school = (isset($reg_data['school'])) ? $reg_data['school'] : null;
						$reg_employer = (isset($reg_data['employer'])) ? $reg_data['employer'] : null;
						$reg_busi_type = (isset($reg_data['business_type'])) ? $reg_data['business_type'] : null;
						$reg_others = (isset($reg_data['other'])) ? $reg_data['other'] : null;
						$reg_guardian_type = (isset($reg_data['guardian_type'])) ? $reg_data['guardian_type'] : null;
						$reg_guardian_name = (isset($reg_data['guardian_name'])) ? $reg_data['guardian_name'] : null;
						$reg_guardian_mobile = (isset($reg_data['guardian_mobile'])) ? $reg_data['guardian_mobile'] : null;
						$reg_guardian_address = (isset($reg_data['address'])) ? $reg_data['address'] : null;
						$reg_dep_id = (isset($reg_data['dep_id'])) ? $reg_data['dep_id'] : null;
						$reg_doct_id = (isset($reg_data['doct_id'])) ? $reg_data['doct_id'] : null;
						$reg_hear_about_us = (isset($reg_data['hear_about_us'])) ? $reg_data['hear_about_us'] : null;
						$reg_reason = (isset($reg_data['reason'])) ? $reg_data['reason'] : null;
						$reg_is_deleted = 0;
						$sql = "insert into ".self::registerTable."(registration_type,first_name,last_name,gender,mobile,email,street,city,state,zip,dob,age,marital_status,religion,prof_type,school,employer,business_type,other,guardian_type,guardian_name,guardian_mobile,address,dep_id,doct_id,hear_about_us,reason,reg_date,is_deleted)
						values('$reg_type','$reg_fname','$reg_lname','$reg_gen','$reg_mobile','$reg_email',
						'$reg_street','$reg_city','$reg_state','$reg_zip','$reg_dob','$reg_age',
						'$reg_marital','$reg_religion','$reg_proType','$reg_school','$reg_employer','$reg_busi_type',
						'$reg_others','$reg_guardian_type','$reg_guardian_name','$reg_guardian_mobile','$reg_guardian_address','$reg_dep_id',
						'$reg_doct_id','$reg_hear_about_us','$reg_reason','$reg_regDate','$reg_is_deleted')";
						$rows = $this->executeGenericDMLQuery($sql);
						if($rows){
							$id = mysql_insert_id();
							$reg_no = "HMS/16/".$id;
							$sql = "update ".self::registerTable." set reg_no='$reg_no' where reg_id=".$id;
							$updated = $this->executeGenericDMLQuery($sql);
							$data = array();
							$data['id'] = $id;
							$this->sendResponse(200,'Successfully Registered',$data);
						}
					}
					break;
				case 'get':
						$reg_data = isset($this->_request['register_data']) ? $this->_request['register_data'] : $this->_request;
						$sql = "SELECT a.reg_id,a.reg_no,a.registration_type,a.first_name,a.last_name,a.gender,a.mobile,a.email,
						a.street,a.city,a.state,a.zip,a.dob,a.age,a.marital_status,a.religion,
						a.prof_type,a.school,a.employer,a.business_type,a.other,a.guardian_type,a.guardian_name,a.guardian_mobile,
						a.address,a.dep_id,a.doct_id,a.hear_about_us,a.reason,a.reg_date,a.is_deleted,b.dep_name,c.doct_name,c.doct_price
						FROM ".self::registerTable." a
						INNER JOIN department_table AS b ON a.dep_id = b.dep_id
						INNER JOIN doctor_table AS c ON a.doct_id = c.doct_id
						where a.is_deleted = 0";
						if(isset($reg_data['id']))
							$sql .= " AND a.reg_id=".$reg_data['id'];
						$rows = $this->executeGenericDQLQuery($sql);
						$register = array();
						for($i = 0; $i < sizeof($rows); $i++) {
							$register[$i]['id'] = $rows[$i]['reg_id'];
							$register[$i]['reg_no'] = $rows[$i]['reg_no'];
							$register[$i]['registration_type'] = $rows[$i]['registration_type'];
							$register[$i]['first_name'] = $rows[$i]['first_name'];
							$register[$i]['last_name'] = $rows[$i]['last_name'];
							$register[$i]['gender'] = $rows[$i]['gender'];
							$register[$i]['mobile'] = $rows[$i]['mobile'];
							$register[$i]['email'] = $rows[$i]['email'];
							$register[$i]['street'] = $rows[$i]['street'];
							$register[$i]['city'] = $rows[$i]['city'];
							$register[$i]['state'] = $rows[$i]['state'];
							$register[$i]['zip'] = $rows[$i]['zip'];
							$register[$i]['dob'] = $rows[$i]['dob'];
							$register[$i]['age'] = $rows[$i]['age'];
							$register[$i]['marital_status'] = $rows[$i]['marital_status'];
							$register[$i]['religion'] = $rows[$i]['religion'];
							$register[$i]['prof_type'] = $rows[$i]['prof_type'];
							$register[$i]['school'] = $rows[$i]['school'];
							$register[$i]['employer'] = $rows[$i]['employer'];
							$register[$i]['business_type'] = $rows[$i]['business_type'];
							$register[$i]['other'] = $rows[$i]['other'];
							$register[$i]['guardian_type'] = $rows[$i]['guardian_type'];
							$register[$i]['guardian_name'] = $rows[$i]['guardian_name'];
							$register[$i]['guardian_mobile'] = $rows[$i]['guardian_mobile'];
							$register[$i]['address'] = $rows[$i]['address'];
							$register[$i]['dep_id'] = $rows[$i]['dep_id'];
							$register[$i]['doct_id'] = $rows[$i]['doct_id'];
							$register[$i]['hear_about_us'] = $rows[$i]['hear_about_us'];
							$register[$i]['reason'] = $rows[$i]['reason'];
							$register[$i]['reg_date'] = $rows[$i]['reg_date'];
							$register[$i]['is_deleted'] = $rows[$i]['is_deleted'];
							$register[$i]['department'] = $rows[$i]['dep_name'];
							$register[$i]['doctor'] = $rows[$i]['doct_name'];
							$register[$i]['doct_price'] = $rows[$i]['doct_price'];
						}
						$this->sendResponse(200,$this->messages['dataFetched'],$register);
						break;
					case 'delete':
						$reg_data = isset($this->_request['register_data']) ? $this->_request['register_data'] : $this->_request;
						$sql = "update ".self::registerTable." set is_deleted=1 where reg_id=".$reg_data['id'];
						$result = $this->executeGenericDMLQuery($sql);
						if($result){
							$this->sendResponse(200,"Successfully Deleted");
						}
					break;
			}
		}
		/*******************************************************/
		/******This function use for get the register **********/
		/*******************************************************/
		public function getRegister(){

		}
	}
	$api = new API;
	$api->processApi();
?>
