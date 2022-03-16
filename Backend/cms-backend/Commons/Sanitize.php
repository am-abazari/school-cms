<?php

function sanitize($input)
{
    $level1 = trim($input);
    $level2 = strip_tags($level1);
    return $level2;
}