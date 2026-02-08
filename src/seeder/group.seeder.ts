import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 10000,
        timeout: 30000,
    },
})

export async function groupSeeder() {
    const groups = [
        {
            is_active: true,
            name: 'Wakaba Taiko',
            email: '',
            shortname: 'WKT',
        }
    ]

    await prisma.$transaction(async (tx) => {
        for (const group of groups) {
            const exists = await tx.group.findFirst({
                where: {
                    name: group.name
                },
            })

            if (exists) {
                continue
            }

            await tx.group.create({
                data: {
                    is_active: group.is_active,
                    name: group.name,
                    email: group.email,
                    shortname: group.email
                },
            })
        }
    })

    await prisma.$disconnect()
    return true
}