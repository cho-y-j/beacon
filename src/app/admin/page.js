'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockAdminData } from '../../../lib/data/mockData';

export default function AdminDashboard() {
  const [dashboardData] = useState(mockAdminData.dashboard);
  const [popularExhibits] = useState(mockAdminData.popularExhibits);
  const [aiPredictions] = useState(mockAdminData.aiPredictions);
  const [heatmapData] = useState(mockAdminData.heatmapData);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen p-4">
      {/* 상단 헤더 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI 비콘 관리 시스템 - 대시보드</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{dashboardData.date}</span>
          <span className="text-gray-600">{dashboardData.adminName}</span>
        </div>
      </div>

      {/* 상단 위젯 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* 실시간 방문객 현황 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">실시간 방문객 현황</h2>
          <div className="flex justify-between mb-2">
            <span>현재:</span>
            <span className="font-bold">{dashboardData.realTimeVisitors.current}명</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>최대 수용:</span>
            <span>{dashboardData.realTimeVisitors.capacity}명</span>
          </div>
          <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-500">[실시간 그래프]</span>
          </div>
        </div>

        {/* 오늘의 주요 지표 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">오늘의 주요 지표</h2>
          <div className="flex justify-between mb-2">
            <span>총 방문객:</span>
            <span className="font-bold">{dashboardData.dailyMetrics.totalVisitors}명</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>평균 체류:</span>
            <span>{dashboardData.dailyMetrics.averageStay}분</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>재방문율:</span>
            <span>{dashboardData.dailyMetrics.returnRate}%</span>
          </div>
        </div>

        {/* 알림 센터 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">알림 센터</h2>
          <div className="flex justify-between mb-2">
            <span>혼잡구역:</span>
            <span className="text-red-500 font-bold">{dashboardData.alerts.crowdedAreas}곳</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>배터리 부족:</span>
            <span className="text-yellow-500 font-bold">{dashboardData.alerts.lowBattery}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>시스템 알림:</span>
            <span className="text-blue-500 font-bold">{dashboardData.alerts.systemAlerts}</span>
          </div>
        </div>
      </div>

      {/* 방문객 히트맵 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="font-bold mb-4">방문객 히트맵</h2>
        <div className="h-64 bg-gray-100 rounded-md flex flex-col items-center justify-center mb-4">
          <span className="text-gray-500 mb-2">[박물관 도면에 방문객 밀집도를 색상으로 표시]</span>
          <div className="grid grid-cols-3 gap-4 w-full max-w-md p-4">
            {heatmapData.map((area, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-md text-center text-sm ${
                  area.status === '혼잡' 
                    ? 'bg-red-100 border border-red-300' 
                    : area.status === '보통' 
                      ? 'bg-yellow-100 border border-yellow-300' 
                      : 'bg-green-100 border border-green-300'
                }`}
              >
                {area.area}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded-full mr-2"></div>
            <span className="text-sm">혼잡 구역</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
            <span className="text-sm">보통 구역</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm">여유 구역</span>
          </div>
        </div>
      </div>

      {/* 하단 위젯 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 인기 전시품 TOP 5 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">인기 전시품 TOP 5</h2>
          <ul className="space-y-2">
            {popularExhibits.map((exhibit, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </span>
                  <span>{exhibit.name}</span>
                </div>
                <span className="text-gray-600">({exhibit.viewTime}분)</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI 예측 분석 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-3">AI 예측 분석</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-700">- 내일 예상 방문객:</span>
              <span className="ml-2 font-medium">{aiPredictions.tomorrowVisitors.count}명</span>
              <span className="ml-1 text-green-600">(↑{aiPredictions.tomorrowVisitors.change}%)</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">- 주말 혼잡 예상 시간:</span>
              <span className="ml-2 font-medium">{aiPredictions.peakHours}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">- 추천 직원 배치:</span>
              <div className="ml-2">
                {aiPredictions.staffingRecommendations.map((rec, index) => (
                  <span key={index} className="font-medium mr-2">
                    {rec.floor} {rec.change > 0 ? `+${rec.change}명` : `${rec.change}명`}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">- 인기 상승 전시:</span>
              <span className="ml-2 font-medium">{aiPredictions.trendingExhibit}</span>
            </div>
            <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center mt-2">
              <span className="text-gray-500">[예측 그래프 및 추세선]</span>
            </div>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around">
        <Link href="/admin" className="flex flex-col items-center text-blue-600">
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
