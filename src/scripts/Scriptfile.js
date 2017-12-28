 $(function () {
            var Message;
            Message = function (arg) {
                debugger;
                this.text = arg.text, this.message_side = arg.message_side;
                this.draw = function (_this) {
                    return function () {
                        debugger;
                        var $message;
                        $message = $($('.message_template').clone().html());
                        $message.addClass(_this.message_side).find('.text').html(_this.text);
                        $('.messages').append($message);
                        var colors = ['Red', 'orange', 'blue']; // Define Your colors here, can be html name of color, hex, rgb or anything what You can use in CSS
                        var active = 0;
                        return setTimeout(function () {
                            document.querySelector('body').style.background = colors[active];
                            active++;
                            if (active == colors.length) active = 0;
                            return $message.addClass('appeared');
                        }, 0);
                    };
                }(this);
                return this;
            };
            $(function () {
                var getMessageText, message_side, sendMessage;
                message_side = 'right';
                getMessageText = function () {
                    debugger;
                    var $message_input;
                    $message_input = $('.message_input');
                    return $message_input.val();
                };
                sendMessage = function (text) {
                    debugger;
                    var $messages, message;
                    if (text.trim() === '') {
                        return;
                    }
                    $('.message_input').val('');
                    $messages = $('.messages');
                    message_side = 'left';
                    message = new Message({
                        text: text,
                        message_side: message_side
                    });
                    message.draw();
                    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                };
                $('.send_message').click(function (e) {
                    debugger;
                    return sendMessage(getMessageText());
                });
                $('.message_input').keyup(function (e) {
                    if (e.which === 13) {
                        return sendMessage(getMessageText());
                    }
                });
              });
        }.call(this));
