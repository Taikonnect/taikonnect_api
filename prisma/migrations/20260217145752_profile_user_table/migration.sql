-- CreateTable
CREATE TABLE "permission_users" (
    "user_id" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_users_pkey" PRIMARY KEY ("user_id","profile")
);

-- AddForeignKey
ALTER TABLE "permission_users" ADD CONSTRAINT "permission_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
