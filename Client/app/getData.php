<?php

$user = $_POST["userTwit"];
$service_url = 'https://SmartHealth-diegofernvalencia307387.codeanyapp.com/twitter/tweets';


$state = false;

function getdata($url)
{
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, false);
    $curl_response = curl_exec($curl);

    if ($curl_response === false) {
        curl_close($curl);
        die('Error en la comunicación');
    }
    curl_close($curl);
    return $curl_response;
}

$result = getdata($service_url);

$data = json_decode($result, true);

if(empty($_POST["userTwit"])){

    $error = 'Complete los datos correctamente </br>';
    echo $error;
}else{
    
    $user = filter_var($user, FILTER_SANITIZE_STRING);
    $user = trim($user);

    //LEER
    foreach ($data as $dato2 => $number_keys) {

        
        if($number_keys['screen_name'] == $user){

            $state = true;
            echo 'exito';
            break;

        }else{

            $state = false;
            $error = 'Al parecer no has publicado en Twitter';
            
            echo $error;
            break;
            
        }

    }
    
   
}


// //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
// header('Content-Type: application/json');


// //Devolvemos el array pasado a JSON como objeto
// echo json_encode($data, JSON_FORCE_OBJECT);
?>