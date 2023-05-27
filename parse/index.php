<?php

use App\Console\Commands\ParseCommand;
use Symfony\Component\Console\Application;

require __DIR__ . "/vendor/autoload.php";

$application = new Application();
$application->add(new ParseCommand());
$application->run();