Ext.data.JsonP.getting_started({"guide":"<h1 id='getting_started-section-getting-started-with-the-api'>Getting Started with the API</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/getting_started-section-loading-the-api'>Loading the API</a></li>\n<li><a href='#!/guide/getting_started-section-setting-target-languages-on-html-textareas'>Setting Target Languages on HTML TextAreas</a></li>\n<li><a href='#!/guide/getting_started-section-using-the-tinymce4-wysiwyg-plugin'>Using the TinyMCE4 WYSIWYG Plugin</a></li>\n<li><a href='#!/guide/getting_started-section-available-keyboards'>Available Keyboards</a></li>\n</ol>\n</div>\n\n<p>The NFLCIME API enables you to easily add foreign language keyboards to your web applications.</p>\n\n<h2 id='getting_started-section-loading-the-api'>Loading the API</h2>\n\n<p>The API ships with three versions:</p>\n\n<ul>\n<li>A development version (nflcime.js)</li>\n<li>A merged, testing version (nflcime-packed)</li>\n<li>A compressed and minified production version (nflcime-packed.min.js)</li>\n</ul>\n\n\n<h3 id='getting_started-section-loading-the-development-version'>Loading the Development Version</h3>\n\n<p>The development verion enpoint is nflcime. This script will, in turn, autoload additional javascript subcomponents from the /NFLCIME/src folder.</p>\n\n<p>There are two typical use-cases:</p>\n\n<ul>\n<li>Attaching a virtual keyboard to an HTML Textarea</li>\n<li>Attaching a virtual keyboard to a WYSIWYG (TinyMCE4) Editor</li>\n</ul>\n\n\n<p>You can load the dev version for rich-text editors by inserting a &lt;script&gt; tag as illustrated by the following snippet:</p>\n\n<pre><code>&lt;script type=\"text/javascript\" src=\"NFLCIME/nflcime.js\"&gt;  \n Modules: [  \n  { id:'pers.cookie', activate:true}, \n  {id: 'cursor', activate: true},   \n  {id: 'rt', activate: true}   \n ]   \n&lt;/script&gt;   \n</code></pre>\n\n<p>Note that inside the &lt;script&gt; block is a \"Modules\" array that indicates which API subcomponents are going to be used.</p>\n\n<p>In addition to loading the nflcime script, you should also load the toolkit's stylesheet:</p>\n\n<pre><code>&lt;link rel=\"stylesheet\" type=\"text/css\" href=\"NFLCIME/fontcss/langs.css\" /&gt;\n</code></pre>\n\n<p>The following snippet illustrates how to load the library to attach to simple html textareas:</p>\n\n<pre><code>&lt;script type=\"text/javascript\" src=\"NFLCIME/nflcime.js\"&gt;\n  Modules:[\n    { id:'pers.cookie', activate:true},\n    { id:'ui.iframe', activate:true},\n    { id:'lang', activate:true}\n  ]\n&lt;/script&gt;\n</code></pre>\n\n<p>The following sub-modules are available:</p>\n\n<table>\n<thead>\n<tr>\n<th>Module       </th>\n<th> Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>pers.cookie  </td>\n<td> Personalization module. Stores last position of keyboard and other settings in a cookie.</td>\n</tr>\n<tr>\n<td>rt           </td>\n<td> Invoke when you need to support a rich-text editor.</td>\n</tr>\n<tr>\n<td>lang         </td>\n<td> Language class. Required when working with html text fields and textareas.</td>\n</tr>\n<tr>\n<td>ui.iframe    </td>\n<td> Draggable iframe that's used to render on-screen keyboard</td>\n</tr>\n</tbody>\n</table>\n\n\n<h3 id='getting_started-section-loading-compressed%2Fminified-versions'>Loading Compressed/Minified Versions</h3>\n\n<p>If you are loading the testing/production version of NFLCIME, add the compressed:true property to your Modules. Adding compressed:true signals the toolkit to not dynamically load API subcomponents.</p>\n\n<p>For example:</p>\n\n<pre><code>&lt;script type=\"text/javascript\" src=\"NFLCIME/nflcime.js\"&gt;\n  Modules:[\n    { id:'pers.cookie', activate:true, compressed: true},\n    { id:'ui.iframe', activate:true, compressed: true},\n    { id:'lang', activate:true, compressed: true}\n  ]\n&lt;/script&gt;\n</code></pre>\n\n<h2 id='getting_started-section-setting-target-languages-on-html-textareas'>Setting Target Languages on HTML TextAreas</h2>\n\n<p>You can set an HTML textarea to one of the supported languages by adding the following attributes to the &lt;textarea&rt; tag:</p>\n\n<ul>\n<li>lang : specify the 3-character ISO language code, e.g. 'deu' for German</li>\n<li>NFLCIME : Set to \"on\"</li>\n</ul>\n\n\n<p>Example:</p>\n\n<pre><code>&lt;label for=\"mygermantextarea\"&gt;German Content&lt;/label&gt;\n&lt;textarea id=\"mygermantextarea\" lang=\"deu\" class=\"lang-deu\" NFLCIME=\"on\" /&gt;\n</code></pre>\n\n<p>Right-to-Left languages should apply a CSS class or STYLE attribute that sets direction:rtl as illustrated by the following example:</p>\n\n<pre><code>&lt;label for=\"myarabictextarea\"&gt;Arabic Content&lt;/label&gt;\n&lt;textarea id=\"myarabictextarea\" lang=\"arb\" class=\"lang-arb\" style=\"direction:rtl\" NFLCIME=\"on\" /&gt;\n</code></pre>\n\n<h3 id='getting_started-section-putting-it-all-together'>Putting It All Together</h3>\n\n<p>The following snippet illustrates loading NFLC IME and attaching a keyboard to a textarea:</p>\n\n<pre><code>&lt;html&gt;\n&lt;head&gt;\n\n&lt;link rel=\"stylesheet\" type=\"text/css\" href=\"../NFLCIME/fontcss/langs.css\" /&gt;\n\n&lt;script language=\"javascript\" src=\"../NFLCIME/nflcime-packed.min.js\"&gt;\n\n    Modules:[\n     { id:'pers.cookie', activate:true },\n     { id:'ui.iframe', activate:true, compressed: true},\n     { id:'lang', activate:true , compressed: true}\n    ]\n&lt;/script&gt;\n\n&lt;style&gt;\n\n    TEXTAREA {\n        width: 400px;\n        height: 200px;\n    }\n\n&lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n&lt;h2&gt;Simple Deployment&lt;/h2&gt;\n\n\n&lt;h3&gt;Arabic, Libyan&lt;/h3&gt;\n&lt;textarea lang=\"ayl\" class=\"lang-ayl\" NFLCIME=\"on\" style=\"direction: rtl\"&gt;&lt;/textarea&gt;\n</code></pre>\n\n<h2 id='getting_started-section-using-the-tinymce4-wysiwyg-plugin'>Using the TinyMCE4 WYSIWYG Plugin</h2>\n\n<p>IME has a special plugin for the TinyMCE4 WYSIWYG editor.</p>\n\n<p>Currently the plugin is located in the /examples/TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/tinymce/plugins/bloom folder.</p>\n\n<p><img src=\"../resources/docs/tinymcewithime.png\" alt=\"tinymce4 screenshot\" /></p>\n\n<p>The following code, when placed in the html &lt;head&gt; performs the following functions:</p>\n\n<ul>\n<li>Loads the NFLC IME Library</li>\n<li>Loads TinyMCE</li>\n<li>Configures TinyMCE to attach to all textareas on the page</li>\n<li>Loads the \"bloom\" (NFLCIME) plugin into TinyMCE</li>\n<li>Configures which selectable language keyboards will be available to the user (bloom.languages property)</li>\n<li>Invokes the appropriate NFLCIME modules from TinyMCE</li>\n</ul>\n\n\n<!-- load the nflcime library with richtext option -->\n\n\n<pre><code>&lt;script src=\"../NFLCIME/nflcime.js\"&gt;\n    Modules: [\n        {id: 'cursor', compressed: false, activate: true},\n        {id: 'rt', compressed: false, activate: true}\n    ]\n&lt;/script&gt;\n\n&lt;!-- load the tinymce widget --&gt;\n&lt;script src=\"TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/tinymce/tinymce.js\"&gt;&lt;/script&gt;\n\n&lt;!-- initialize the tinymce editor(s) --&gt;\n&lt;script&gt;\n    tinymce.init({ \n     selector:\"textarea\",\n     menubar: false,\n     plugins: \"bloom paste code visualblocks\",\n     content_css: \"../NFLCIME/fontcss/langs.css,TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/ice/tinymce4_plugin/css/ice.css\",\n     bloom: {\n        css: '../../../../../../../../NFLCIME/fontcss/langs.css',\n        defaultLanguage : \"eng\",\n        default_language : \"eng\",\n        languages : \"arb,amh,sqi,eng\",\n        services: \"kb,cvt,rt\",\n        Modules: [\n            {id: 'pers.cookie', activate: true},\n            {id: 'ui.iframe', activate: true},\n            {id: 'editor.tinymce', activate: true},\n            {id: '<a href=\"#!/api/rt.scrube\" rel=\"rt.scrube\" class=\"docClass\">rt.scrube</a>', activate: true},\n            {id: 'lang', activate: true}\n        ]\n     },\n     toolbar1: \"undo redo | bold italic | strikethrough | charmap | code |  visualblocks  | bloomlanguagebutton bloomlanguageenablebutton bloomlanguageselectblockbutton bloomcharmapbutton | ice_togglechanges ice_toggleshowchanges iceacceptall icerejectall iceaccept icereject\"\n    });\n\n&lt;/script&gt;\n</code></pre>\n\n<h2 id='getting_started-section-available-keyboards'>Available Keyboards</h2>\n\n<p>Keyboard definitions are registered in the NFLCIME/src/languages.json file.</p>\n\n<p>Available keyboards include:</p>\n\n<table>\n<thead>\n<tr>\n<th>Language     </th>\n<th> Code   </th>\n<th> Language  </th>\n<th> Code </th>\n<th> Language </th>\n<th> Code </th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td></td>\n<td>        </td>\n<td>           </td>\n<td>      </td>\n<td>          </td>\n<td>      </td>\n</tr>\n<tr>\n<td>Albanian     </td>\n<td> sqi    </td>\n<td> Amharic   </td>\n<td> amh  </td>\n<td> Arabic   </td>\n<td> arb  </td>\n</tr>\n<tr>\n<td>Azeri        </td>\n<td> aze    </td>\n<td> Bambara   </td>\n<td> bam  </td>\n<td> Balochi  </td>\n<td> bal  </td>\n</tr>\n<tr>\n<td>Belarussian  </td>\n<td> bel    </td>\n<td> Bengali   </td>\n<td> ben  </td>\n<td> Brahui   </td>\n<td> brh  </td>\n</tr>\n<tr>\n<td>Bulgarian    </td>\n<td> bul    </td>\n<td> Burmese   </td>\n<td> mya  </td>\n<td> Chechen  </td>\n<td> che  </td>\n</tr>\n<tr>\n<td>Chinese      </td>\n<td> zho    </td>\n<td> Croatian  </td>\n<td> hrv  </td>\n<td> Czech    </td>\n<td> ces  </td>\n</tr>\n<tr>\n<td>Danish       </td>\n<td> dan    </td>\n<td> Dari      </td>\n<td> prs  </td>\n<td> Dinka    </td>\n<td> din  </td>\n</tr>\n<tr>\n<td>Dutch        </td>\n<td> nld    </td>\n<td> Estonian  </td>\n<td> est  </td>\n<td> Farsi    </td>\n<td> fas  </td>\n</tr>\n<tr>\n<td>Finnish      </td>\n<td> fin    </td>\n<td> French    </td>\n<td> fra  </td>\n<td> Georgian </td>\n<td> kat  </td>\n</tr>\n<tr>\n<td>German       </td>\n<td> deu    </td>\n<td> Greek     </td>\n<td> ell  </td>\n<td> Gujarati </td>\n<td> guj  </td>\n</tr>\n<tr>\n<td>Haitian      </td>\n<td> hat    </td>\n<td> Hassaniyya </td>\n<td> mey </td>\n<td> Hausa   </td>\n<td> hau  </td>\n</tr>\n<tr>\n<td>Hebrew       </td>\n<td> heb    </td>\n<td> Hindi     </td>\n<td> hin  </td>\n<td> Hindko   </td>\n<td> hno  </td>\n</tr>\n<tr>\n<td>Hungarian    </td>\n<td> hun    </td>\n<td> Igbo      </td>\n<td> ibo  </td>\n<td> Iraqi    </td>\n<td> acm  </td>\n</tr>\n<tr>\n<td>Italian      </td>\n<td> ita    </td>\n<td> Kashmiri  </td>\n<td> kas  </td>\n<td> Kazakh   </td>\n<td> kaz  </td>\n</tr>\n<tr>\n<td>Korean       </td>\n<td> kor    </td>\n<td> Kurdish   </td>\n<td> kur  </td>\n<td> Kurmanji </td>\n<td> kmr  </td>\n</tr>\n<tr>\n<td>Kyrgyz       </td>\n<td> kir    </td>\n<td> Latvian   </td>\n<td> lav  </td>\n<td> Lithuanian </td>\n<td> lit </td>\n</tr>\n<tr>\n<td>Lao          </td>\n<td> lao    </td>\n<td> Macedonian </td>\n<td> mkd </td>\n<td> maguindanao </td>\n<td> mdh </td>\n</tr>\n<tr>\n<td>Maranao      </td>\n<td> mrw    </td>\n<td> Norwegian </td>\n<td> nor  </td>\n<td> Pashto   </td>\n<td> pus </td>\n</tr>\n<tr>\n<td>Potwari      </td>\n<td> phr    </td>\n<td> Polish    </td>\n<td> pol  </td>\n<td> ePunjabi </td>\n<td> pan </td>\n</tr>\n<tr>\n<td>wPunjabi     </td>\n<td> pnb    </td>\n<td> Portugese </td>\n<td> por  </td>\n<td> Quechua  </td>\n<td> que </td>\n</tr>\n<tr>\n<td>Romanian     </td>\n<td> ron    </td>\n<td> Russian   </td>\n<td> rus  </td>\n<td> Sama     </td>\n<td> ssb </td>\n</tr>\n<tr>\n<td>Serbian      </td>\n<td> srp    </td>\n<td> Sindhi    </td>\n<td> snd  </td>\n<td> Siraiki  </td>\n<td> skr </td>\n</tr>\n<tr>\n<td>Slovene      </td>\n<td> slv    </td>\n<td> Slovak    </td>\n<td> slk  </td>\n<td> Sorani   </td>\n<td> ckb </td>\n</tr>\n<tr>\n<td>Spanish      </td>\n<td> spa    </td>\n<td> Sudanese  </td>\n<td> apd  </td>\n<td> Swahili  </td>\n<td> swa </td>\n</tr>\n<tr>\n<td>Swedish      </td>\n<td> swe    </td>\n<td> Tagalog   </td>\n<td> tgl  </td>\n<td> Tajik    </td>\n<td> tgk </td>\n</tr>\n<tr>\n<td>Thai         </td>\n<td> tha    </td>\n<td> Tigrinya  </td>\n<td> tir  </td>\n<td> Turkish  </td>\n<td> tur </td>\n</tr>\n<tr>\n<td>Turkmen      </td>\n<td> tuk    </td>\n<td> Ukranian  </td>\n<td> ukr  </td>\n<td> Uzbek    </td>\n<td> uzb </td>\n</tr>\n<tr>\n<td>Wolof        </td>\n<td> wol    </td>\n<td> Urdu      </td>\n<td> urd  </td>\n<td> Vietnamese </td>\n<td> vie </td>\n</tr>\n<tr>\n<td>Yakan        </td>\n<td> yka    </td>\n<td> Yoruba    </td>\n<td> yor</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n\n","title":"Getting Started with NFLC IME"});