'use server'
// import { getCloudflareContext } from '@opennextjs/cloudflare'
// import { headers } from 'next/headers'

// 목업 데이터로 대체
export async function incrementAndLog() {
  // 실제 데이터베이스 접근 대신 목업 데이터 반환
  return {
    count: Math.floor(Math.random() * 1000) + 1,
    recentAccess: [
      { accessed_at: new Date().toISOString() },
      { accessed_at: new Date(Date.now() - 60000).toISOString() },
      { accessed_at: new Date(Date.now() - 120000).toISOString() },
      { accessed_at: new Date(Date.now() - 180000).toISOString() },
      { accessed_at: new Date(Date.now() - 240000).toISOString() }
    ]
  } as { count: number; recentAccess: { accessed_at: string }[] }
}

// 목업 데이터로 대체
export async function getStats() {
  // 실제 데이터베이스 접근 대신 목업 데이터 반환
  return {
    count: Math.floor(Math.random() * 1000) + 1,
    recentAccess: [
      { accessed_at: new Date().toISOString() },
      { accessed_at: new Date(Date.now() - 60000).toISOString() },
      { accessed_at: new Date(Date.now() - 120000).toISOString() },
      { accessed_at: new Date(Date.now() - 180000).toISOString() },
      { accessed_at: new Date(Date.now() - 240000).toISOString() }
    ]
  } as { count: number; recentAccess: { accessed_at: string }[] }
}
