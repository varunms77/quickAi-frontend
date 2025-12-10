import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import apiClient from '../api'

const Plan = () => {

  const { user } = useContext(AuthContext)

  const handleUpgrade = async () => {
    if (!user) return alert("Please sign in first.");

    try {
      const res = await apiClient.post("/api/user/upgrade-plan")
      if (res.data.success) {
        alert("Plan upgraded to Premium!")
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      alert("Failed to upgrade plan")
    }
  }

  return (
    <div className="max-w-3xl mx-auto z-20 my-20">

      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">Choose Your Plan</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and unlock powerful premium AI tools.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 px-4">

        {/* Free Plan */}
        <div className="border rounded-2xl p-6 shadow-md bg-white">
          <h3 className="text-xl font-semibold text-slate-700">Free Plan</h3>
          <p className="text-gray-500 mt-1">Perfect for getting started.</p>

          <h2 className="text-4xl font-bold mt-4">₹0</h2>
          <p className="text-gray-500 text-sm">per month</p>

          <ul className="mt-6 space-y-2 text-gray-600 text-sm">
            <li>✔ 10 AI generations</li>
            <li>✔ Article & Blog Tools</li>
            <li>✖ AI Image Generation</li>
            <li>✖ Resume Review</li>
            <li>✖ Background/Object Removal</li>
          </ul>

          <button
            className="w-full bg-gray-300 text-gray-800 mt-6 py-2 rounded-lg cursor-default"
            disabled
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border-2 border-primary rounded-2xl p-6 shadow-xl bg-white">
          <h3 className="text-xl font-semibold text-slate-700">Premium Plan</h3>
          <p className="text-gray-500 mt-1">Unlock everything without limits.</p>

          <h2 className="text-4xl font-bold mt-4">₹299</h2>
          <p className="text-gray-500 text-sm">per month</p>

          <ul className="mt-6 space-y-2 text-gray-600 text-sm">
            <li>✔ Unlimited AI generations</li>
            <li>✔ AI Article, Blog & Research Tools</li>
            <li>✔ AI Image Generation</li>
            <li>✔ AI Resume Review</li>
            <li>✔ Remove Background / Objects</li>
            <li>✔ Priority Processing</li>
          </ul>

          <button
            onClick={handleUpgrade}
            className="w-full bg-primary text-white mt-6 py-2 rounded-lg"
          >
            Upgrade to Premium
          </button>
        </div>

      </div>

    </div>
  )
}

export default Plan