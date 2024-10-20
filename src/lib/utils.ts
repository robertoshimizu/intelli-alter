import { type ClassValue, clsx } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatDateLocale(dateString: string, locale: any) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32bit integer
  }
  hash = Math.abs(hash)
  return hash.toString()
}

export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = 'test'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

function checkAndRetrieve(key: string) {
  if (typeof window !== 'undefined' && isLocalStorageAvailable()) {
    return localStorage.getItem(key)
  }
  return null // Or a default value
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export function format(date: Date, formatString: string) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  return formatString
    .replace('yyyy', year.toString())
    .replace('yy', String(year).slice(-2))
    .replace('LLL', monthNames[month])
    .replace('MM', String(month + 1).padStart(2, '0'))
    .replace('dd', String(day).padStart(2, '0'))
    .replace('d', day.toString())
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export function parseISO(dateString: string) {
  return new Date(dateString)
}

export function subMonths(date: Date, amount: number) {
  const newDate: Date = new Date(date)
  newDate.setMonth(newDate.getMonth() - amount)
  return newDate
}
