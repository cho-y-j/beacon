'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '../../lib/data/mockData';

export default function VisitorHome() {
  const [userData] = useState(mockVisitorData.user);
  const [exhibits] = useState(mockVisitorData.exhibits);
  const [nearbyRecommendations] = useState(mockVisitorData.nearbyRecommendations);
  const [currentLocation] = useState("조선시대 전시관");

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <div className="font-bold text-xl text-blue-600">박물관 로고</div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-4">
        {/* 인사말 및 추천 전시 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">안녕하세요, {userData.name}님!</h1>
          <p className="text-gray-600 mb-4">오늘의 맞춤 추천 전시</p>
          
          <div className="card mb-4">
            <div className="bg-gray-200 h-40 rounded-md mb-2 flex items-center justify-center">
              <span className="text-gray-500">[전시품 이미지]</span>
            </div>
            <h2 className="font-bold">{exhibits[0].name} - {exhibits[0].location}</h2>
            <p className="text-sm text-gray-600">당신의 관심사와 일치: {exhibits[0].matchedInterests.join(', ')}</p>
          </div>
        </div>

        {/* 현재 위치 및 주변 추천 */}
        <div className="mb-6">
          <p className="font-medium mb-2">현재 위치: {currentLocation}</p>
          <p className="flex items-center text-blue-600 font-medium mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            주변 추천 작품 ({nearbyRecommendations.length})
          </p>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {nearbyRecommendations.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-32">
                <div className="bg-gray-200 h-24 rounded-md mb-1 flex items-center justify-center">
                  <span className="text-gray-500">[작품 미리보기]</span>
                </div>
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.distance} 거리</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-4 p-2 text-center">
        <Link href="/visitor" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs mt-1">작품 검색</span>
        </Link>
        <Link href="/visitor/ai-docent" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-xs mt-1">AI 도슨트</span>
        </Link>
        <Link href="/visitor/route" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span className="text-xs mt-1">전시관 지도</span>
        </Link>
        <Link href="/visitor/stats" className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1">관람 통계</span>
        </Link>
      </div>
    </div>
  );
}
