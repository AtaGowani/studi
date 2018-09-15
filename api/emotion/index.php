<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$FIREBASE = "https://studi-10484.firebaseio.com/ ";

require_once 'HTTP/Request2.php';

$user_id = $_POST['user_id'];

$img_url_id = "https://www.studitime.com/upload/usermedia/" . $user_id . ".png";

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

$request->setBody('{"url": "http://www.cndajin.com/data/wls/288/26033494.jpg"}');

try
{
    $response = $request->send();
    $json = $response->getBody();
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/studi-10484-firebase-adminsdk-isfwi-04e7b7c3d0.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();
    $database = $firebase->getDatabase();
    $db->getReference('user/session')
    ->set([
       'name' => 'Advait Saravade'
       'website' => 'https://app.domain.tld',
      ]);
}
catch (HttpException $ex)
{
    echo $ex;
}

?>
