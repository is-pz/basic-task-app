<?php
include 'database.php';



$search = $_POST['search'];

if(!empty($search)){
    $query = "SELECT * FROM task WHERE name LIKE '%$search%'";
    $result = mysqli_query($cnn,$query);
    if(!$result){
        die("Query Error " . mysqli_error($cnn));
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
}
