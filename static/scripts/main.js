var socket = io.connect('http://' + window.location.host);

var connected = false;

socket.on('connect', function() {
	connected = true;
});

socket.on('new-message', function(data) {
	messageReceived(data.message, data.sender);
});

var loginForm = {
    init: function(selector) {
        $(selector).ajaxForm({
            dataType: 'json',
            beforeSerialize: function($form) {
                $('input[type=text], input[type=password]', $form).each(function() {
                    $(this).val($(this).val().trim());
                });
            },
            beforeSubmit: function(arr, $form) {
                var valid = validate($form);
                if (!valid) return false;
            },
            success: function(responseText, statusText, xhr, $form) {
                console.log(statusText);
            },
            error: function() {
                console.log("communication error");
            }
        });

        var validate = function($form) {
            var valid = true;

            $('.login-input-wrapper', $form).each(function() {
                var input = $('input', this);
                var type = input.attr('type');
                var value = input.val();
                var min = parseInt(input.attr('min'));
                var max = parseInt(input.attr('max'));

                var showErrorTooltip = function(container) {
                    if ($('.error-tooltip-container', container).length > 0) {
                        $('.error-tooltip-container:first', container).hide().fadeIn('fast');
                    } else {
                        var message = $('input', container).attr('message');
                        var tooltip = $('<div class="error-tooltip-container" style="display:none"><div class="error-tooltip-border"></div><div class="error-tooltip-arrow"></div><span class="tooltip-message">' + message + '</span></div>')
                        $(container).append(tooltip);
                        tooltip.fadeIn('fast');
                    }
                };

                var hideErrorTooltip = function(container) {
                    $('.error-tooltip-container', container).fadeOut('fast', function() {
                        $(this).remove();
                    })
                };

                switch(type) {
                    case 'text': {
                        if (value.length < min || value.length > max) {
                            valid = valid && false;
                            showErrorTooltip(this);
                        } else {
                            hideErrorTooltip(this);
                        }
                    }
                        break;
                    case 'password': {
                        if (value.length < min || value.length > max){
                            valid = valid && false;
                            showErrorTooltip(this);
                        } else {
                            hideErrorTooltip(this);
                        }
                    }
                        break;
                    default: {}
                }
            });

            return valid;
        }
    }
};

function messageReceived(message, sender) {
	var li = $('<li></li>').text(sender + ': ' + message);
	console.log(li);
	$('.message-thread').append(li);
}

function sendMessage() {
	var input = $('.chat-input');
	var message = input.val();
	message = message.trim();
	if (message.length == 0) return;
	input.val('');
	socket.emit('new-message', { message: message });
}

$(function() {
	// login form
	if ($('#login-form'))
		loginForm.init("#login-form");

	// thread page
	$('.send-button').on('click', function() {
		sendMessage();
	});

	$('.chat-input').on('keydown', function(e) {
		if(e.keyCode == 13){
			sendMessage();
		}
	})
});