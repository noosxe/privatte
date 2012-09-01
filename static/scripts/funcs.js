function renderBackground() {
    var wrapper = $("#wrapper");

    var prefix = "bg_";
    var postfix = ".png";
    var time_limit = 0;

    function placeImage(num) {
        var img = $("<img src='/static/images/bg/" + prefix + num + postfix + "' class='back' style='display:none'>");
        img.load(function () {
            var img = $(this);
            img.fadeIn();
            if (num < 100) {
                setTimeout(function () {
                    placeImage(num+1);
                }, time_limit);
            }
        });
        wrapper.append(img);
    }

    placeImage(1);
}

function encryptText(text) {
    //var key = RSA.getPublicKey($('.loginHash').val().replace(/\n/g, ""));
    //return RSA.encrypt(text, key);

    var rsa = new RSAKey();
    rsa.setPublic("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzpCkARs+/w7ygkwwrqte3JIJF8TAN95nn6dZaEe5WjMNLqVfcuaMMc+8MCPp2Ml/sh/JWcBvhZ8mMMNiYc2cRSIeMkFM+cYcEID0yJSsXMvIIbs55Qz0xqvcrK/B7ZcEdowr6x76UySHAny9ohrWodEF/rphinYa64AW/jcJSUZGhG+QiKJD5FJnUWfYCVWPVuPd1m4lOPxnHDvlxZnWdxYP2Ef0riItb5S026FsLOcRGNFwRSOckWlH0OGI1luQQxubMfmufKyay9fMbhVE9rbB7f2aGlkhOYpgAgTL97LT83NfEiIjMNNarG6rMdxsRTCBEqH8kKWYAp3D6C3wPQIDAQAB", "10001");
    var res = rsa.encrypt(text);
    return res;
}