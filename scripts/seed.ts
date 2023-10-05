
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Software Engineering" },
                { name: "Photography" },
                { name: "Filming" },
                { name: "Animation & 3D Animation" },
                { name: "Content Creator" },
                { name: "Business Administration" },
                { name: "Editing" },
            ]
        });
        console.log("Seeding complete");
    } catch (error) {
        console.error(error, "Error seeding database");
    } finally {
        await database.$disconnect();
    }
}

main();