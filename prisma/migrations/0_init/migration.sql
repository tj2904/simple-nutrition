-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "apiId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "vitaminA" INTEGER NOT NULL,
    "VitaminB1" INTEGER NOT NULL,
    "vitaminB2" INTEGER NOT NULL,
    "vitaminB3" INTEGER NOT NULL,
    "viatminB5" INTEGER NOT NULL,
    "vitaminB6" INTEGER NOT NULL,
    "viatminB12" INTEGER NOT NULL,
    "vitaminC" INTEGER NOT NULL,
    "vitaminD" INTEGER NOT NULL,
    "vitaminE" INTEGER NOT NULL,
    "vitaminK" INTEGER NOT NULL,
    "Calcium" INTEGER NOT NULL,
    "Carbohydrates" INTEGER NOT NULL,
    "Cholestrol" INTEGER NOT NULL,
    "Choline" INTEGER NOT NULL,
    "Fiber" INTEGER NOT NULL,
    "FolicAcid" INTEGER NOT NULL,
    "Flouride" INTEGER NOT NULL,
    "Folate" INTEGER NOT NULL,
    "Fat" INTEGER NOT NULL,
    "SaturatedFat" INTEGER NOT NULL,
    "MonoUnsatFat" INTEGER NOT NULL,
    "PolyUnsatFat" INTEGER NOT NULL,
    "Iron" INTEGER NOT NULL,
    "Lycopene" INTEGER NOT NULL,
    "Maganese" INTEGER NOT NULL,
    "Magnesium" INTEGER NOT NULL,
    "Phosphorus" INTEGER NOT NULL,
    "Potassium" INTEGER NOT NULL,
    "Protein" INTEGER NOT NULL,
    "Selenium" INTEGER NOT NULL,
    "Sodium" INTEGER NOT NULL,
    "Sugar" INTEGER NOT NULL,
    "TransFat" INTEGER NOT NULL,
    "Zinc" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

