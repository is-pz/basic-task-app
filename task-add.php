<?php
include 'database.php';

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "INSERT INTO task (name, description) VALUES ('$name', '$description')";

    $result = mysqli_query($cnn, $query);

    if(!$result){
        die("Query Failed.");
    }

    $json = array(
        'status' => 1,
        'message' => 'Task Added Successfully'
    );

    $jsonString = json_encode($json);

    echo $jsonString;
}
