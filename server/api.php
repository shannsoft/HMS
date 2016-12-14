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
				"changedPassword" => "Successfully Changed your password"
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
    private function formatJson($jsonData){
        $formatted = $jsonData;
        $formatted = str_replace('"{', '{', $formatted);
        $formatted = str_replace('}"', '}', $formatted);
        $formatted = str_replace('\\', '', $formatted);
        return $formatted;
    }
		public function generateRandomString($length = 60) {
		    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < $length; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }
		    return $randomString;
		}
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
		public function sendResponse($statusCode,$message = null ,$data = null){
			$response = array();
			$response['statusCode'] = $statusCode;
			$response['message'] = $message;
			$response['data'] = $data;
			$this->response($this->json($response), 200);
    }
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
					$this->sendResponse(201,"failure","fail");
				}
			}
			else{
				$this->sendResponse(202,"Invalid user name or password");
			}
    }
		public function logout(){
			$headers = apache_request_headers(); // to get all the headers
			$accessToken = $headers['Accesstoken'];
			if($accessToken){
				$sql = "update ".self::usersTable." set user_token='' where user_token='$accessToken'";
				$result = $this->executeGenericDMLQuery($sql);
				if($result){
					$this->sendResponse(200,$this->messages['userLogout']);
				}
			}
		}
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
	}
	$api = new API;
	$api->processApi();
?>
