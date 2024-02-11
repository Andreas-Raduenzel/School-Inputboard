<?php
header('Content-Type: application/json');

// Empfangen Sie die Daten vom JavaScript
$day = $_POST['day'];
$index = $_POST['index'];
$text = $_POST['text'];

// Speichern Sie den Text auf dem Server (zum Beispiel in einer Datei)
$filename = $day . '_text_' . $index . '.txt';
$file = fopen($filename, 'w');
fwrite($file, $text);
fclose($file);

// Senden Sie eine Antwort zurück
echo json_encode(['success' => true]);
?>
