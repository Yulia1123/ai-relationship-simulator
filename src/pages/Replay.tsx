import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, Clock, Star } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PixelButton } from '@/components/PixelButton';
import { LoadingDots } from '@/components/LoadingDots';
import { generateReplay } from '@/services/api';

export default function Replay() {
  const navigate = useNavigate();
  const { loveDna, selectedMatch, relationshipState, history, ending, replay, setReplay, reset } =
    useAppStore();
  const soulmate = selectedMatch?.soulmate;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loveDna || !soulmate || !ending) {
      navigate('/');
      return;
    }
    if (replay) {
      setLoading(false);
      return;
    }

    generateReplay({ loveDna, soulmate, history, finalState: relationshipState, ending })
      .then((res) => {
        setReplay(res.replay);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || '回顾生成失败');
        setLoading(false);
      });
  }, [loveDna, soulmate, history, relationshipState, ending, replay, setReplay, navigate]);

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <LoadingDots text="正在回放这段人生" />
      </div>
    );
  }

  if (error || !replay) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-rose mb-4">{error || '生成失败'}</p>
        <PixelButton onClick={() => window.location.reload()}>重试</PixelButton>
      </div>
    );
  }

  const moments = [
    { title: '第一次心动', content: replay.firstCrush, icon: Heart, color: 'text-rose', bg: 'bg-rose/10' },
    { title: '最大的转折', content: replay.biggestTurningPoint, icon: Clock, color: 'text-amber', bg: 'bg-amber/10' },
    { title: '最幸福的一刻', content: replay.happiestMoment, icon: Star, color: 'text-moss', bg: 'bg-moss/10' },
    { title: '最大的遗憾', content: replay.biggestRegret, icon: Heart, color: 'text-dusk', bg: 'bg-dusk/10' },
    { title: '最影响关系的一次选择', content: replay.mostInfluentialChoice, icon: Clock, color: 'text-rose', bg: 'bg-rose/10' },
    { title: '如果重新开始', content: replay.ifRestart, icon: Star, color: 'text-amber', bg: 'bg-amber/10' },
  ];

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 text-rose mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="font-display tracking-widest">REPLAY</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink">人生回顾</h1>
          <p className="text-dusk/70 mt-2 text-sm">像翻看一本旧相册，重新走过这段故事</p>
        </motion.div>

        <div className="relative space-y-6 mb-10 pl-6">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-rose/30 via-amber/30 to-moss/30" />
          {moments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pixel-card p-5 md:p-6 hover:shadow-pixel transition-shadow duration-300"
            >
              <div
                className={`absolute -left-[22px] top-5 w-7 h-7 rounded-full ${moment.bg} border-2 border-paper flex items-center justify-center`}
              >
                <moment.icon className={`w-3.5 h-3.5 ${moment.color}`} />
              </div>
              <h3 className={`font-display text-lg mb-2 flex items-center gap-2 ${moment.color}`}>
                {moment.title}
              </h3>
              <p className="text-dusk leading-relaxed">{moment.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pixel-card p-6 md:p-8 bg-gradient-to-br from-rose/5 via-paper to-moss/5 border-rose/20 mb-10 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose/5 rounded-full blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-moss/5 rounded-full blur-2xl" />

          <h2 className="font-display text-2xl text-ink mb-5 flex items-center gap-2 relative">
            <Heart className="w-5 h-5 text-rose" />
            给你的三条成长建议
          </h2>
          <ol className="space-y-4 relative">
            {replay.advice.map((advice, index) => (
              <li key={index} className="flex gap-3 text-dusk leading-relaxed">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose text-paper text-sm flex items-center justify-center font-display shadow-sm">
                  {index + 1}
                </span>
                <span className="pt-0.5">{advice}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <PixelButton onClick={handleRestart}>
            <RotateCcw className="w-4 h-4 mr-2" /> 再经历一次
          </PixelButton>
        </motion.div>
      </div>
    </div>
  );
}
