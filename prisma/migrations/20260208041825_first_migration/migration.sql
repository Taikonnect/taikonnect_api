-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sys_admin" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" VARCHAR(255),
    "password" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "rg" TEXT,
    "cpf" TEXT,
    "phone" TEXT,
    "address" JSONB,
    "account_stage" TEXT,
    "language" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
