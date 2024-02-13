
<?php/*
$savedColors = file_exists('saved_colors.txt') ? unserialize(file_get_contents('saved_colors.txt')) : array();
*/
?>

<?php
// Setze den Cache-Control-Header, um das Browser-Caching zu verhindern
header("Cache-Control: no-cache, must-revalidate");

// Lade die gespeicherten Farbwerte aus der Datei
$savedColors = file_exists('saved_colors.txt') ? json_decode(file_get_contents('saved_colors.txt'), true) : array();
?>


                                   