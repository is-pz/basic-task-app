<?php
    include 'database.php';

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "DELETE FROM task WHERE id = $id";

        $result = mysqli_query($cnn, $query);

        if(!$result){
            die("Query Failed.");
        }

        $json = array(
            'status' => 1,
            'message' => 'Task Deleted Successfully'
        );
    
        $jsonString = json_encode($json);
    
        echo $jsonString;
    }


