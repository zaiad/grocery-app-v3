import jwt from 'jsonwebtoken';

interface User {
    _id: string;
    email: string;
}

function accesToken(user: User): string {
    const acces_token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: '1s',
        }
    );
    return acces_token;
}

export default accesToken;
