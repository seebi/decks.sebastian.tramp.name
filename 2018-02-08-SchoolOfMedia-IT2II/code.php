<?php

$Preise = array (0, 0, 0);
$PaymentType = "VISA";

$PaymentTypes = array (
        "VISA" => 5,
        "PAYPAL" => 0,
        "RECHNUNG" => 3,
        "VORKASSE" => 0
    );

# returns bearbeitungsgebühr or false in case of an error
function calculateBearbeitungsgebuehr ($type, $PaymentTypes) {
    if (array_key_exists($type, $PaymentTypes)) {
        $Bearbeitungsgebuehr = $PaymentTypes[$type];
    } else {
        echo "Fehler in Abrechnung. Wähle eine andere Payment Option.";
        return false;
    }
    return $Bearbeitungsgebuehr;
}

$Bearbeitungsgebuehr = calculateBearbeitungsgebuehr($PaymentType, $PaymentTypes);


$Warenpreis = 0;
$Anzahl = count($Preise);

$i = 0;
while ($i < $Anzahl) {
    $Warenpreis = $Warenpreis + $Preise[$i];
    $i = $i + 1;
}

if ($Anzahl == 0) {
    echo "Warenkorb ist leer. <a href=\"/\">Hier</a> finden sie unsere Produkte.\n";
} else {
    if ($Warenpreis > 50) {
        $Versandkosten = 0;
    } else {
        $Versandkosten = 5;
    }
    echo "Warenpreis: $Warenpreis\n";
    echo "Versandkosten: $Versandkosten\n";
    echo "Bearbeitungsgebühr: $Bearbeitungsgebuehr\n";
    $Gesamt = $Warenpreis + $Versandkosten + $Bearbeitungsgebuehr;
    echo "Gesamtpreis: $Gesamt\n";
}

