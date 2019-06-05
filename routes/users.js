const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../store/user');
const authConfig = require('../configs/auth');
const crypto = require('crypto');
const mailer = require('../services/email-services');
const config = require('../configs/config');

function gerarToken(params) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {

    if (await Usuario.User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já cadastrado' });

    const user = await Usuario.User.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: gerarToken({ id: user.id }),
    });
  } catch (error) {
    return res.status(400).send({ error: 'Falha no registro' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.User.findOne({ email }).select('+password');

  if (!user)
    return res.status(400).send({ error: 'Usuario não encotrado' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Usuário ou senha inválido' });

  user.password = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  return res.send({
    user,
    token: gerarToken({ id: user.id }),
  });
});

router.post('/forgot_password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Usuario.User.findOne({ email }).catch(error => {
      return res.status(400).send({ error: 'Erro ao abrir o monto desc.: ' + error });
    });

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado ' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 3);

    await Usuario.User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    })

    var emailBody = config.emailReset.replace('{0}', user.name);
    emailBody = emailBody.replace('{1}', '<a href="https://testebh.herokuapp.com/users/reset/' + token + '">aqui</a>');

    await mailer.send(email, 'Reset de senha (Marvel API)', emailBody);
    res.send({ success: 'Operação realizada com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro no esqueci minha senha' });
  }
});

router.post('/reset_password', async (req, res) => {
  try {
    const { email, token, password } = req.body;
    const user = await Usuario.User.findOne({ email });

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado ' });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'Token inválido' });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'Token expirado, gere um novo' });

    user.password = password;
    await user.save();

    res.send({ success: 'Operação realizada com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro no reset minha senha' });
  }
});

router.get('/reset/:token', async (req, res) => {
  try {
    var token = req.params.token;
    const user = await Usuario.User.findOne({ passwordResetToken: token });

    if (!user)
      return res.redirect('/login');

    if (token !== user.passwordResetToken)
      return res.redirect('/login');

    res.render('reset_password', { token: token, email: user.email, style: 'reset.css' });
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
});

module.exports = router;
