import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PixelButton } from '@/components/PixelButton';
import { ChoiceCard } from '@/components/ChoiceCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Typewriter } from '@/components/Typewriter';
import { LoadingDots } from '@/components/LoadingDots';
import { generateEvent } from '@/services/api';
import type { StoryEvent } from '@/types';

const TOTAL_EVENTS = 8;
const STAGES: { key: StoryEvent['stage']; label: string; emoji: string }[] = [
  { key: 'meet', label: '相遇', emoji: '✦' },
  { key: 'crush', label: '心动', emoji: '♥' },
  { key: 'ambiguous', label: '暧昧', emoji: '◈' },
  { key: 'relationship', label: '相恋', emoji: '✧' },
  { key: 'life', label: '人生', emoji: '◉' },
];

export default function Story() {
  const navigate = useNavigate();
  const { loveDna, selectedMatch, relationshipState, history, addEvent } = useAppStore();
  const soulmate = selectedMatch?.soulmate;
  const [currentEvent, setCurrentEvent] = useState<StoryEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!loveDna || !soulmate) {
      navigate('/');
      return;
    }
    if (history.length >= TOTAL_EVENTS) {
      navigate('/ending');
      return;
    }
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length]);

  const fetchEvent = async () => {
    setLoading(true);
    setSelected(null);
    setTypingDone(false);
    try {
      const res = await generateEvent({
        eventIndex: history.length,
        totalEvents: TOTAL_EVENTS,
        loveDna,
        soulmate,
        relationshipState,
        history,
      });
      setCurrentEvent(res.event);
      setLoading(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '生成失败';
      setError(message);
      setLoading(false);
    }
  };

  const handleSelect = (index: number) => {
    if (!currentEvent) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null || !currentEvent) return;
    addEvent(currentEvent, selected);
    if (history.length + 1 >= TOTAL_EVENTS) {
      navigate('/ending');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <LoadingDots text="故事正在展开" />
        <p className="mt-4 text-dusk/60 text-sm flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          正在根据你的选择续写下一章
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-rose mb-4">{error}</p>
        <PixelButton onClick={fetchEvent}>重新生成</PixelButton>
      </div>
    );
  }

  if (!currentEvent) return null;

  const currentStageIndex = STAGES.findIndex((s) => s.key === currentEvent.stage);
  const illustrationUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    currentEvent.illustrationPrompt
  )}&image_size=landscape_4_3`;

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 bg-rose/10 text-rose rounded-full text-sm font-display border border-rose/10 flex items-center gap-2">
              <span>{STAGES[currentStageIndex]?.emoji}</span>
              {STAGES[currentStageIndex]?.label || currentEvent.stage}
            </span>
            <span className="text-dusk/70 text-sm font-display">
              {history.length + 1} / {TOTAL_EVENTS}
            </span>
          </div>
          <ProgressBar current={history.length + 1} total={TOTAL_EVENTS} className="mb-4" />

          <div className="flex items-center justify-between text-xs px-1">
            {STAGES.map((stage, index) => (
              <div key={stage.key} className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors duration-300 ${
                    index <= currentStageIndex
                      ? 'bg-rose text-paper shadow-sm'
                      : 'bg-mist text-dusk/50'
                  }`}
                >
                  {stage.emoji}
                </div>
                <span
                  className={`text-[10px] tracking-wide ${
                    index <= currentStageIndex ? 'text-rose font-medium' : 'text-dusk/40'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.scene}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pixel-card overflow-hidden mb-6">
              <div className="h-44 md:h-60 relative overflow-hidden border-b-2 border-ink/5">
                <img
                  src={illustrationUrl}
                  alt={currentEvent.scene}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-1.5 w-12 bg-gradient-to-r from-rose to-amber rounded-full mb-3" />
                  <h2 className="font-display text-2xl md:text-3xl text-ink drop-shadow-sm">
                    {currentEvent.scene}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="text-dusk text-lg leading-relaxed mb-8 min-h-[4rem]">
                  <Typewriter
                    text={currentEvent.story}
                    speed={30}
                    onComplete={() => setTypingDone(true)}
                  />
                </div>

                <div className="space-y-3">
                  {currentEvent.choices.map((choice, index) => (
                    <ChoiceCard
                      key={index}
                      index={index}
                      selected={selected === index}
                      onClick={() => typingDone && handleSelect(index)}
                      className={!typingDone ? 'opacity-60 pointer-events-none' : ''}
                    >
                      <span className="text-ink font-medium">{choice.text}</span>
                    </ChoiceCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end">
          <PixelButton onClick={handleConfirm} disabled={selected === null}>
            继续 <ArrowRight className="w-4 h-4 ml-2" />
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
