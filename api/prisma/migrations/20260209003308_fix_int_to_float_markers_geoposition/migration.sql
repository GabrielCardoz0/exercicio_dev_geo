/*
  Warnings:

  - You are about to alter the column `lat` on the `markers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `lon` on the `markers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_markers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "place_id" INTEGER,
    "display_name" TEXT,
    "building" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postcode" TEXT,
    CONSTRAINT "markers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_markers" ("building", "city", "country", "created_at", "display_name", "id", "lat", "lon", "place_id", "postcode", "state", "updated_at", "user_id") SELECT "building", "city", "country", "created_at", "display_name", "id", "lat", "lon", "place_id", "postcode", "state", "updated_at", "user_id" FROM "markers";
DROP TABLE "markers";
ALTER TABLE "new_markers" RENAME TO "markers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
