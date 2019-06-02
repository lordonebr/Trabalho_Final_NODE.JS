$(document).ready(function () {
    $(document).on('click', '.cadastroJS', function () {
        $('.modal-cadastro').modal('show');
    });

    $(document).on('click', '.senhaJS', function () {
        $('.modal-senha').modal('show');
    });

    $('#formlogin').submit(function () {
        if ($('#inputEmail-js').val() == "" || $('#inputSenha-js').val() == "") {
            toastr["warning"]("Usuário e senha deve ser informado! :-(");
            return false;
        }

        var btnEntrar = $('.btn-login-js');
        btnEntrar.attr("disabled", "disabled");

        var vData = { username: $('#inputEmail-js').val(), password: $('#inputSenha-js').val() };

        $.ajax({
            url: 'http://localhost:3000/auth/local/callback',
            type: 'POST',
            data: vData,
            dataType: "json",
            complete: function (result) {
                if (result.status != 200) {
                    toastr["error"]("Usuário ou senha inválido!");
                } else {
                    toastr.options.timeOut = 15;
                    toastr.options.onHidden = function () { location.href = '/'; };
                    toastr.success("Login efetuado com sucesso.");
                }

                btnEntrar.removeAttr("disabled");
            }
        });

        return false;
    });

    $('#cadastro-user-js').submit(function () {
        var nameIn = $('#recipient-name').val(),
            emailIn = $('#recipient-email').val(),
            passwordIn = $('#recipient-senha').val(),
            passwordConfirmIn = $('#recipient-confirm-senha').val();

        if (passwordIn !== passwordConfirmIn) {
            toastr["error"]("As senhas informadas são diferentes");
            return false;
        }

        var btnCadastrar = $('.btn-cadastro-js');
        btnCadastrar.attr("disabled", "disabled");

        var vData = { name: nameIn, email: emailIn, password: passwordIn };

        $.ajax({
            url: 'http://localhost:3000/users/register',
            type: 'POST',
            data: vData,
            dataType: "json",
            complete: function (result) {
                if (result.status != 200) {
                    var retorno = JSON.parse(result.responseText);
                    toastr["error"](retorno.error);
                } else {
                    var vData = { username: emailIn, password: passwordIn };

                    $.ajax({
                        url: 'http://localhost:3000/auth/local/callback',
                        type: 'POST',
                        data: vData,
                        dataType: "json",
                        complete: function (result) {
                            if (result.status != 200) {
                                toastr["error"]("Usuário ou senha inválido!");
                            } else {
                                toastr.options.timeOut = 15;
                                toastr.options.onHidden = function () { location.href = '/'; };
                                toastr.success("Login efetuado com sucesso.");
                            }

                            btnEntrar.removeAttr("disabled");
                        }
                    });
                }
                btnCadastrar.removeAttr("disabled");
            }
        });

        return false;
    });

    $('#esqueceu-senha-js').submit(function () {
        if ($('#campo-email').val() == "") {
            toastr["warning"]("Email deve ser informado! :-(");
            return false;
        }

        var btnEnviar = $('.btn-env-senha-js');
        btnEnviar.attr("disabled", "disabled");

        var vData = { email: $('#campo-email').val() };

        $.ajax({
            url: 'http://localhost:3000/users/forgot_password',
            type: 'POST',
            data: vData,
            dataType: "json",
            complete: function (result) {
                var retorno = JSON.parse(result.responseText);

                if (result.status != 200) {                    
                    toastr["error"](retorno.error);
                } else {
                    toastr.options.timeOut = 50;
                    toastr.success(retorno.success);
                    $('.modal-senha').modal('hide');
                }

                btnEnviar.removeAttr("disabled");
            }
        });

        return false;
    });
});