/*
  Warnings:

  - You are about to drop the column `status` on the `Todolist` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todolist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Todolist" ("createdAt", "id", "isDeleted", "title", "updatedAt") SELECT "createdAt", "id", "isDeleted", "title", "updatedAt" FROM "Todolist";
DROP TABLE "Todolist";
ALTER TABLE "new_Todolist" RENAME TO "Todolist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
