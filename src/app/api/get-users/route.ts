import { NextRequest, NextResponse } from 'next/server'
/**
 * @swagger
 *  paths:
 *    /api/get-users:
 *      get:
 *        description: Returns the hello world message
 *        parameters:
 *          - name: query
 *            in: query
 *            required: true
 *            type: string
 *        responses:
 *          200:
 *            description: Hello, world!
 *          400:
 *            description: Bad request
 *          500:
 *            description: Internal Server Error
 */

export async function GET(req: NextRequest) {
  try {
    console.log(req.nextUrl.searchParams)
    console.log('Hello, world!')
    return NextResponse.json(
      { message: 'Hello world malandro!' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
