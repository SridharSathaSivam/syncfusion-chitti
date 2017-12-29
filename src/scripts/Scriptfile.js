$(function() {
    var Message;
    Message = function(arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function(_this) {
            return function() {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function() {
                    $("body .chat_window .messages").css("background", "linear-gradient(to right, lightgreen, pink)");
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function() {
        var getMessageText, message_side, sendMessage, usertext;
        message_side = 'right';
        getMessageText = function() {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function(text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
            var text = text.replace(exp, "<a href='$1' target='_blank'>$3</a>");
            message = new Message({
                text: text,
                message_side: message_side
            });

            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            var usertext = getMessageText();
            sendMessage(getMessageText());
            ajaxsend(usertext);
          
        });
        function ajaxsend(usertext) {
            $.ajax({
                url: 'http://localhost:8000/?chat="' + usertext + '"',
                dataType: 'text',
                contentType: 'application/json',
                type: 'GET',
                success: function (data) {
                    debugger
                    sendMessage(JSON.parse(data).ans);

                },
                complete: function () {
                    debugger
                },
                error: function () {
                    debugger
                },

            });
        }
        $('.message_input').keyup(function(e) {
            if (e.which === 13) {
                var usertext = getMessageText();
                sendMessage(getMessageText());
                ajaxsend(usertext)
            }
        });
    });
}.call(this));