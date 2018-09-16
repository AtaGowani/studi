<?php

    $data = $_POST['photo'];
    $user_id = $_POST['user_id'];

    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);

    $data = base64_decode($data);

    $time = time();

    file_put_contents("usermedia/" . $user_id . "-".$time.".png", $data);

    echo $time;
?>
