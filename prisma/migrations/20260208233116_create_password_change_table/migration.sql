-- DropIndex
DROP INDEX "groups_id_key";

-- DropIndex
DROP INDEX "users_id_key";

-- CreateTable
CREATE TABLE "password_changes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_changes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "password_changes" ADD CONSTRAINT "password_changes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
