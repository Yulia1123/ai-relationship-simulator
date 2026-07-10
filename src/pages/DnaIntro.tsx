import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles, Heart, Scale, Eye } from 'lucide-react';
import { PixelButton } from '@/components/PixelButton';

const dimensions = [
  {
    icon: '🔗',
    title: '依恋取向',
    subtitle: '你靠近与离开的方式',
    desc: '焦虑与回避的拉扯，决定你在关系里能否安心停留。',
  },
  {
    icon: '💬',
    title: '爱的语言',
    subtitle: '你需要与表达爱的方式',
    desc: '五种爱的语言，看清你「想收到」和「常给出」的是否一致。',
  },
  {
    icon: '🎨',
    title: '恋爱风格',
    subtitle: 'Lee 六色爱情',
    desc: '你是心动型、游戏型、友谊型、务实型、痴迷型，还是奉献型？',
  },
  {
    icon: '🔺',
    title: '理想爱结构',
    subtitle: 'Sternberg 三元论',
    desc: '亲密、激情、承诺，你的爱情三角形是什么形状？',
  },
  {
    icon: '🌱',
    title: '关系信念',
    subtitle: '宿命观 vs 成长观',
    desc: '你相信「命中注定」，还是「一起打磨」？',
  },
];

export default function DnaIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8 md:py-12 relative overflow-hidden">
      {/* 粉色背景光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,180,190,0.35)_0%,rgba(255,220,225,0.12)_45%,transparent_70%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,180,0.25)_0%,transparent_65%)] blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,200,154,0.18)_0%,transparent_65%)] blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-rose/30 text-rose text-xs tracking-widest shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>LOVE DNA</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-4xl text-ink mb-3"
          >
            认识你的 Love DNA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-dusk text-base md:text-lg leading-relaxed"
          >
            喜欢 ≠ 合适。很多相处错位，源于「爱的需求 / 表达」错配。
            <br className="hidden md:block" />
            这是一面认识自己的镜子，不是月老，也不是心理诊断。
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/50 backdrop-blur-md border-2 border-rose/10 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          {/* 定位说明 */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose/5 border border-rose/10">
              <Eye className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-ink text-sm mb-1">恋爱自我认知工具</h3>
                <p className="text-dusk/80 text-sm leading-relaxed">
                  帮你看见自己的恋爱观、爱的需求与表达，以及「什么样的正缘更适合我、该怎么相处」。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-moss/5 border border-moss/10">
              <Scale className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-ink text-sm mb-1">核心命题：喜欢 ≠ 合适</h3>
                <p className="text-dusk/80 text-sm leading-relaxed">
                  测试结果会落在 24 个动物原型之一，先离散分类保证可解释，再用连续向量看契合度。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber/5 border border-amber/20">
              <Heart className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-ink text-sm mb-1">这不是心理诊断</h3>
                <p className="text-dusk/80 text-sm leading-relaxed">
                  本测试为多个经典爱情心理学量表的大众化拼合，用于自我觉察与娱乐，不具备临床心理测量效度。
                </p>
              </div>
            </div>
          </div>

          <p className="text-ink text-center leading-relaxed mb-6">
            通过 24 道题目，我们将从 6 个维度勾勒你的恋爱画像：
          </p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {dimensions.map((dim, idx) => (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.06 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-rose/10 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-rose/20 to-[#ffd6e0]/40 border border-rose/20 flex items-center justify-center text-xl">
                  {dim.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <h3 className="font-display text-ink text-base">{dim.title}</h3>
                    <span className="text-dusk/60 text-xs">{dim.subtitle}</span>
                  </div>
                  <p className="text-dusk/70 text-sm leading-relaxed">{dim.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-dusk/60 text-sm mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/5 border border-rose/20">
              <Clock className="w-4 h-4 text-rose/70" />
              <span>测试预计：约 4–6 分钟</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/5 border border-rose/20">
              <span className="text-rose/70">24</span>
              <span>道精选题目</span>
            </div>
          </div>

          <PixelButton onClick={() => navigate('/dna')} className="w-full">
            开始探索我的 Love DNA
            <ArrowRight className="w-4 h-4 ml-2" />
          </PixelButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
