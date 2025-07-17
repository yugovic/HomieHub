export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          家族の「あれどうだっけ？」をなくし、
          <br />
          みんなの「やりたい！」を応援する
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          HomieHubは、家族の情報を一元管理し、日々の生活をより豊かで効率的にする統合プラットフォームです
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            今すぐ始める
          </button>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
            詳しく見る
          </button>
        </div>
      </section>

      {/* 機能カード */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">スケジュール管理</h3>
          <p className="text-gray-600">
            家族全員の予定を一目で確認。Googleカレンダーとも連携可能で、大切な予定を見逃しません
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">ToDoカンバン</h3>
          <p className="text-gray-600">
            家族のタスクを視覚的に管理。誰が何をやるか一目瞭然で、協力して家事を進められます
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">成長記録</h3>
          <p className="text-gray-600">
            子どもの成長や家族の思い出を記録。写真やメモと共に、大切な瞬間を永遠に残せます
          </p>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">
          家族みんなで、より良い毎日を
        </h3>
        <p className="text-lg mb-8 opacity-90">
          今すぐHomieHubを始めて、家族のコミュニケーションを活性化しましょう
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          無料で始める
        </button>
      </section>
    </div>
  )
}