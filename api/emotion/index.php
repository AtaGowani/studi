<?php

require_once 'HTTP/Request2.php';

$user_id = $_POST['user_id'];
$time = $_POST['time'];

$request = new Http_Request2('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect');
$url = $request->getUrl();

$headers = array(
    'Content-Type' => 'application/json',
    'Ocp-Apim-Subscription-Key' => 'c36a1c5d625f4324bdd70db35cc1e50c',
);

$request->setHeader($headers);

$parameters = array(
    'returnFaceId' => 'true',
    'returnFaceLandmarks' => 'false',
    'returnFaceAttributes' => 'emotion');

$url->setQueryVariables($parameters);

$request->setMethod(HTTP_Request2::METHOD_POST);

$request->setBody('{"url": "https://751b6845.ngrok.io/upload/usermedia/'.$user_id.'-'.$time.'.png"}');

try
{
    $response = $request->send();
    $json = $response->getBody();
    echo $json;
}
catch (HttpException $ex)
{
    echo $ex;
}

?>
