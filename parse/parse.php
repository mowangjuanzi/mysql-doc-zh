<?php

use Symfony\Component\DomCrawler\Crawler;

require __DIR__ . "/vendor/autoload.php";

$url = "https://dev.mysql.com/doc/refman/8.0/en/numeric-types.html";

$crawler = new Crawler(file_get_contents($url));

$a = $crawler->filterXPath('//div[@id="docs-body"]/div[@class="section"]');

$title = $a->filterXPath('//*[@class="title"]');

echo str_repeat('#', ltrim($title->nodeName(), 'h')) . " " . strip_tags($title->html()) . "\n\n";


$content = $a->filterXPath("//p");

/** @var DOMElement $item */
foreach ($content as $paragraph) {
    $paragraph_text = '';
    foreach ($paragraph->childNodes as $item) {
        if ($item instanceof DOMText) {
            $paragraph_text .= preg_replace("/\s+/", ' ', $item->data);
        } elseif ($item instanceof DOMElement) {
            if ($item->nodeName == 'a') {
                $href = $item->getAttribute('href');
                if (strpos($href, "http") === false) {
                    $href = str_replace(".html", '.md', $href);
                }
                if ($item->firstChild->nodeName == 'code') {
                    $paragraph_text .= "[`" . $item->firstChild->nodeValue . "`](" . $href . ")";
                } elseif ($item->firstChild instanceof DOMText) {
                    $paragraph_text .= "[" . $item->firstChild->data . "](" . $href . ")";
                } else {
                    dd('33', $item->firstChild);
                }
            } else {
                dd('22', $item);
            }
        } else {
            dd('11', $item);
        }
    }

    echo trim($paragraph_text) . "\n\n";
}
