import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ROLES, TECH_SYNONYMS, SAMPLE_JD, SAMPLE_RESUME } from '../data/guidoraData';
import { analyzeResumeWithGemini } from '../services/geminiService';
import { Briefcase, FileText, Calculator, CheckCircle2, XCircle, Sparkles, Loader2 } from 'lucide-react';

interface AnalysisResult {
  keywordScore: number;
  present: string[];
  missing: string[];
  aiAnalysis: string;
}

export const Guidora: React.FC = () => {
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [selectedRole, setSelectedRole] = useState<keyof typeof ROLES>('data scientist');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleLoadSample = () => {
    setJd(SAMPLE_JD);
    setResume(SAMPLE_RESUME);
    setSelectedRole('data scientist');
  };

  const calculateKeywordMatch = () => {
    const roleData = ROLES[selectedRole];
    if (!roleData) return { score: 0, missing: [], present: [] };

    const text = resume.toLowerCase();
    const required = roleData.must_have;
    const present: string[] = [];
    const missing: string[] = [];

    required.forEach(skill => {
      let found = false;
      // Check exact match
      if (text.includes(skill.toLowerCase())) found = true;
      
      // Check synonyms if not found
      if (!found && TECH_SYNONYMS[skill]) {
        const synonyms = TECH_SYNONYMS[skill];
        if (synonyms.some(syn => text.includes(syn.toLowerCase()))) {
          found = true;
        }
      }

      if (found) present.push(skill);
      else missing.push(skill);
    });

    const score = Math.round((present.length / required.length) * 100);
    return { score, missing, present };
  };

  const handleAnalyze = async () => {
    if (!jd.trim() || !resume.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // 1. Local Keyword Calculation
    const keywordData = calculateKeywordMatch();

    // 2. AI Analysis
    const aiFeedback = await analyzeResumeWithGemini(jd, resume);

    setResult({
      keywordScore: keywordData.score,
      present: keywordData.present,
      missing: keywordData.missing,
      aiAnalysis: aiFeedback
    });

    setIsAnalyzing(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-6">
      <div className="text-center mb-8">
        <Navigation />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-cg-pink to-cg-orange bg-clip-text text-transparent">
          Guidora
        </h1>
        <p className="text-white/60 text-lg">Your intelligent resume buddy</p>
      </div>

      {/* Main Input Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Job Description */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-cg-pink">
                    <Briefcase size={18} /> Job Description
                </label>
                <button 
                  onClick={handleLoadSample}
                  className="text-xs text-white/50 hover:text-white underline decoration-dashed"
                >
                  Load Sample Data
                </button>
            </div>
            <textarea 
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-64 bg-black/40 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cg-pink focus:ring-1 focus:ring-cg-pink transition-all resize-none backdrop-blur-sm"
            />
        </div>

        {/* Resume */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-cg-orange">
                    <FileText size={18} /> Your Resume
                </label>
                <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as keyof typeof ROLES)}
                    className="bg-black/40 border border-white/20 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-cg-orange"
                >
                    <option value="data scientist">Data Scientist</option>
                    <option value="ml engineer">ML Engineer</option>
                </select>
            </div>
            <textarea 
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-64 bg-black/40 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cg-orange focus:ring-1 focus:ring-cg-orange transition-all resize-none backdrop-blur-sm"
            />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 flex justify-center">
        <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jd || !resume}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cg-pink hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,143,183,0.6)]"
        >
            {isAnalyzing ? (
                <>
                    <Loader2 className="animate-spin" /> Analyzing...
                </>
            ) : (
                <>
                    <Calculator /> Analyze Match
                </>
            )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
          <div className="mt-16 space-y-12 animate-[fadeIn_0.5s_ease-out]">
              
              {/* Keywords Analysis */}
              <section className="bg-cg-panel border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <Calculator className="text-cg-pink" />
                      Keyword Analysis
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Score Circle */}
                      <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
                          <div className="relative w-32 h-32 flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                  <path
                                    className="text-white/10"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                  />
                                  <path
                                    className={`${result.keywordScore > 70 ? 'text-green-400' : result.keywordScore > 40 ? 'text-yellow-400' : 'text-red-400'} transition-all duration-1000 ease-out`}
                                    strokeDasharray={`${result.keywordScore}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                  />
                              </svg>
                              <span className="absolute text-3xl font-bold">{result.keywordScore}%</span>
                          </div>
                          <p className="mt-4 text-white/60 text-sm uppercase tracking-widest">Match Score</p>
                      </div>

                      {/* Present Skills */}
                      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                          <div>
                              <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                                  <CheckCircle2 size={18} /> Matched Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {result.present.length > 0 ? (
                                      result.present.map(skill => (
                                          <span key={skill} className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm capitalize">
                                              {skill}
                                          </span>
                                      ))
                                  ) : (
                                      <span className="text-white/40 italic text-sm">No specific matches found.</span>
                                  )}
                              </div>
                          </div>

                          <div>
                              <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                  <XCircle size={18} /> Missing Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {result.missing.length > 0 ? (
                                      result.missing.map(skill => (
                                          <span key={skill} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-sm capitalize">
                                              {skill}
                                          </span>
                                      ))
                                  ) : (
                                      <span className="text-white/40 italic text-sm">No critical skills missing!</span>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* AI Analysis */}
              <section className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                      <Sparkles className="text-indigo-400" />
                      Curio's Insights
                  </h3>
                  
                  <div className="prose prose-invert max-w-none relative z-10">
                      <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                          {result.aiAnalysis}
                      </div>
                  </div>
              </section>

          </div>
      )}
    </main>
  );
};
