-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_markers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "lat" INTEGER NOT NULL,
    "lon" INTEGER NOT NULL,
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
