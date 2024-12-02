import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react';

export const BondCalculator: React.FC = () => {
  const [values, setValues] = useState({
    faceValue: 10000,
    couponRate: 5,
    yearsToMaturity: 10,
    marketPrice: 9800,
    frequency: 2, // Semi-annual payments
    reinvestmentRate: 4,
  });

  const calculateYieldToMaturity = () => {
    const c = (values.faceValue * values.couponRate / 100) / values.frequency;
    const n = values.yearsToMaturity * values.frequency;
    const f = values.faceValue;
    const p = values.marketPrice;
    
    // Simple approximation of YTM
    const ytm = ((c + (f - p) / values.yearsToMaturity) / ((f + p) / 2)) * 100;
    return ytm;
  };

  const calculateCurrentYield = () => {
    const annualCouponPayment = values.faceValue * (values.couponRate / 100);
    return (annualCouponPayment / values.marketPrice) * 100;
  };

  const ytm = calculateYieldToMaturity();
  const currentYield = calculateCurrentYield();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Bond Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input fields and calculations */}
      </div>
    </div>
  );
};