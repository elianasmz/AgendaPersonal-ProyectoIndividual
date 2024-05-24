const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "$ecRet0_"

const register = (req, res) => {
    let userData = req.body

    bcrypt.hash(userData.password, 10, (err, hash) => {
        if (err) {
            res.json({error: err})
        } else {
            let user = new User({
                ...userData,
                password: hash
            })
            user.save()
                .then((data) => {
                    res.json({data})
                })
                .catch((error) => {
                    res.json({error})
                })
        }
    });
}

const login = async (req, res) => {
    let data = req.body;
    try {
        let user = await User.findOne({ email: data.email });

        // Verifica si el usuario no fue encontrado
        if (!user) {
            return res.json({ error: "Usuario no encontrado" });
        }

        let samePassword = await bcrypt.compareSync(data.password, user.password);

        if (samePassword){
            const payload = {
                id: user._id,
                name: user.name
            }

            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "30h"
            });

            let refreshToken = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d"
            });

            res.cookie("token", token, {
                httpOnly: true
            })

            res.json({
                user: payload,
                token,
                refreshToken
            })
        } else {
            res.json({error: "Usuario y contraseña equivocados"})
        }
    } catch (error) {
        console.log(error)
        res.json({error: error.toString()}) 
    }
}

const refresh = (req, res) => {
    let data = req.body;

    if (!data.refreshToken){
        return res.json({error: "Refresh token no enviado"})
    }

    try {
        let payload = jwt.verify(data.refreshToken, JWT_SECRET);
        payload = {
            id: payload.id,
            name:payload.name
        }

        let token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "30s"
        });
        let refreshToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1000d"
        });

        res.json({
            token,
            refreshToken
        })
        
    } catch (error) {
        return res.json({error: error.toString()})
    }
}

module.exports = {
    register,
    login,
    refresh
}