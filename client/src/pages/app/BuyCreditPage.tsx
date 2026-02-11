import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeftIcon, CheckIcon, CoinsIcon, ShieldCheckIcon, AlertTriangleIcon, CopyIcon, ChevronDownIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function BuyCreditPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [expandedCrypto, setExpandedCrypto] = useState<string | null>(null);
  const navigate = useNavigate();

  const cryptocurrencies = {
    USDT: [
      { id: "usdt-erc20", name: "Tether", symbol: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png", networkIcon: "https://cryptologos.cc/logos/ethereum-eth-logo.png", network: "ERC-20", chain: "Ethereum" },
      { id: "usdt-trc20", name: "Tether", symbol: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png", networkIcon: "https://cryptologos.cc/logos/tron-trx-logo.png", network: "TRC-20", chain: "Tron" },
      { id: "usdt-bep20", name: "Tether", symbol: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png", networkIcon: "https://cryptologos.cc/logos/bnb-bnb-logo.png", network: "BEP-20", chain: "BSC" },
      { id: "usdt-polygon", name: "Tether", symbol: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png", networkIcon: "https://cryptologos.cc/logos/polygon-matic-logo.png", network: "Polygon", chain: "Polygon" }
    ],
    USDC: [
      { id: "usdc-erc20", name: "USD Coin", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", networkIcon: "https://cryptologos.cc/logos/ethereum-eth-logo.png", network: "ERC-20", chain: "Ethereum" },
      { id: "usdc-bep20", name: "USD Coin", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", networkIcon: "https://cryptologos.cc/logos/bnb-bnb-logo.png", network: "BEP-20", chain: "BSC" },
      { id: "usdc-polygon", name: "USD Coin", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", networkIcon: "https://cryptologos.cc/logos/polygon-matic-logo.png", network: "Polygon", chain: "Polygon" },
      { id: "usdc-avalanche", name: "USD Coin", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", networkIcon: "https://cryptologos.cc/logos/avalanche-avax-logo.png", network: "Avalanche", chain: "Avalanche" },
      { id: "usdc-solana", name: "USD Coin", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", networkIcon: "https://cryptologos.cc/logos/solana-sol-logo.png", network: "Solana", chain: "Solana" }
    ]
  };

  const allCryptos = [...cryptocurrencies.USDT, ...cryptocurrencies.USDC];
  const quickAmounts = [20, 50, 100, 250, 500, 1000];
  const paymentAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

  const handleNext = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 1) { setCurrentStep(currentStep - 1); setIsProcessing(false); } };
  
  const handleTopup = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 10000));
    setIsProcessing(false);
    setTimeout(() => navigate('/app/credits'), 1000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(paymentAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const getSelectedAmount = () => selectedAmount || parseFloat(customAmount) || 0;
  const getSelectedCrypto = () => allCryptos.find(c => c.id === selectedCrypto);
  const canProceedStep1 = selectedCrypto !== "";
  const canProceedStep2 = getSelectedAmount() >= 20;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Compact Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-2 max-w-md">
          {currentStep > 1 && (
            <button onClick={handleBack} className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors">
              <ArrowLeftIcon className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <div className="flex-1 flex items-center gap-1">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= step ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white" : "bg-white/[0.05] text-gray-500"
                }`}>
                  {currentStep > step ? <CheckIcon className="w-4 h-4" /> : step}
                </div>
                {index < 2 && <div className={`h-0.5 flex-1 mx-1 ${currentStep > step ? "bg-gradient-to-r from-indigo-500 to-pink-500" : "bg-white/[0.08]"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
              <div className="border border-white/[0.08] rounded-xl backdrop-blur-xl overflow-hidden h-full flex flex-col">
                <div className="p-4 flex-1 overflow-y-auto">
                  <h2 className="text-lg font-bold text-white mb-1">Select Cryptocurrency</h2>
                  <p className="text-xs text-gray-400 mb-4">Choose your preferred stablecoin and network</p>
                  <div className="space-y-3">
                    {Object.entries(cryptocurrencies).map(([cryptoType, variants]) => (
                      <div key={cryptoType} className="border border-white/[0.08] rounded-lg overflow-hidden bg-white/[0.02]">
                        <button onClick={() => setExpandedCrypto(expandedCrypto === cryptoType ? null : cryptoType)}
                          className="w-full p-3 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                          <div className="flex items-center gap-2">
                            <img src={variants[0].icon} alt={cryptoType} className="w-7 h-7 rounded-lg" />
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-white">{cryptoType}</h3>
                              <p className="text-xs text-gray-400">{variants.length} networks</p>
                            </div>
                          </div>
                          <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${expandedCrypto === cryptoType ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCrypto === cryptoType && (
                          <div className="border-t border-white/[0.08] p-2 space-y-1">
                            {variants.map((crypto) => (
                              <button key={crypto.id} onClick={() => setSelectedCrypto(crypto.id)}
                                className={`w-full p-2 rounded-lg text-left transition-all ${
                                  selectedCrypto === crypto.id ? "bg-indigo-600/20 border border-indigo-500" : "bg-white/[0.02] border border-transparent hover:border-white/[0.08]"
                                }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img src={crypto.networkIcon} alt={crypto.chain} className="w-5 h-5 rounded" />
                                    <span className="text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-0.5 rounded">{crypto.network}</span>
                                    <span className="text-xs text-gray-400">{crypto.chain}</span>
                                  </div>
                                  {selectedCrypto === crypto.id && <CheckIcon className="w-4 h-4 text-indigo-400" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-white/[0.08] bg-gradient-to-br from-indigo-600/[0.03] to-pink-600/[0.02] flex justify-end">
                  <button onClick={handleNext} disabled={!canProceedStep1}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold ${canProceedStep1 ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:from-indigo-500 hover:to-pink-500" : "bg-gray-600/20 text-gray-500 cursor-not-allowed"}`}>
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
              <div className="border border-white/[0.08] rounded-xl backdrop-blur-xl overflow-hidden h-full flex flex-col">
                <div className="p-4 flex-1 overflow-y-auto">
                  <h2 className="text-lg font-bold text-white mb-1">Select Amount</h2>
                  <p className="text-xs text-gray-400 mb-4">1 Credit = $1</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickAmounts.map((amount) => (
                      <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                        className={`p-3 rounded-lg border transition-all ${selectedAmount === amount ? "border-indigo-500 bg-indigo-600/10" : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12]"}`}>
                        <p className="text-base font-bold text-white">${amount}</p>
                        <p className="text-xs text-gray-400">{amount} credits</p>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white mb-2">Custom amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base font-semibold">$</span>
                      <input type="number" min="20" step="1" value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-3 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Min: $20 • Max: $10,000</p>
                  </div>
                </div>
                <div className="p-3 border-t border-white/[0.08] bg-gradient-to-br from-indigo-600/[0.03] to-pink-600/[0.02] flex justify-end">
                  <button onClick={handleNext} disabled={!canProceedStep2}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold ${canProceedStep2 ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:from-indigo-500 hover:to-pink-500" : "bg-gray-600/20 text-gray-500 cursor-not-allowed"}`}>
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && !isProcessing && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
              <div className="border border-white/[0.08] rounded-xl backdrop-blur-xl overflow-hidden h-full flex flex-col">
                <div className="p-4 flex-1 overflow-y-auto">
                  <h2 className="text-lg font-bold text-white mb-1">Review & Caution</h2>
                  <p className="text-xs text-gray-400 mb-4">Review your order carefully</p>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600/[0.08] to-pink-600/[0.05] border border-white/[0.08]">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Payment</span>
                          <div className="flex items-center gap-1">
                            <img src={getSelectedCrypto()?.icon} alt="" className="w-4 h-4 rounded" />
                            <span className="text-white font-medium">{getSelectedCrypto()?.symbol}</span>
                            <span className="px-1.5 py-0.5 rounded text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30">{getSelectedCrypto()?.network}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Amount</span>
                          <span className="text-white font-medium">${getSelectedAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                          <span className="text-gray-400">Credits</span>
                          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{getSelectedAmount().toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-600/10 border border-yellow-600/30">
                      <div className="flex items-start gap-2">
                        <AlertTriangleIcon className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-yellow-400 mb-1">Important</p>
                          <ul className="text-xs text-gray-400 space-y-0.5">
                            <li>• Verify network before sending</li>
                            <li>• Wrong network = permanent loss</li>
                            <li>• Credits added after confirmation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-white/[0.08] bg-gradient-to-br from-indigo-600/[0.03] to-pink-600/[0.02] flex justify-end">
                  <button onClick={handleTopup} className="px-6 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:from-indigo-500 hover:to-pink-500">
                    Top Up ${getSelectedAmount().toFixed(2)}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && isProcessing && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
              <div className="border border-white/[0.08] rounded-xl backdrop-blur-xl overflow-hidden h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-full">
                  <div className="space-y-3 overflow-y-auto">
                    <h3 className="text-base font-bold text-white">Payment Details</h3>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                      <p className="text-xs text-gray-400 mb-2">Send to:</p>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="flex-1 px-2 py-1.5 bg-black/30 rounded text-xs text-white font-mono break-all">{paymentAddress}</code>
                        <button onClick={copyAddress} className="p-1.5 hover:bg-white/[0.05] rounded transition-colors border border-white/[0.08]">
                          <CopyIcon className={`w-4 h-4 ${copiedAddress ? 'text-green-400' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      {copiedAddress && <p className="text-xs text-green-400 mb-2">Copied!</p>}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <img src={getSelectedCrypto()?.networkIcon} alt="" className="w-4 h-4 rounded" />
                        <span className="px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-600/30">{getSelectedCrypto()?.network}</span>
                        <span>{getSelectedCrypto()?.chain}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                      <p className="text-xs text-gray-400 mb-2">QR Code:</p>
                      <div className="flex justify-center p-2 bg-white rounded-lg">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentAddress}`} alt="QR" className="w-32 h-32" />
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-600/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Amount:</span>
                        <span className="font-bold text-white">${getSelectedAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <img src="/payment-waiting.gif" alt="Waiting" className="w-full max-w-xs h-auto mb-4 rounded-lg" />
                    <h2 className="text-xl font-bold text-white mb-2">Waiting for you to pay</h2>
                    <p className="text-xs text-gray-400 mb-3">Complete payment in your wallet. Credits added after confirmation.</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
