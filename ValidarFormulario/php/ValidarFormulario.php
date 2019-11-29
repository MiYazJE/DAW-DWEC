<?php

    $servidor  = "localhost";
    $username  = "miusuario";
    $password  = "mipassword";
    $basedatos = "ajax";

    $connection = mysqli_connect($servidor, $username, $password, $basedatos);
    
    if ($connection) {

        // Data from FORMDATA
        $nombre    = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $telefono  = $_POST["telefono"];
        $mail      = $_POST["mail"];
        $dni       = $_POST["dni"];
        $pass      = md5($_POST["password"]);

        $consulta = "INSERT INTO Usuarios (dni, nombre, apellidos, mail, password, telefono)
            VALUES ('{$dni}', '{$nombre}', '{$apellidos}', '{$mail}', '{$pass}' , '{$telefono}');";

        if (mysqli_query($connection, $consulta)) {
            echo json_encode("okay");
        }
        else {
            echo json_encode("error");
        }

    }
    else {
        echo json_encode("error");
    }

?>