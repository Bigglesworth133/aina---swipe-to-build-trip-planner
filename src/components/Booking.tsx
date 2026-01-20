import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, Mail, ArrowRight } from 'lucide-react';

const Booking: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [email, setEmail] = useState('');

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setStep('success');
    };

    return (
        <div className="h-full w-full bg-black flex flex-col pt-20 px-8">
            <AnimatePresence mode="wait">
                {step === 'form' ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter">Finalize Trip</h1>
                            <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-2">Book all 8 spots in one click</p>
                        </div>

                        <div className="glass p-6 rounded-3xl space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/60 text-xs font-bold uppercase">Estimated Total</span>
                                <span className="text-2xl font-black italic">€1,240</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-white/50">
                                <CreditCard className="w-4 h-4" />
                                <span>Secure checkout via AINA Pay</span>
                            </div>
                        </div>

                        <form onSubmit={handleBook} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-4">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="adventurer@aina.io"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-full text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-6 rounded-full font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(255,56,92,0.3)] flex items-center justify-center gap-3 group"
                            >
                                Confirm Booking <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center space-y-8 pb-20"
                    >
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black uppercase tracking-tighter">You're Set!</h2>
                            <p className="text-white/60 font-medium">Confirmation sent to <br /><span className="text-white">{email}</span></p>
                        </div>
                        <button
                            onClick={onBack}
                            className="glass px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest"
                        >
                            Back to Explorer
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Booking;
