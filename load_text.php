<?php
$day = $_GET['day'];
$index = $_GET['index'];
$filename = $day . '_text_' . $index . '.txt';

if (file_exists($filename)) {
    echo file_get_contents($filename);
} else {
    echo ''; // Wenn die Datei nicht vorhanden ist, senden Sie einen leeren Text zurück
}
?>
