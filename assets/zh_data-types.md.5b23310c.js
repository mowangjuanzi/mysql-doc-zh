import{_ as e,o as t,c as a,U as o}from"./chunks/framework.76b79cb5.js";const f=JSON.parse('{"title":"第 11 章 数据类型","description":"","frontmatter":{},"headers":[],"relativePath":"zh/data-types.md","filePath":"zh/data-types.md"}'),d={name:"zh/data-types.md"},c=o('<h1 id="第-11-章-数据类型" tabindex="-1">第 11 章 数据类型 <a class="header-anchor" href="#第-11-章-数据类型" aria-label="Permalink to &quot;第 11 章 数据类型&quot;">​</a></h1><p>MySQL 支持多种分类的 SQL 数据类型: 数字类型, 日期和时间类型, 字符串(字符和字节)类型, 空间类型, 和 <a href="./json.html"><code>JSON</code></a> 数据类型. 本章提供了简介和每个分类中类型属性的更多详细的介绍, 以及数据类型存储要求的摘要. 开始的概述故意简短. 有关特定数据类型的更多信息, 比如你可以指定值的允许格式, 请参阅更加纤细的说明.</p><p>数据类型描述使用如下约定:</p><ul><li><p>对于整数类型, <em><code>M</code></em> 表示最大显示宽度. 对于浮点和定点类型, <em><code>M</code></em> 是可存储的总位数(精度). 对于字符串类型, <em><code>M</code></em> 是最大长度. <em><code>M</code></em> 的最大允许值依赖数据类型.</p></li><li><p><em><code>D</code></em> 适用于浮点和定点类型, 表示小数点后的位数(小数位数). 最大的可能值是 30, 但是不应大于 <em><code>M</code></em> −2.</p></li><li><p><em><code>fsp</code></em> 适用于 <a href="./time.html">TIME</a>, <a href="./datetime.html">DATETIME</a>, 和 <a href="./datetime.html">TIMESTAMP</a> 类型, 代表秒的精确小数部分; 也就是说, 秒的小数点后面的小数部分的位数. 如果指定 <em><code>fsp</code></em> 值, 必须在 0 到 6 之间. 值为 0 表示没有小数部分. 如果省略, 默认精度是 0. (这个不同于标准 SQL 的默认值为 6 不同, 因为它兼容以前的 MySQL 版本.)</p></li><li><p>方括号(<code>[</code> 和 <code>]</code>) 表示类型定义的可选部分.</p></li></ul>',4),m=[c];function s(p,i,r,l,_,h){return t(),a("div",null,m)}const T=e(d,[["render",s]]);export{f as __pageData,T as default};
