import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareResultsProps {
  results: {
    score: number;
    totalQuestions: number;
    recommendations: string[];
  };
}

const ShareResults: React.FC<ShareResultsProps> = ({ results }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `I scored ${results.score}/${results.totalQuestions} on the Music Quiz! Check out my recommended playlist: ${results.recommendations.join(', ')}`;

  const handleShare = async () => {
    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Music Quiz Results',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : navigator.share && typeof navigator.share === 'function' ? (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share Results</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy Results</span>
        </>
      )}
    </motion.button>
  );
};

export default ShareResults;
