import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 10000,
        timeout: 30000,
    },
})

export async function userSeeder() {
    const users = [
        {
            is_active: true,
            sys_admin: false,
            name: 'Felipe Yuiti Sasaki',
            email: 'felipe.sasaki95@gmail.com',
            nickname: 'Yuiti',
            password: 'sasaki123',
            birth_date: new Date('1995-03-01'),
            rg: null,
            cpf: null,
            address: null,
            account_stage: 'accept_pending',
            language: 'pt-BR',
            theme: 'light',
        },
        {
            is_active: true,
            sys_admin: false,
            name: 'Takayuki Kajiwara',
            email: 'taka.sysdev@gmail.com',
            nickname: 'Taka',
            password: 'taka123',
            birth_date: new Date('1994-08-05'),
            rg: null,
            cpf: null,
            address: null,
            account_stage: 'accept_pending',
            language: 'pt-BR',
            theme: 'light',
        },
    ]

    await prisma.$transaction(async (tx) => {
        for (const user of users) {
            const userExists = await tx.user.findUnique({
                where: {
                    email: user.email, // precisa ser @unique no schema
                },
            })

            if (userExists) {
                continue
            }

            const hashedPassword = await bcrypt.hash(user.password, 10)

            await tx.user.create({
                data: {
                    is_active: user.is_active,
                    sys_admin: user.sys_admin,
                    name: user.name,
                    email: user.email,
                    nickname: user.nickname,
                    password: hashedPassword,
                    birth_date: user.birth_date,
                    rg: user.rg,
                    cpf: user.cpf,
                    address: user.address,
                    account_stage: user.account_stage,
                    language: user.language,
                    theme: user.theme,
                },
            })
        }
    })

    await prisma.$disconnect()
    return true
}