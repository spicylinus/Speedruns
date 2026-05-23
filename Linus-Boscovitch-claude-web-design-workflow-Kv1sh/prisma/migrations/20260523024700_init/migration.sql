-- CreateTable
CREATE TABLE "IntelligenceBrief" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keywords" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "data" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "briefId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "expectedResult" TEXT NOT NULL,
    "targetFile" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "diff" TEXT,
    "commitSha" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WorkOrder_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "IntelligenceBrief" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
