import { jwtVerify, SignJWT } from 'jose'

const SECRET_KEY = new TextEncoder().encode('huynp_secret_key')

export async function createFakeJwt(
    payloadData: Record<string, any>,
): Promise<string> {
    return await new SignJWT(payloadData)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(SECRET_KEY)
}

export async function parseFakeJwt<T = any>(token: string): Promise<T> {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as T
}
