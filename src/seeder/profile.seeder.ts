import { PrismaClient } from '@prisma/client'
import { ProfileType } from '../shared/constants/profile.enum'

const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 10000,
        timeout: 30000,
    },
})

export async function permissionSeeder() {
    const permissions = [
        {
            user_id: '5404a2dd-8e05-441a-bb9d-591608d103b3'
        }
    ]

    await prisma.$transaction(async (tx) => {
        for (const permission of permissions) {
            const exists = await tx.permissionUser.findFirst({
                where: {
                    user_id: permission.user_id
                },
            })

            if (exists) {
                continue
            }

            await tx.permissionUser.create({
                data: {
                    user_id: permission.user_id,
                    profile: ProfileType.Admin
                },
            })
        }
    })

    await prisma.$disconnect()
    return true
}