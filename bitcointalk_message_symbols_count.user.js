// ==UserScript==
// @name         Bitcointalk Message Symbols Count
// @version      1.0
// @description  Count of the number of symbols in a message
// @author       DimNS
// @match        https://bitcointalk.org/index.php?topic=*
// @match        https://bitcointalk.org/index.php?action=post;topic=*
// @grant        none
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @updateURL    https://openuserjs.org/meta/DimNS/bitcointalk_message_symbols_count.user.js
// @copyright    2018+, DimNS
// @license      MIT
// ==/UserScript==
(function () {
    function addButton() {
        var previewButton = $('input[type="submit"][name="preview"][value="Preview"]');

        if (previewButton.length > 0) {
            var countButton = $('<button type="button">Count Symbols</button>');

            countButton.click(function () {
                var string   = $('textarea[name="message"]').val();
                var prepared = string.replace(/\[quote/g, '▫').replace(/\[\/quote]/g, '▪');
                var message  = '';
                var lt       = 0;
                for (var i in prepared) {
                    var symbol = prepared[i];

                    if (lt <= 0 && symbol !== '▫' && symbol !== '▪' && symbol !== '') {
                        message += symbol;
                    } else if (symbol === '▫') {
                        lt++;
                    } else if (symbol === '▪') {
                        lt--;
                    }
                }

                message = message.replace(/^\s+/g, '');
                message = message.replace(/\s+$/g, '');
                message = message.replace(/\s+/g, ' ');

                var lengthWithSpace    = message.length;
                var lengthWithoutSpace = message.replace(/\s+/g, '').length;

                alert(
                    'My Message: "' + message + '"\n' +
                    '\n' +
                    lengthWithSpace + ': Length with whitespace' + '\n' +
                    lengthWithoutSpace + ': Length without whitespace'
                );
            });

            previewButton.after(countButton).after(' ');
        }
    }

    addButton();
})();