<?php

$senhas = ['carv1234', 'sena1234', 'moises1234'];
 
foreach ($senhas as $senha) {

    echo $senha . ' => ' . password_hash($senha, PASSWORD_DEFAULT) . "<br>";

}
