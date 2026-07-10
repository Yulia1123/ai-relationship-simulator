import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, RefreshCw, Sparkles, Crown, Ticket } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PixelButton } from '@/components/PixelButton';
import { LoadingDots } from '@/components/LoadingDots';
import { generateEnding } from '@/services/api';

const rarityConfig = {
  common: {
    label: '普通',
    color: 'bg-stone-200 text-stone-700',
    border: 'border-stone-200',
    gradient: 'from-stone-100',
  },
  rare: {
    label: '稀有',
    color: 'bg-moss/20 text-moss',
    border: 'border-moss/30',
    gradient: 'from-moss/10',
  },
  epic: {
    label: '史诗',
    color: 'bg-rose/20 text-rose',
    border: 'border-rose/30',
    gradient: 'from-rose/10',
  },
  legendary: {
    label: '传说',
    color: 'bg-amber/20 text-amber',
    border: 'border-amber/30',
    gradient: 'from-amber/10',
  },
};

export default function Ending() {
  const navigate = useNavigate();
  const { loveDna, selectedMatch, relationshipState, history, ending, setEnding } = useAppStore();
  const soulmate = selectedMatch?.soulmate;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loveDna || !soulmate || history.length === 0) {
      navigate('/');
      return;
    }
    if (ending) {
      setLoading(false);
      return;
    }

    generateEnding({ loveDna, soulmate, history, finalState: relationshipState })
      .then((res) => {
        setEnding(res.ending);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || '结局生成失败');
        setLoading(false);
      });
  }, [loveDna, soulmate, history, relationshipState, ending, setEnding, navigate]);

  const handleShare = () => {
    alert('长按截图即可分享到社交平台');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <LoadingDots text="正在为这段感情写下结局" />
      </div>
    );
  }

  if (error || !ending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-rose mb-4">{error || '生成失败'}</p>
        <PixelButton onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" /> 重试
        </PixelButton>
      </div>
    );
  }

  const rarity = rarityConfig[ending.rarity];
  const illustrationUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    ending.illustrationPrompt
  )}&image_size=landscape_16_9`;

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="pixel-card overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose via-amber to-moss z-10" />

          <div className="h-60 md:h-80 relative overflow-hidden">
            <img
              src={illustrationUrl}
              alt={ending.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />

            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm flex items-center gap-1 ${rarity.color} ${rarity.border}`}
              >
                <Crown className="w-3 h-3" />
                {rarity.label}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-dusk/70 text-sm mb-2 tracking-widest flex items-center justify-center gap-2"
              >
                <Ticket className="w-3.5 h-3.5" />
                恋爱图鉴 · {ending.number}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-4xl md:text-5xl text-ink"
              >
                《{ending.title}》
              </motion.h1>
            </div>
          </div>

          <div className="p-6 md:p-10 text-center relative">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-rose/5 to-moss/5 rounded-full blur-3xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose/10 to-amber/10 rounded-full border border-rose/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-rose" />
              <span className="text-rose font-display text-lg">{ending.achievement}</span>
            </motion.div>

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent mx-auto mb-8" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-dusk leading-loose text-lg whitespace-pre-line mb-10 px-2 relative"
            >
              {ending.prose}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <PixelButton onClick={handleShare}>
                <Download className="w-4 h-4 mr-2" /> 保存分享图
              </PixelButton>
              <PixelButton variant="secondary" onClick={() => navigate('/replay')}>
                人生回顾 <ArrowRight className="w-4 h-4 ml-2" />
              </PixelButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
