<?php

namespace App\Console\Commands;

use DOMElement;
use DOMNodeList;
use GuzzleHttp\Client;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DomCrawler\Crawler;

class ParseCommand extends Command
{

    protected static $defaultName = "parse:mysql";

    protected static $defaultDescription = '格式化 mysql 指定文档（开发了一半，效果还很差）';

    protected function configure()
    {
        $this->addArgument("name", InputArgument::REQUIRED);
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $name = $input->getArgument('name');
        $html = "https://dev.mysql.com/doc/refman/8.0/en/{$name}.html";

        // 获取内容
        $client = new Client();
        $response = $client->get($html)->getBody()->getContents();

        // 实现类库
        $crawler = new Crawler($response);

        /** @var DOMElement $chapter 获取到正文部分 */
        $chapter = $crawler->filterXPath('//div[@id="docs-body"]')->getNode(0);

        $md = $this->parseContent($chapter->childNodes);

        file_put_contents(__DIR__ . "/../../../../en/{$name}.md", $md);

        return Command::SUCCESS;
    }

    protected function parseContent(DOMNodeList $dom_list, int $prefix = 0): string
    {
        $text = '';

        /** @var DOMElement $item */
        foreach ($dom_list as $item) {
            if ($item->nodeType == XML_TEXT_NODE) {
                $text .= $this->parseText($item);
            } else {
                $text .= $this->{'parse' . ucfirst($item->nodeName)}($item, $prefix);
                if (substr($text, 0, 1) == "\n") {
                    $text = "\n" . ltrim($text, "\n");
                } elseif (substr($text, -1) == "\n") {
                    $text = ltrim($text, "\n") . "\n";
                }
            }
        }

        return $text;
    }

    protected function parseText(\DOMText $item): string
    {
        return ltrim(str_replace(["\n", '&nbsp;'], ' ', $item->wholeText));
    }

    protected function parseDiv(DOMElement $item): string
    {
        // 这里需要向上循环，查询是否存在 docs-auto-hide-page-toc，如果存在，则不需要渲染
        if ($item->getAttribute("class") == 'toc') {
            $tmp = $item->parentNode;
            while ($tmp instanceof DOMElement) {
                if ($tmp->getAttribute('class') == 'docs-auto-hide-page-toc') {
                    return '';
                } else {
                    $tmp = $tmp->parentNode;
                }
            }
        }

        return $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseH1(DOMElement $item): string
    {
        return "# " . $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseH2(DOMElement $item): string
    {
        return "## " . $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseH3(DOMElement $item): string
    {
        return "### " . $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseA(DOMElement $item): string
    {
        $a = "[" . $this->parseContent($item->childNodes) . "](" . $item->getAttribute('href') . ")";

        return $a == '[]()' ? '' : $a;
    }

    protected function parseP(DOMElement $item): string
    {
        dump($this->parseContent($item->childNodes));

        return $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseUl(DOMElement $item, $prefix = 0)
    {
        $this->parseContent($item->childNodes, ++$prefix);
    }

    protected function parseLi(DOMElement $item, int $prefix = 1): string
    {
        dd($prefix);
        return str_repeat("    ", $prefix - 1) . "- " . $this->parseContent($item->childNodes) . "\n";
    }

    protected function parseB(DOMElement $item): string
    {
        return "**" . $this->parseContent($item->childNodes) . "**";
    }

    protected function parseI(DOMElement $item): string
    {
        return "*" . $this->parseContent($item->childNodes) . "*";
    }

    protected function parseSpan(DOMElement $item): string
    {
        return $this->parseContent($item->childNodes);
    }

    protected function parseStrong(DOMElement $item): string
    {
        return $this->parseB($item);
    }

    protected function parseCode(DOMElement $item): string
    {
        if (str_contains('literal', $item->getAttribute('class'))) {
            return "`" . $this->parseContent($item->childNodes) . "`";
        } else {
            return "```\n" . $this->parseContent($item->childNodes) . "\n```\n";
        }
    }

    protected function parseHr(DOMElement $item): string
    {
        return '';
    }

    protected function parseBr(DOMElement $item): string
    {
        return '';
    }

//    protected function parseDl(DOMElement $item)
//    {
//        dd($item->parentNode->textContent);
//    }
}

