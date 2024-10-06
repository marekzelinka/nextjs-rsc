import { faker } from "@faker-js/faker";
import { prisma } from "../src/lib/prisma";

faker.seed(123);

async function main() {
  for (let i = 0; i < 1000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
      },
    });
  }
}

main();
