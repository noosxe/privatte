var socket = io.connect(window.location.host);

var connected = false;

socket.on('connect', function() {
    connected = true;
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

                var pass = $("input[type=password]").val();
                //var pass = sha1($("input[type=password]").val());
                pass = encryptText(pass);

                for (var i in arr) {
                    var val = arr[i];
                    if (val['name'] == 'password') {
                        val['value'] = pass;
                    }
                }
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
}

$(function() {
    loginForm.init("#login-form");
});