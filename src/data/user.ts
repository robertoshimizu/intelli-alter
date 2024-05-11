import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    return db.user.findFirst({
      where: { email }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    return db.user.findFirst({
      where: { id }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    return db.user.create({
      data: {
        email,
        password,
        name
      }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
