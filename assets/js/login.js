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
        return validate($form);
      },
      success: function(response, status, xhr, $form) {
        switch(response.status) {
          case 'error':

            break;
          case 'ok':

            break;
        }
      },
      error: function() {
        console.log("communication error");
      }
    });

    var validate = function($form) {
      var valid = true;

      $('.text', $form).each(function() {
        var type = $(this).attr('data-type');
        var value = $(this).val();

        switch(type) {
          case 'email':
            if (value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
              loginForm.hideErrorTooltip($(this).parent());
            } else {
              valid = valid && false;
              loginForm.showErrorTooltip($(this).parent(), 'Invalid e-mail');
            }
            break;
          case 'password':
            if (value.length >= 6 && value.length <= 255) {
              loginForm.hideErrorTooltip($(this).parent());
            } else {
              valid = valid && false;
              loginForm.showErrorTooltip($(this).parent(), 'Invalid password');
            }
            break;
        }
      });

      return valid;
    };
  },

  showErrorTooltip: function(container, message) {
    if ($('.error-tooltip-container', container).length > 0) {
      $('.error-tooltip-container:first', container).hide().fadeIn('fast');
    } else {
      var tooltip = $('<div class="error-tooltip-container" style="display:none"><div class="error-tooltip-border"></div><div class="error-tooltip-arrow"></div><span class="tooltip-message">' + message + '</span></div>')
      $(container).append(tooltip);
      tooltip.fadeIn('fast');
    }
  },

  hideErrorTooltip: function(container) {
    $('.error-tooltip-container', container).fadeOut('fast', function() {
      $(this).remove();
    });
  }
};

$(function() {
  loginForm.init($('#login'));
});
