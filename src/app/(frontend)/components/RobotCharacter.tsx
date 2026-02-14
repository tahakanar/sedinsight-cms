import { motion } from 'framer-motion';

interface RobotCharacterProps {
  variant?: 'happy' | 'thinking' | 'waving' | 'coding';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function RobotCharacter({
  variant = 'happy',
  size = 'md',
  className = ''
}: RobotCharacterProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64'
  };

  const eyeVariants = {
    happy: { scaleY: 1 },
    thinking: { scaleY: 0.5 },
    waving: { scaleY: 1 },
    coding: { scaleY: 0.7 }
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
    >
      {/* Robot Body */}
      <svg viewBox='0 0 200 200' className='w-full h-full'>
        {/* Antenna */}
        <motion.g
          animate={{ rotate: variant === 'thinking' ? [-5, 5, -5] : 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ transformOrigin: '100px 30px' }}
        >
          <line
            x1='100'
            y1='30'
            x2='100'
            y2='10'
            stroke='#007bff'
            strokeWidth='4'
            strokeLinecap='round'
          />
          <motion.circle
            cx='100'
            cy='8'
            r='6'
            fill='#fd7e14'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Head */}
        <rect
          x='50'
          y='30'
          width='100'
          height='80'
          rx='20'
          fill='url(#robotGradient)'
        />

        {/* Face Screen */}
        <rect x='60' y='40' width='80' height='50' rx='10' fill='#1a1a2e' />

        {/* Eyes */}
        <motion.ellipse
          cx='80'
          cy='65'
          rx='8'
          ry='10'
          fill='#00ff88'
          animate={eyeVariants[variant]}
          transition={{ duration: 0.3 }}
        />
        <motion.ellipse
          cx='120'
          cy='65'
          rx='8'
          ry='10'
          fill='#00ff88'
          animate={eyeVariants[variant]}
          transition={{ duration: 0.3 }}
        />

        {/* Mouth */}
        {variant === 'happy' && (
          <path
            d='M85 80 Q100 95 115 80'
            stroke='#00ff88'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
          />
        )}
        {variant === 'thinking' && (
          <ellipse cx='100' cy='82' rx='8' ry='5' fill='#00ff88' />
        )}
        {variant === 'waving' && (
          <path
            d='M85 82 Q100 90 115 82'
            stroke='#00ff88'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
          />
        )}
        {variant === 'coding' && (
          <rect x='88' y='78' width='24' height='6' rx='3' fill='#00ff88' />
        )}

        {/* Body */}
        <rect
          x='60'
          y='115'
          width='80'
          height='60'
          rx='15'
          fill='url(#robotGradient)'
        />

        {/* Chest Light */}
        <motion.circle
          cx='100'
          cy='140'
          r='10'
          fill='#ffc107'
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Arms */}
        <motion.g
          animate={variant === 'waving' ? { rotate: [0, -30, 0] } : {}}
          transition={{
            duration: 0.5,
            repeat: variant === 'waving' ? Infinity : 0
          }}
          style={{ transformOrigin: '55px 125px' }}
        >
          <rect
            x='30'
            y='120'
            width='25'
            height='45'
            rx='10'
            fill='url(#robotGradient)'
          />
          <circle cx='42' cy='170' r='10' fill='#6f42c1' />
        </motion.g>

        <motion.g
          animate={variant === 'coding' ? { y: [0, -5, 0] } : {}}
          transition={{
            duration: 0.3,
            repeat: variant === 'coding' ? Infinity : 0
          }}
        >
          <rect
            x='145'
            y='120'
            width='25'
            height='45'
            rx='10'
            fill='url(#robotGradient)'
          />
          <circle cx='158' cy='170' r='10' fill='#6f42c1' />
        </motion.g>

        {/* Legs */}
        <rect
          x='70'
          y='175'
          width='20'
          height='20'
          rx='5'
          fill='url(#robotGradient)'
        />
        <rect
          x='110'
          y='175'
          width='20'
          height='20'
          rx='5'
          fill='url(#robotGradient)'
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient
            id='robotGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#007bff' />
            <stop offset='100%' stopColor='#6f42c1' />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
