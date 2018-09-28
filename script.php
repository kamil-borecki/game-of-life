<?php
header('Content-type: application/json');
$cells = json_decode($_POST['cells']);

$newCells = $cells;
for($y = 0; $y < count($cells); $y++){
    for($x = 0; $x < count($cells[$y]); $x++){
        $fellas = getFellasCount($y,$x, $cells);
        if($cells[$y][$x]){
                $newCells[$y][$x] = ($fellas === 2 || $fellas === 3);
        }else{
            $newCells[$y][$x] = $fellas === 3;
        }
    }
       
    }
    echo json_encode($newCells);

function getFellasCount($y,$x, $cells) {
    $fellas = 0;
        if($cells[$y-1][$x]){
            $fellas++;
        }
        if($cells[$y+1][$x]){
            $fellas++;
        }
        if($cells[$y][$x-1]){
            $fellas++;
        }
        if($cells[$y][$x+1]){
            $fellas++;
        }
        if($cells[$y-1][$x-1]){
            $fellas++;
        }
        if($cells[$y-1][$x+1]){
            $fellas++;
        }
        if($cells[$y+1][$x-1]){
            $fellas++;
        }
        if($cells[$y+1][$x+1]){
            $fellas++;
        }
    return $fellas;
}
?>