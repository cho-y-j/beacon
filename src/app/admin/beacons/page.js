'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockAdminData } from '../../../lib/data/mockData';

export default function BeaconLayout() {
  const [beaconData] = useState(mockAdminData.beacons);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen p-4 pb-20">
      {/* 상단 헤더 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">박물관 비콘 배치도 - {beaconData.floor}</h1>
        <div className="flex items-center space-x-2">
          <button className="btn-outline py-1 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            층 선택
          </button>
          <button className="btn-outline py-1 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            확대
          </button>
        </div>
      </div>

      {/* 비콘 배치도 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="border border-gray-300 rounded-lg p-6 mb-4">
          <div className="flex justify-center items-center mb-8">
            <div className="relative w-full max-w-2xl">
              {/* 박물관 도면 */}
              <div className="border-2 border-gray-400 rounded-lg p-4 h-96">
                {/* 입구 홀 */}
                <div className="text-center mb-8">
                  <div className={`inline-block w-6 h-6 rounded-full ${beaconData.lowBatteryLocations.includes('입구 홀') ? 'bg-yellow-400' : 'bg-blue-500'} mb-1`}></div>
                  <div>입구 홀</div>
                </div>
                
                {/* 전시실 A, B */}
                <div className="flex justify-between mb-8">
                  <div className="w-1/3 border border-gray-400 p-2 text-center h-32 flex flex-col justify-between">
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mb-1`}></div>
                    <div>전시실 A</div>
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mt-1`}></div>
                  </div>
                  <div className="w-1/3 border border-gray-400 p-2 text-center h-32 flex flex-col justify-between">
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mb-1`}></div>
                    <div>전시실 B</div>
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mt-1`}></div>
                  </div>
                </div>
                
                {/* 전시실 C, D */}
                <div className="flex justify-between mb-8">
                  <div className="w-1/3 border border-gray-400 p-2 text-center h-32 flex flex-col justify-between">
                    <div className={`self-center w-6 h-6 rounded-full ${beaconData.lowBatteryLocations.includes('전시실 C') ? 'bg-yellow-400' : 'bg-blue-500'} mb-1`}></div>
                    <div>전시실 C</div>
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mt-1`}></div>
                  </div>
                  <div className="w-1/3 border border-gray-400 p-2 text-center h-32 flex flex-col justify-between">
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mb-1`}></div>
                    <div>전시실 D</div>
                    <div className={`self-center w-6 h-6 rounded-full bg-blue-500 mt-1`}></div>
                  </div>
                </div>
                
                {/* 로비 */}
                <div className="text-center">
                  <div className={`inline-block w-6 h-6 rounded-full bg-blue-500 mb-1 mx-2`}></div>
                  <span>로비</span>
                  <div className={`inline-block w-6 h-6 rounded-full bg-blue-500 mb-1 mx-2`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 범례 */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">범례:</h3>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>비콘 위치 (총 {beaconData.total}개)</span>
          </div>
          <div className="flex items-center">
            <span className="border-b border-dashed border-gray-400 w-6 mr-2"></span>
            <span>비콘 신호 범위 (반경 10m)</span>
          </div>
        </div>
        
        {/* 비콘 상태 */}
        <div>
          <h3 className="font-bold mb-2">비콘 상태:</h3>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>정상 작동: {beaconData.status.normal}개</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>배터리 부족: {beaconData.status.lowBattery}개 ({beaconData.lowBatteryLocations.join(', ')})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>오프라인: {beaconData.status.offline}개</span>
            </div>
          </div>
        </div>
      </div>

      {/* 비콘 관리 버튼 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className="btn-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          비콘 설정 관리
        </button>
        <button className="btn-outline flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          배터리 상태 확인
        </button>
      </div>

      {/* 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around">
        <Link href="/admin" className="flex flex-col items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs">대시보드</span>
        </Link>
        <Link href="/admin/segments" className="flex flex-col items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">세그먼트</span>
        </Link>
        <Link href="/admin/beacons" className="flex flex-col items-center text-blue-600">
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
