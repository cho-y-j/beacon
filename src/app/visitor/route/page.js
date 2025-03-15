'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '../../../lib/data/mockData';

export default function VisitorRoute() {
  const [routeData] = useState(mockVisitorData.recommendedRoute);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* 상단 네비게이션 */}
      <div className="bg-white p-4 flex items-center border-b sticky top-0 z-10">
        <Link href="/visitor" className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center">맞춤 관람 경로</h1>
      </div>

      {/* 관람 경로 정보 */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-1">당신을 위한 최적 관람 경로</h2>
          <p className="text-gray-600">(예상 소요시간: {routeData.totalTime})</p>
        </div>

        {/* 박물관 도면 지도 */}
        <div className="card mb-6">
          <div className="bg-gray-200 h-64 rounded-md mb-3 flex flex-col items-center justify-center">
            <span className="text-gray-500 mb-2">[박물관 도면 지도]</span>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 현재위치</li>
              <li>• 추천경로 하이라이트</li>
              <li>• 주요 전시품 표시</li>
            </ul>
          </div>
        </div>

        {/* 추천 순서 */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">추천 순서:</h3>
          <ul className="space-y-3">
            {routeData.route.map((item, index) => (
              <li 
                key={index} 
                className={`p-3 rounded-md border ${
                  item.status === '현재' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.name} ({item.floor})</p>
                    {item.status === '현재' && (
                      <span className="text-xs text-blue-600 font-medium">현재 위치</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 기능 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <button className="btn-outline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            경로 재설정
          </button>
          <button className="btn-outline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            시간 조정
          </button>
          <button className="btn-outline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            단체 모드
          </button>
          <button className="btn-outline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            편의시설
          </button>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-4 p-2 text-center">
        <Link href="/visitor" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">홈</span>
        </Link>
        <Link href="/visitor/ai-docent" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-xs mt-1">AI 도슨트</span>
        </Link>
        <Link href="/visitor/route" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span className="text-xs mt-1 text-blue-600 font-medium">전시관 지도</span>
        </Link>
        <Link href="/visitor/stats" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1">관람 통계</span>
        </Link>
      </div>
    </div>
  );
}
