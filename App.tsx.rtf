{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useEffect, useState \} from 'react';\
import \{ supabase, isSupabaseConfigured \} from './lib/supabase';\
import \{ Profile \} from './types';\
import Auth from './components/Auth';\
import UpdatePassword from './components/UpdatePassword';\
import MatchView from './components/MatchView';\
import HistoryView from './components/HistoryView';\
import AdminView from './components/AdminView';\
import PublicGameView from './components/PublicGameView';\
import \{ motion, AnimatePresence \} from 'motion/react';\
import \{ Trophy, History, ShieldAlert, LogOut, RefreshCw, Share2 \} from 'lucide-react';\
import \{ cn \} from './lib/utils';\
\
export default function App() \{\
  const [session, setSession] = useState<any>(null);\
  const [profile, setProfile] = useState<Profile | null>(null);\
  const [activeTab, setActiveTab] = useState<'match' | 'history' | 'admin'>('match');\
  const [loading, setLoading] = useState(true);\
  const [isResettingPassword, setIsResettingPassword] = useState(false);\
\
  // Handle Public Route (/match/:id)\
  const path = window.location.pathname;\
  const isPublicRoute = path.startsWith('/match/');\
  const publicGameId = isPublicRoute ? path.split('/')[2] : null;\
\
  useEffect(() => \{\
    if (!isSupabaseConfigured) \{\
      setLoading(false);\
      return;\
    \}\
\
    supabase.auth.getSession().then((\{ data: \{ session \} \}) => \{\
      setSession(session);\
      if (session) fetchProfile(session.user.id);\
      else setLoading(false);\
    \});\
\
    const \{ data: \{ subscription \} \} = supabase.auth.onAuthStateChange((event, session) => \{\
      if (event === 'PASSWORD_RECOVERY') setIsResettingPassword(true);\
      setSession(session);\
      if (session) fetchProfile(session.user.id);\
      else \{\
        setProfile(null);\
        setLoading(false);\
      \}\
    \});\
\
    return () => subscription.unsubscribe();\
  \}, []);\
\
  const fetchProfile = async (userId: string) => \{\
    const \{ data \} = await supabase.from('profiles').select('*').eq('id', userId).single();\
    if (data) setProfile(data);\
    setLoading(false);\
  \};\
\
  const handleLogout = () => supabase.auth.signOut();\
\
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-pitch animate-pulse text-4xl font-black italic">PSG PERTH</div></div>;\
  if (isResettingPassword) return <UpdatePassword onComplete=\{() => setIsResettingPassword(false)\} />;\
  if (isPublicRoute && publicGameId) return <PublicGameView gameId=\{publicGameId\} />;\
  if (!session) return <Auth />;\
\
  return (\
    <div className="min-h-screen bg-black pb-24 md:pb-0 md:pt-20">\
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">\
        <div className="max-w-6xl mx-auto flex items-center justify-between">\
          <div className="text-xl md:text-2xl font-black italic text-white">PSG PERTH</div>\
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl">\
            \{[\
              \{ id: 'match', label: 'Match', icon: Trophy \},\
              \{ id: 'history', label: 'History', icon: History \},\
              \{ id: 'admin', label: 'Admin', icon: ShieldAlert \},\
            ].map(tab => (\
              <button\
                key=\{tab.id\}\
                onClick=\{() => setActiveTab(tab.id as any)\}\
                className=\{cn(\
                  "flex items-center gap-2 px-6 py-2 rounded-lg transition-all font-bold text-sm",\
                  activeTab === tab.id ? "bg-white text-black" : "text-white/60 hover:text-white"\
                )\}\
              >\
                <tab.icon size=\{18\} /> \{tab.label\}\
              </button>\
            ))\}\
          </nav>\
          <div className="flex items-center gap-4">\
            <button onClick=\{() => fetchProfile(session.user.id)\} className="p-2 text-white/40 hover:text-white"><RefreshCw size=\{18\} /></button>\
            <button onClick=\{handleLogout\} className="p-2 text-white/40 hover:text-red-500"><LogOut size=\{20\} /></button>\
          </div>\
        </div>\
      </header>\
\
      <main className="p-6 md:p-12 max-w-6xl mx-auto mt-16 md:mt-0">\
        <AnimatePresence mode="wait">\
          <motion.div key=\{activeTab\} initial=\{\{ opacity: 0, x: 10 \}\} animate=\{\{ opacity: 1, x: 0 \}\} exit=\{\{ opacity: 0, x: -10 \}\}>\
            \{activeTab === 'match' && <MatchView user=\{session.user\} profile=\{profile\} onGoToAdmin=\{() => setActiveTab('admin')\} />\}\
            \{activeTab === 'history' && <HistoryView user=\{session.user\} />\}\
            \{activeTab === 'admin' && (profile?.is_admin ? <AdminView /> : <div className="text-center py-20 text-white/40">Admin Access Required</div>)\}\
          </motion.div>\
        </AnimatePresence>\
      </main>\
    </div>\
  );\
\}}