'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '../../../lib/data/mockData';

export default function AiDocent() {
  const [conversation, setConversation] = useState(mockVisitorData.aiConversation);
  const [currentExhibit] = useState(mockVisitorData.exhibits[1]); // 청자 상감 운학문 매병
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    const newConversation = [
      ...conversation,
      { role: 'user', content: userInput }
    ];
    
    setConversation(newConversation);
    setUserInput('');
    
    // 실제 구현에서는 AI 응답을 받아오는 로직이 필요하지만, 
    // 프로토타입에서는 미리 준비된 응답을 사용
    setTimeout(() => {
      setConversation([
        ...newConversation,
        { 
          role: 'assistant', 
          content: '이 작품에 대한 추가 정보입니다. 고려시대 상감청자는 귀족 문화의 정수를 보여주며, 당시 미학적 취향과 기술적 성취를 반영합니다. 이 매병은 보존 상태가 매우 뛰어나며, 유사한 작품들이 국립중앙박물관에도 전시되어 있습니다.' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* 상단 네비게이션 */}
      <div className="bg-white p-4 flex items-center border-b sticky top-0 z-10">
        <Link href="/visitor" className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center">AI 도슨트</h1>
      </div>

      {/* 현재 감상 중인 작품 */}
      <div className="p-4 border-b bg-white">
        <div className="bg-gray-200 h-48 rounded-md mb-3 flex items-center justify-center">
          <span className="text-gray-500">[현재 감상 중인 작품 이미지]</span>
        </div>
        <h2 className="text-lg font-bold">{currentExhibit.name}</h2>
        <p className="text-sm text-gray-600">{currentExhibit.location}</p>
      </div>

      {/* 대화 내용 */}
      <div className="p-4 space-y-4 mb-20">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-12' 
                : 'bg-white border border-gray-200 mr-12 shadow-sm'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            className="input-field flex-1 mr-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className="btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* 기능 버튼 */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          <button className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-xs mt-1">질문하기</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">유사작품</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs mt-1">더 깊은 설명</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-xs mt-1">저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
