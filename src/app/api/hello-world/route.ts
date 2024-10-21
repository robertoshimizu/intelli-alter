import { NextRequest, NextResponse } from 'next/server'
/**
 * @swagger
 *  paths:
 *    /api/hello-world:
 *      get:
 *        description: Returns hello world
 *        parameters: none
 *        responses:
 *          200:
 *            description: Success
 *          400:
 *            description: Bad request
 *          500:
 *            description: Internal Server Error
 */

export async function GET() {
  try {
    console.log('Hello, world!')
    return NextResponse.json(
      { message: 'Hello world capial!' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
