'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">박물관 AI 비콘 시스템</h1>
      
      <div className="w-full space-y-4">
        <Link href="/visitor" className="btn-primary w-full flex justify-center py-3">
          방문객 앱 프로토타입
        </Link>
        
        <Link href="/admin" className="btn-secondary w-full flex justify-center py-3">
          관리자 대시보드 프로토타입
        </Link>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>프로토타입 버전 0.1.0</p>
        <p>© 2025 박물관 AI 비콘 시스템</p>
      </div>
    </div>
  );
}
