<?php

    include 'database.php';

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = $id";

        $result = mysqli_query($cnn, $query);

        if(!$result){
            die("Query Failed.");
        }


        $json = array(
            'status' => 1,
            'message' => "Update Task Successfully"
        );
    
        $jsonString = json_encode($json);
    
        echo $jsonString;

    }