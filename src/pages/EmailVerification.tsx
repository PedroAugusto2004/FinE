import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, DollarSign } from 'lucide-react';

const CIRCLES = [
  { baseX: 400, r: 120, color: '#fde04735', speed: 25, xMul: 40, delay: 0 },
  { baseX: 1500, r: 90, color: '#fbbf2438', speed: 30, xMul: 60, delay: 1.5 },
  { baseX: 1000, r: 60, color: '#fffde435', speed: 35, xMul: 20, delay: 2.5 },
  { baseX: 800, r: 70, color: '#fde04730', speed: 28, xMul: 30, delay: 0.7 },
  { baseX: 1700, r: 50, color: '#fbbf2432', speed: 38, xMul: 50, delay: 2.2 },
  { baseX: 300, r: 40, color: '#fffde430', speed: 40, xMul: 25, delay: 1.1 }
];

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [bgCoords, setBgCoords] = useState({ x: 0, y: 0 });
  const [idleCoords, setIdleCoords] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(true);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const [bubbleStates, setBubbleStates] = useState(
    CIRCLES.map(() => ({
      y: 1080 + Math.random() * 400,
      xOffset: Math.random() * 100 - 50,
      t: Math.random() * 1000,
    }))
  );

  useEffect(() => {
    const verifyEmail = async () => {
      // Check if user is already authenticated (verification worked)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        return;
      }

      // If no session, try to verify with URL parameters
      const token = searchParams.get('token_hash') || searchParams.get('token');
      const type = searchParams.get('type');

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type === 'signup' ? 'signup' : 'email'
        });

        if (error) {
          setStatus('error');
          setMessage('Verification failed. The link may have expired.');
        } else {
          setStatus('success');
          setMessage('Your email has been successfully verified!');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred during verification.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  // Animate idle floating
  useEffect(() => {
    let frame: number;
    function animate() {
      const t = Date.now() / 2000;
      setIdleCoords({
        x: Math.sin(t) * 0.7 + Math.cos(t * 0.7) * 0.5,
        y: Math.cos(t * 0.9) * 0.7 + Math.sin(t * 0.5) * 0.5,
      });
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Animate bubbles
  useEffect(() => {
    let running = true;
    function animate() {
      setBubbleStates(prev => prev.map((bubble, idx) => {
        const speed = CIRCLES[idx].speed;
        let newY = bubble.y - (0.7 + speed * 0.09);
        if (newY < -(CIRCLES[idx].r * 2)) {
          newY = 1080 + CIRCLES[idx].r + Math.random() * 200;
        }
        const t = bubble.t + 0.01;
        const sway = Math.sin(t + idx) * 30;
        return {
          y: newY,
          xOffset: sway,
          t,
        };
      }));
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setBgCoords({ x, y });
    setIsIdle(false);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => setIsIdle(true), 2200);
  };

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-neutral-900 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Animation */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ filter: 'blur(0.5px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute">
          {CIRCLES.map((circle, idx) => {
            const x = circle.baseX + ((isIdle ? idleCoords.x : bgCoords.x) * circle.xMul) + bubbleStates[idx].xOffset;
            const y = bubbleStates[idx].y + ((isIdle ? idleCoords.y : bgCoords.y) * 10);
            return (
              <motion.circle
                key={idx}
                cx={x}
                cy={y}
                r={circle.r}
                fill={circle.color}
                animate={{
                  opacity: [0.12, 0.22, 0.12],
                  scale: [1, 1.08, 1],
                }}
                transition={{ repeat: Infinity, duration: 6 + idx, ease: 'easeInOut', delay: circle.delay }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400 font-bold" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">FinE</h1>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="bg-neutral-800/90 backdrop-blur-md border border-neutral-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Email Verification
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
              </div>

              <div className="py-8">
                {status === 'loading' && (
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="h-16 w-16 text-yellow-400 animate-spin" />
                    <p className="text-neutral-300 text-lg">Verifying your email...</p>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-400" />
                    <div className="space-y-2">
                      <p className="text-green-400 font-semibold text-xl">Success!</p>
                      <p className="text-neutral-300">{message}</p>
                      <p className="text-sm text-neutral-400 mt-4">
                        Welcome to FinE! You can now access all features and start your financial learning journey.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <XCircle className="h-16 w-16 text-red-400" />
                    <div className="space-y-2">
                      <p className="text-red-400 font-semibold text-xl">Verification Failed</p>
                      <p className="text-neutral-300">{message}</p>
                      <p className="text-sm text-neutral-400 mt-4">
                        Please try signing up again or contact support if the issue persists.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {status !== 'loading' && (
                <Button 
                  onClick={handleContinue}
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold transition-all duration-300 rounded-xl"
                >
                  {status === 'success' ? 'Continue to FinE' : 'Back to Sign Up'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;