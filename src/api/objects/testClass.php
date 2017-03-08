<?php
class Test{
    // database connection and table name
    private $conn;
    private $table_name = "tests";

    // object properties
    public $id;
    public $name;
    public $times_taken;
    public $last_taken;
    public $first_taken;
    public $last_taken_by;
    public $minutes_allowed;
    public $passing_grade;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // create test
    function create(){
        // query to insert record
        $query = "INSERT INTO
        " . $this->table_name . "SET name=:name, times_taken=:times_taken, last_taken=:last_taken, first_taken=:first_taken, last_taken_by=:last_taken_by";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // posted values
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->times_taken=htmlspecialchars(strip_tags($this->times_taken));
        $this->last_taken=htmlspecialchars(strip_tags($this->last_taken));
        $this->first_taken=htmlspecialchars(strip_tags($first_taken));
        $this->last_taken_by=htmlspecialchars(strip_tags($this->last_taken_by));
        $this->minutes_allowed=htmlspecialchars(strip_tags($this->minutes_allowed));
        $this->passing_grade=htmlspecialchars(strip_tags($this->passing_grade));
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":times_taken", $this->times_taken);
        $stmt->bindParam(":last_taken", $this->last_taken);
        $stmt->bindParam(":first_taken", $this->first_taken);
        $stmt->bindParam(":last_taken_by", $this->last_taken_by);
        $stmt->bindParam(":minutes_allowed", $this->minutes_allowed);
        $stmt->bindParam(":passing_grade", $this->passing_grade);
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            echo "<pre>";
            print_r($stmt->errorInfo());
            echo "</pre>";
            return false;
        }
    }

    // read tests
    function readAll(){
        // select all query
        $query = "SELECT
        id, name, times_taken, last_taken, first_taken, last_taken_by, minutes_allowed, passing_grade
        FROM
        " . $this->table_name . "
        ORDER BY
        id DESC";
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
        // execute query
        $stmt->execute();
        return $stmt;
    }

    // used when filling up the update test form
    function readOne(){
        // query to read single record
        $query = "SELECT
        name, times_taken, last_taken, first_taken, last_taken_by, minutes_allowed, passing_grade
        FROM
        " . $this->table_name . "
        WHERE
        id = ?
        LIMIT
        0,1";
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
        // bind id of test to be updated
        $stmt->bindParam(1, $this->id);
        // execute query
        $stmt->execute();
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        // set values to object properties
        $this->name = $row['name'];
        $this->times_taken = $row['times_taken'];
        $this->last_taken = $row['last_taken'];
        $this->first_taken = $row['first_taken'];
        $this->last_taken_by = $row['last_taken_by'];
        $this->minutes_allowed = $row['minutes_allowed'];
        $this->passing_grade = $row['passing_grade'];
    }

    // update the test
    function update() {
        // update query
        $query = "UPDATE
        " . $this->table_name . "SET name=:name, times_taken=:times_taken, last_taken=:last_taken, first_taken=:first_taken, last_taken_by=:last_taken_by WHERE id = :id";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->times_taken=htmlspecialchars(strip_tags($this->times_taken));
        $this->last_taken=htmlspecialchars(strip_tags($this->last_taken));
        $this->first_taken=htmlspecialchars(strip_tags($first_taken));
        $this->last_taken_by=htmlspecialchars(strip_tags($this->last_taken_by));
        $this->minutes_allowed=htmlspecialchars(strip_tags($this->minutes_allowed));
        $this->passing_grade=htmlspecialchars(strip_tags($this->passing_grade));
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":times_taken", $this->times_taken);
        $stmt->bindParam(":last_taken", $this->last_taken);
        $stmt->bindParam(":first_taken", $this->first_taken);
        $stmt->bindParam(":last_taken_by", $this->last_taken_by);
        $stmt->bindParam(":minutes_allowed", $this->minutes_allowed);
        $stmt->bindParam(":passing_grade", $this->passing_grade);
        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    // delete the test
    function delete() {
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }
}
?>