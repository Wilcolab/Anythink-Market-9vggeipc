import React, { useState } from 'react'

const SocialShare = ({ results, quizTitle = "90s Fun Quiz" }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { score, total, percentage } = results

  // Generate share text
  const shareText = `I just scored ${score}/${total} (${percentage}%) on the ${quizTitle}! 🎉 Test your knowledge of awesome events from 1990-2000!`
  const shareUrl = window.location.origin

  // Social media share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(quizTitle)}&summary=${encodeURIComponent(shareText)}`
  }

  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    setShowShareMenu(false)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quizTitle,
          text: shareText,
          url: shareUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        alert('Share text copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy to clipboard:', err)
      }
    }
    setShowShareMenu(false)
  }

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
      >
        📤 Share Results
        <svg 
          className={`w-4 h-4 transition-transform ${showShareMenu ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Share Menu */}
      {showShareMenu && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-10">
          <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
            Share your score
          </div>
          
          {/* Facebook */}
          <button
            onClick={() => handleShare('facebook')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span className="text-gray-700">Facebook</span>
          </button>

          {/* Twitter */}
          <button
            onClick={() => handleShare('twitter')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
            <span className="text-gray-700">Twitter</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare('linkedin')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">in</span>
            </div>
            <span className="text-gray-700">LinkedIn</span>
          </button>

          {/* Native Share / Copy */}
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-700">{navigator.share ? 'More options' : 'Copy link'}</span>
          </button>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}

export default SocialShare
