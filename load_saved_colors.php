
<?php/*
$savedColors = file_exists('saved_colors.txt') ? unserialize(file_get_contents('saved_colors.txt')) : array();
*/
?>

<?php
$savedColors = file_exists('saved_colors.txt') ? json_decode(file_get_contents('saved_colors.txt'), true) : array();
?>

                                   