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

  const calculateTotalReturn = () => {
    const annualCouponPayment = values.faceValue * (values.couponRate / 100);
    const totalCoupons = annualCouponPayment * values.yearsToMaturity;
    const principalReturn = values.faceValue - values.marketPrice;
    return ((totalCoupons + principalReturn) / values.marketPrice) * 100;
  };

  const ytm = calculateYieldToMaturity();
  const currentYield = calculateCurrentYield();
  const totalReturn = calculateTotalReturn();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Bond Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Face Value
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.faceValue}
                onChange={(e) => setValues({ ...values, faceValue: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Rate (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.couponRate}
                onChange={(e) => setValues({ ...values, couponRate: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years to Maturity
            </label>
            <input
              type="number"
              value={values.yearsToMaturity}
              onChange={(e) => setValues({ ...values, yearsToMaturity: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Market Price
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.marketPrice}
                onChange={(e) => setValues({ ...values, marketPrice: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Frequency (per year)
            </label>
            <select
              value={values.frequency}
              onChange={(e) => setValues({ ...values, frequency: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            >
              <option value={1}>Annual</option>
              <option value={2}>Semi-annual</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reinvestment Rate (%)
            </label>
            <div className="relative">
              <Percent className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={values.reinvestmentRate}
                onChange={(e) => setValues({ ...values, reinvestmentRate: Number(e.target.value) })}
                className="pl-10 w-full p-2 border rounded-md"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bond Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Yield to Maturity (YTM)</p>
              <p className="text-xl font-bold text-blue-600">
                {ytm.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">Annual return if held to maturity</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Current Yield</p>
              <p className="text-xl font-bold text-green-600">
                {currentYield.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">Annual coupon payment / market price</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Total Return</p>
              <p className="text-xl font-bold text-indigo-600">
                {totalReturn.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">Including capital gains/losses</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Annual Interest Payment</p>
              <p className="text-xl font-bold text-gray-900">
                ${((values.faceValue * values.couponRate) / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                ${((values.faceValue * values.couponRate) / 100 / values.frequency).toLocaleString()} per payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};