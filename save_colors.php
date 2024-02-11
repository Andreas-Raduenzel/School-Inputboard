<?php
// Überprüfen, ob die Anfrage POST-Daten enthält
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Farbwerte aus dem POST-Daten-Array extrahieren
    $colors = json_decode(file_get_contents('php://input'), true);

    // Pfad zur Textdatei, in der die Farbwerte gespeichert werden sollen
    $file = 'saved_colors.txt';

    // Versuchen, die Farbwerte in die Textdatei zu schreiben
    if (file_put_contents($file, json_encode($colors)) !== false) {
        // Erfolgsmeldung zurückgeben
        http_response_code(200);
        echo json_encode(array('message' => 'Farbwerte erfolgreich gespeichert.'));
    } else {
        // Fehlermeldung zurückgeben
        http_response_code(500);
        echo json_encode(array('message' => 'Fehler beim Speichern der Farbwerte.'));
    }
} else {
    // Wenn die Anfrage keine POST-Daten enthält, eine Fehlermeldung zurückgeben
    http_response_code(405);
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>
