<?php
include 'database.php';

    $query = "SELECT * FROM task";

    $result = mysqli_query($cnn, $query);

    if(!$result){
        die("Query Failed. " . mysqli_error($cnn));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;