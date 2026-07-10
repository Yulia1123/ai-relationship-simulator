import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Heart, ArrowRight, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PixelButton } from '@/components/PixelButton';
import { PixelAvatar } from '@/components/PixelAvatar';
import { LoadingDots } from '@/components/LoadingDots';
import { ChoiceCard } from '@/components/ChoiceCard';
import { generateSoulmate } from '@/services/api';
import type { SoulmateMatch } from '@/types';

const typeMeta: Record<SoulmateMatch['type'], { label: string; color: string; icon: string; desc: string }> = {
  best: { label: '最佳适配型', color: 'bg-rose', icon: '🌙', desc: '长期幸福概率最高' },
  soul: { label: '灵魂共鸣型', color: 'bg-amber', icon: '✦', desc: '最懂你的人' },
  growth: { label: '成长挑战型', color: 'bg-moss', icon: '↗', desc: '让你成为更好的自己' },
};

function MatchCard({
  match,
  selected,
  onSelect,
}: {
  match: SoulmateMatch;
  selected: boolean;
  onSelect: () => void;
}) {
  const meta = typeMeta[match.type];
  const s = match.soulmate;

  return (
    <ChoiceCard selected={selected} onClick={onSelect} index={match.type === 'best' ? 0 : match.type === 'soul' ? 1 : 2}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${meta.color} bg-opacity-10 flex items-center justify-center text-2xl`}>
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-paper ${meta.color}`}>
              {meta.label}
            </span>
            <span className="text-dusk/60 text-xs">{meta.desc}</span>
          </div>
          <h3 className="font-display text-xl text-ink mb-1">
            {s.name} · {s.age}岁
          </h3>
          <p className="text-dusk text-sm mb-2 truncate">
            {s.occupation} · {s.city}
          </p>
          <p className="text-ink text-sm leading-relaxed mb-3">{match.reason}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {s.traits.slice(0, 3).map((trait) => (
              <span
                key={trait}
                className="px-2 py-0.5 bg-paper border border-ink/10 text-ink rounded-full text-xs"
              >
                {trait}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-moss/5 rounded-lg p-2">
              <span className="text-moss font-medium block mb-1">+ 契合点</span>
              <ul className="space-y-0.5 text-dusk">
                {match.pros.slice(0, 2).map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-rose/5 rounded-lg p-2">
              <span className="text-rose font-medium block mb-1">- 注意点</span>
              <ul className="space-y-0.5 text-dusk">
                {match.cons.slice(0, 2).map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ChoiceCard>
  );
}

function DetailView({ match, onBack, onStart }: { match: SoulmateMatch; onBack: () => void; onStart: () => void }) {
  const s = match.soulmate;
  const meta = typeMeta[match.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pixel-card p-6 md:p-10 overflow-hidden relative mb-6">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose via-amber to-moss" />

        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose/30 to-moss/30 rounded-2xl blur-xl -z-10 scale-110" />
            <div className="p-2 bg-paper border-2 border-ink/10 shadow-pixel rotate-[-2deg]">
              <PixelAvatar prompt={s.avatarPrompt} alt={s.name} size="lg" />
            </div>
            <p className="text-center text-dusk/60 text-xs mt-4 font-display tracking-wider">{s.name}</p>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="font-display text-4xl md:text-5xl text-ink">{s.name}</h2>
              <span className={`px-3 py-1 text-paper rounded-full text-sm font-medium ${meta.color}`}>
                {meta.label}
              </span>
            </div>
            <p className="text-dusk text-lg mb-2">
              {s.age} 岁 · {s.occupation} · {s.city}
            </p>
            <p className="text-ink font-medium mb-5">{match.reason}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {s.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 bg-paper border border-ink/10 text-ink rounded-full text-sm font-medium shadow-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Briefcase, label: '职业', value: s.occupation },
            { icon: MapPin, label: '城市', value: s.city },
            { icon: Heart, label: '依恋类型', value: s.attachment },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-paper border border-ink/10 rounded-xl p-4 text-center shadow-pixel-sm"
            >
              <Icon className="w-5 h-5 text-rose mx-auto mb-2" />
              <p className="text-xs text-dusk/60 mb-1">{label}</p>
              <p className="text-ink font-medium">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 mb-6">
          {[
            { title: '恋爱观', content: s.loveView, gradient: 'from-rose/5' },
            { title: '表达爱的方式', content: s.expression, gradient: 'from-moss/5' },
            { title: '人生目标', content: s.lifeGoal, gradient: 'from-amber/5' },
            { title: '最大的软肋', content: s.vulnerability, gradient: 'from-rose/5' },
            { title: '第一次见你的印象', content: s.firstImpression, gradient: 'from-amber/5' },
            { title: '未来容易摩擦的地方', content: s.conflictArea, gradient: 'from-moss/5' },
          ].map(({ title, content, gradient }) => (
            <div key={title} className={`bg-gradient-to-r ${gradient} to-transparent rounded-xl p-5 border-l-4 border-ink/10`}>
              <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
              <p className="text-dusk leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-paper rounded-xl p-5 border border-ink/10 shadow-pixel-sm">
            <h3 className="font-display text-lg text-ink mb-3">优点</h3>
            <ul className="space-y-3">
              {s.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-dusk">
                  <span className="text-moss mt-1">◆</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-paper rounded-xl p-5 border border-ink/10 shadow-pixel-sm">
            <h3 className="font-display text-lg text-ink mb-3">缺点</h3>
            <ul className="space-y-3">
              {s.weaknesses.map((s) => (
                <li key={s} className="flex items-start gap-2 text-dusk">
                  <span className="text-rose mt-1">◇</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-paper rounded-xl p-5 border border-ink/10">
          <h3 className="font-display text-lg text-ink mb-3">日常生活</h3>
          <div className="flex flex-wrap gap-2">
            {s.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-3 py-1.5 bg-mist/60 text-ink rounded-full text-sm border border-ink/5"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <PixelButton variant="secondary" onClick={onBack}>
          返回选择
        </PixelButton>
        <PixelButton onClick={onStart}>
          选择 ta，开始人生 <ArrowRight className="w-4 h-4 ml-2" />
        </PixelButton>
      </div>
    </motion.div>
  );
}

export default function Soulmate() {
  const navigate = useNavigate();
  const { loveDna, soulmateMatches, setSoulmateMatches, selectedMatch, selectMatch } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewDetail, setViewDetail] = useState<SoulmateMatch | null>(null);

  useEffect(() => {
    if (!loveDna) {
      navigate('/dna');
      return;
    }
    if (soulmateMatches) {
      setLoading(false);
      return;
    }

    generateSoulmate(loveDna)
      .then((res) => {
        setSoulmateMatches(res.matches);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || '生成失败，请重试');
        setLoading(false);
      });
  }, [loveDna, soulmateMatches, setSoulmateMatches, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <LoadingDots text="正在编织即将走进你人生的三种可能" />
      </div>
    );
  }

  if (error || !soulmateMatches) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-rose mb-4">{error || '生成失败'}</p>
        <PixelButton onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" /> 重试
        </PixelButton>
      </div>
    );
  }

  if (viewDetail) {
    return (
      <div className="min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <DetailView
            match={viewDetail}
            onBack={() => setViewDetail(null)}
            onStart={() => {
              selectMatch(viewDetail);
              navigate('/story');
            }}
          />
        </div>
      </div>
    );
  }

  const canStart = selectedMatch !== null;

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-dusk/70 mb-2">命运为你准备了三种相遇的可能</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink">你的正缘方向</h1>
        </motion.div>

        <div className="space-y-4 mb-8">
          {soulmateMatches.map((match, idx) => (
            <motion.div
              key={match.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <MatchCard
                match={match}
                selected={selectedMatch?.type === match.type}
                onSelect={() => {
                  selectMatch(match);
                  setViewDetail(match);
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <PixelButton
            onClick={() => selectedMatch && navigate('/story')}
            disabled={!canStart}
            className="w-full max-w-xs"
          >
            开始这段人生 <ArrowRight className="w-4 h-4 ml-2" />
          </PixelButton>
          {!canStart && (
            <p className="mt-3 text-dusk/50 text-sm">请先选择一位正缘对象</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
