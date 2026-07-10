import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Heart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
    </svg>
  );
}

function GlowOrb({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-60 pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(circle, rgba(255,143,163,0.45) 0%, rgba(255,200,210,0.15) 60%, transparent 100%)',
      }}
    />
  );
}

function FloatingItem({
  children,
  className = '',
  duration = 4,
  delay = 0,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [-8, 8, -8],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

function EnvelopeDome() {
  return (
    <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
      {/* 外发光 */}
      <div className="absolute inset-0 rounded-full bg-[#ff8fa3]/20 blur-2xl" />

      {/* 玻璃罩 */}
      <div className="absolute inset-2 rounded-[50%_50%_46%_46%_/62%_62%_38%_38%] bg-gradient-to-b from-white/50 to-white/10 border border-white/60 backdrop-blur-lg shadow-[inset_0_-24px_48px_rgba(255,255,255,0.35),0_12px_40px_rgba(200,90,116,0.12)]" />

      {/* 底座 */}
      <div className="absolute bottom-5 left-8 right-8 h-7 rounded-[50%] bg-white/40 blur-md" />

      {/* 云朵衬底 */}
      <div className="absolute bottom-10 left-8 right-8 h-9 bg-white/50 rounded-full blur-md" />
      <div className="absolute bottom-14 left-12 right-12 h-7 bg-white/60 rounded-full blur-sm" />

      {/* 漂浮信封 */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [-4, 2, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%] w-24 h-16 bg-gradient-to-br from-[#fff5f8] to-[#ffd6e0] rounded-xl shadow-[0_10px_30px_rgba(200,90,116,0.2)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-t-[34px] border-l-transparent border-r-transparent border-t-[#ffc4d6]/70" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Heart className="w-6 h-6 text-[#ff8fa3] drop-shadow-sm" />
        </div>
      </motion.div>

      {/* 信封文字 */}
      <div className="absolute top-[64%] left-1/2 -translate-x-1/2 text-center">
        <p className="text-[#c85a74] text-xs font-medium whitespace-nowrap drop-shadow-sm">
          你的正缘，正在路上
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start md:justify-center px-5 py-6 md:py-8 overflow-auto md:overflow-hidden">
      {/* 粉色渐变背景 */}
      <div
        className="fixed inset-0 z-[60]"
        style={{
          background: 'linear-gradient(180deg, #fff8fa 0%, #fff0f4 40%, #ffe4ec 100%)',
        }}
      />

      {/* 背景光晕 */}
      <div className="fixed inset-0 z-[61] pointer-events-none overflow-hidden">
        <GlowOrb className="w-[420px] h-[420px] -top-20 -left-20" />
        <GlowOrb className="w-[360px] h-[360px] top-[25%] right-[-80px]" />
        <GlowOrb className="w-[300px] h-[300px] bottom-[-60px] left-[20%]" />
      </div>

      {/* 漂浮装饰 */}
      <div className="fixed inset-0 z-[61] pointer-events-none overflow-hidden">
        <FloatingItem className="top-[14%] left-[8%] text-[#ff8fa3]/45" duration={5} rotate={8}>
          <Heart className="w-10 h-10" />
        </FloatingItem>
        <FloatingItem className="top-[22%] right-[10%] text-[#ff8fa3]/55" duration={4.5} delay={0.6} rotate={10}>
          <Heart className="w-8 h-8" />
        </FloatingItem>
        <FloatingItem className="top-[40%] left-[5%] text-[#ffb7c5]/70" duration={6} delay={1.2} rotate={12}>
          <Sparkle className="w-7 h-7" />
        </FloatingItem>
        <FloatingItem className="top-[36%] right-[6%] text-[#ffb7c5]/60" duration={5.2} delay={0.3} rotate={14}>
          <Sparkle className="w-6 h-6" />
        </FloatingItem>
        <FloatingItem className="bottom-[30%] left-[12%] text-[#ff8fa3]/40" duration={5.5} delay={1.5} rotate={6}>
          <Heart className="w-6 h-6" />
        </FloatingItem>
        <FloatingItem className="bottom-[34%] right-[12%] text-[#ff8fa3]/45" duration={4.8} delay={0.9} rotate={9}>
          <Heart className="w-7 h-7" />
        </FloatingItem>
      </div>

      {/* 主内容卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-[70] w-full max-w-md"
      >
        <div className="relative rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(200,90,116,0.15)] px-6 py-7 md:pt-8 md:pb-8 text-center overflow-hidden">
          {/* 卡片内顶部光晕 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-[#ff8fa3]/15 blur-2xl rounded-full pointer-events-none" />

          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-1.5 rounded-full bg-white/70 border border-[#ffb7c5]/50 text-[#c85a74] text-[11px] tracking-[0.18em] shadow-sm"
          >
            <Heart className="w-3 h-3 text-[#ff8fa3]" />
            <span>RELATIONSHIP SIMULATOR</span>
            <Heart className="w-3 h-3 text-[#ff8fa3]" />
          </motion.div>

          {/* 主标题 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mb-2 md:mb-3"
          >
            <h1 className="font-display text-[2.6rem] md:text-[3.2rem] leading-none text-[#c85a74] tracking-tight">
              正缘
              <span className="text-[2.4rem] md:text-[3rem] font-light italic text-[#ff8fa3] ml-1">skill</span>
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#d67a8f] text-base md:text-lg font-medium mb-4 md:mb-5 tracking-wide"
          >
            在遇见之前，先读懂自己
          </motion.p>

          {/* 说明文字 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#a86478] text-sm leading-relaxed mb-4 md:mb-5 space-y-1"
          >
            <p>测测你的五维恋爱 DNA</p>
            <p>生成专属正缘档案，提前体验一场恋爱预演</p>
          </motion.div>

          {/* 特性标签 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-5 md:mb-7"
          >
            {['恋爱 DNA', '正缘档案', '剧情模拟'].map((label, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#ff8fa3]/10 text-[#c85a74] text-xs border border-[#ff8fa3]/20"
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* 开始按钮 */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dna/intro')}
            className="group relative w-full max-w-[280px] py-3 md:py-3.5 rounded-full text-white text-base md:text-lg font-medium tracking-wider shadow-[0_10px_28px_rgba(255,107,138,0.38)] overflow-hidden mx-auto block"
            style={{ background: 'linear-gradient(90deg, #ff8fa3 0%, #ff6b8a 100%)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              开始体验
              <Heart className="w-5 h-5 fill-white" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b8a] to-[#ff8fa3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </motion.div>

      {/* 底部信封装饰 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        className="relative z-[70] mt-[-20px] md:mt-[-28px]"
      >
        <EnvelopeDome />
      </motion.div>

      {/* 底部文案 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-[70] mt-2 md:mt-3 text-[#c85a74]/75 text-xs tracking-[0.18em] flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
      >
        <span>认识自己</span>
        <span className="text-[#ff8fa3]">·</span>
        <span>理解关系</span>
        <span className="text-[#ff8fa3]">·</span>
        <span>收获成长</span>
        <span className="text-[#ff8fa3]">·</span>
        <span>遇见更好的爱</span>
      </motion.p>
    </div>
  );
}
