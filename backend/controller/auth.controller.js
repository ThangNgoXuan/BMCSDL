import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
    try {
        let { token } = res.cookies

        if(token !== undefined) {

            const decoded = jwt.verify(token, 'admin')
            
            if (decoded){}
        }
    } catch(err) {
        res.r
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if (username && password) {
        global.USERNAME = username;
        global.PASSPORD = password;
    }
}