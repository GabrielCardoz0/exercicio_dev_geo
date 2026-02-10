import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../src/config/db";

dotenv.config();

export const createFakeUser = async () => {
  const password = faker.internet.password();

  const user = await prisma.users.create({
    data: {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: bcrypt.hashSync(password, 10),
    },
  });

  return {
    ...user,
    password,
    jwtToken: jwt.sign({ userId: user.id }, process.env.JWT_SECRET!),
  };
};

export const deleteFakeUser = async (id: number) => {
  return await prisma.users.delete({ where: { id } });
};