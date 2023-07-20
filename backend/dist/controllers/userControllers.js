"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
export const createUser: RequestHandler = async (req, res) => {
    const { username, password, checkPass } = req.body;

    if (!username)
        return res.status(422).json({ message: false, text: "Dados inválidos" });
    if (!password)
        return res.status(422).json({ message: false, text: "Dados inválidos" });
    if (!checkPass)
        return res.status(422).json({ message: false, text: "Dados inválidos" });

    if (checkPass !== password)
        return res.status(422).json({ message: false, text: "Senhas diferentes" });

    const [userExists] = await conn.query(
        `SELECT username from Username where username=?`,
        [username]
    )

    if (Array.isArray(userExists) && userExists.length > 0) {
        res.status(422).json({ message: false, text: "Usuário existente" });
    }

    const hash = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, hash);

    await conn.query(`INSERT INTO Username(username, password) VALUES (?, ?)`, [username, passwordHash]);

    res.status(200).json({ msg: true, text: "Usuário cadastrado com sucesso" });
}

export const createSession: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: false, text: "Dados inválidos" });
    }

    const [userExists] = await conn.query(
        `SELECT username, password from Username where username=?`,
        [username]
    )

    if (!Array.isArray(userExists) || userExists.length === 0) {
        res.status(422).json({ message: false, text: "Usuário não existe" });
    }
    const comparePasswords = await bcrypt.compare(password, userExists[0].password);
    if (!comparePasswords)
        return res.status(422).json({ msg: false, text: "Dados inválidos" });

        const token = {
            username: userExists
          };

    const sign = jwt.sign(token, process.env.JWT_TOKEN as string);

    res.cookie('token', sign, { httpOnly: true })
        .status(200)
        .json({ route: "/home" });
}

*/ 
