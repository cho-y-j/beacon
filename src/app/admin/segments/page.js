'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockAdminData } from '../../../lib/data/mockData';

export default function VisitorSegments() {
  const [segmentData] = useState(mockAdminData.visitorSegments);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen p-4 pb-20">
      {/* 상단 헤더 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">방문객 세그먼트 분석</h1>
        <div className="flex items-center space-x-2">
          <button className="btn-outline py-1 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            필터
          </button>
          <button className="btn-outline py-1 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            내보내기
          </button>
        </div>
      </div>

      {/* 상단 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 방문객 유형 분포 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">방문객 유형 분포</h2>
          <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
            <span className="text-gray-500">[원형 차트]</span>
          </div>
          <ul className="space-y-2">
            {segmentData.distribution.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>- {item.type}:</span>
                <span className="font-bold">{item.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 세그먼트별 체류 시간 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">세그먼트별 체류 시간</h2>
          <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
            <span className="text-gray-500">[막대 그래프]</span>
          </div>
          <ul className="space-y-2">
            {segmentData.stayDuration.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>- {item.type}:</span>
                <span className="font-bold">평균 {item.minutes}분</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 세그먼트별 관심 전시 카테고리 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="font-bold mb-3">세그먼트별 관심 전시 카테고리</h2>
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
          <span className="text-gray-500">[히트맵 - 세그먼트와 전시 카테고리 교차 분석]</span>
        </div>
        <div className="space-y-3">
          {segmentData.interestCategories.map((segment, index) => (
            <div key={index}>
              <p className="font-medium">{segment.type}:</p>
              <p className="ml-4">
                {segment.interests.map((interest, i) => (
                  <span key={i} className="mr-2">
                    {interest.category}
                    <span className="text-yellow-500">
                      {Array(interest.level).fill('★').join('')}
                    </span>
                    {i < segment.interests.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 재방문율 분석 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">재방문율 분석</h2>
          <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-3">
            <span className="text-gray-500">[선 그래프 - 시간에 따른 변화]</span>
          </div>
          <ul className="space-y-2">
            {segmentData.returnRate.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>- {item.type}:</span>
                <div>
                  <span className="font-bold">{item.rate}%</span>
                  <span className={`ml-1 ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({item.change > 0 ? '↑' : '↓'}{Math.abs(item.change)}%)
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* AI 추천 전략 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">AI 추천 전략</h2>
          <ul className="space-y-3">
            {segmentData.recommendations.map((item, index) => (
              <li key={index} className="flex">
                <span className="font-medium mr-2">{item.type}:</span>
                <span>{item.strategy}</span>
              </li>
            ))}
          </ul>
          <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mt-3">
            <span className="text-gray-500">[세그먼트별 맞춤 전략 제안]</span>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around">
        <Link href="/admin" className="flex flex-col items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs">대시보드</span>
        </Link>
        <Link href="/admin/segments" className="flex flex-col items-center text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">세그먼트</span>
        </Link>
        <Link href="/admin/beacons" className="flex flex-col items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs">비콘</span>
        </Link>
        <Link href="/" className="flex flex-col items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs">설정</span>
        </Link>
      </div>
    </div>
  );
}
