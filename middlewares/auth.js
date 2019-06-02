const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error : 'Token não informado'});

    const parts = authHeader.split(' ');

    if (! parts === 2)
       return res.status(401).send({ error : 'Token errado'});

    const [schema, Token] = parts;

    if (!/Bearer$/i.test(schema))
       return res.status(401).send({ error : 'Token mal formatado'});

    if (jwt.verify(Token, authConfig.secret, (err, decoded) => {
        if(err) 
           return res.status(401).send({ error : 'Token inválido'});

        req.userId = decoded.id;
        next();
    }));     
}